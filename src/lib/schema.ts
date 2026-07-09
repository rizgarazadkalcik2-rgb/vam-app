import { sql } from "@vercel/postgres";
import bcrypt from "bcryptjs";
import { SEED_DESTINATIONS, SEED_BUNDLES } from "./seedData";

// Şema kurulumu süreç ömründe yalnızca BİR KEZ çalışır (memoize edilmiş).
// Önceden her API çağrısı ~10+ DDL sorgusunu tekrarlıyordu — artık ilk
// çağrı kurulumu yapar, sonraki tüm çağrılar aynı sonucu anında paylaşır.
let schemaReady: Promise<void> | null = null;

export function ensureSchema(): Promise<void> {
  if (!schemaReady) {
    schemaReady = initSchema().catch((e) => {
      console.error("[schema] init başarısız:", e);
      schemaReady = null; // hata durumunda bir sonraki istekte yeniden dene
      throw e;
    });
  }
  return schemaReady;
}

async function initSchema() {
  await sql`
    CREATE TABLE IF NOT EXISTS packages (
      id SERIAL PRIMARY KEY,
      partner_id TEXT NOT NULL,
      partner_name TEXT NOT NULL,
      title TEXT NOT NULL,
      destination TEXT NOT NULL,
      nights INTEGER NOT NULL DEFAULT 1,
      price_try NUMERIC NOT NULL,
      capacity INTEGER NOT NULL DEFAULT 0,
      description TEXT,
      image_url TEXT,
      status TEXT NOT NULL DEFAULT 'active',
      created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
      updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
    );
  `;

  // Eski tablolarda image_url sütunu yoksa ekle (geriye dönük uyumluluk)
  await sql`ALTER TABLE packages ADD COLUMN IF NOT EXISTS image_url TEXT;`;

  await sql`
    CREATE TABLE IF NOT EXISTS users (
      id TEXT PRIMARY KEY,
      username TEXT UNIQUE NOT NULL,
      password_hash TEXT NOT NULL,
      role TEXT NOT NULL DEFAULT 'partner',
      display_name TEXT NOT NULL,
      status TEXT NOT NULL DEFAULT 'active',
      created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
      updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
    );
  `;

  // Brute-force / kaba kuvvet girişimlerine karşı kilitleme alanları
  await sql`ALTER TABLE users ADD COLUMN IF NOT EXISTS failed_attempts INTEGER NOT NULL DEFAULT 0;`;
  await sql`ALTER TABLE users ADD COLUMN IF NOT EXISTS locked_until TIMESTAMPTZ;`;

  // Acente firma bilgileri (adres, iletişim, verilen hizmetler)
  await sql`ALTER TABLE users ADD COLUMN IF NOT EXISTS company_email TEXT;`;
  await sql`ALTER TABLE users ADD COLUMN IF NOT EXISTS company_phone TEXT;`;
  await sql`ALTER TABLE users ADD COLUMN IF NOT EXISTS company_address TEXT;`;
  await sql`ALTER TABLE users ADD COLUMN IF NOT EXISTS company_services TEXT;`;

  // Match Weekends içerikleri: fikstür maçları ve haber/kutlama kartları
  await sql`
    CREATE TABLE IF NOT EXISTS match_events (
      id SERIAL PRIMARY KEY,
      team TEXT NOT NULL,
      kind TEXT NOT NULL DEFAULT 'match',
      title TEXT NOT NULL,
      event_date DATE,
      event_time TEXT,
      competition TEXT,
      venue TEXT,
      image_url TEXT,
      body TEXT,
      status TEXT NOT NULL DEFAULT 'active',
      created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
      updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
    );
  `;

  await sql`
    CREATE TABLE IF NOT EXISTS reservations (
      id SERIAL PRIMARY KEY,
      package_id INTEGER REFERENCES packages(id) ON DELETE CASCADE,
      partner_id TEXT NOT NULL,
      partner_name TEXT NOT NULL,
      package_title TEXT NOT NULL,
      customer_name TEXT NOT NULL,
      customer_email TEXT NOT NULL,
      customer_phone TEXT,
      travel_date DATE,
      guest_count INTEGER NOT NULL DEFAULT 1,
      notes TEXT,
      total_price NUMERIC NOT NULL,
      payment_status TEXT NOT NULL DEFAULT 'pending',
      reservation_status TEXT NOT NULL DEFAULT 'new',
      created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
      updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
    );
  `;

  // Eski tablolarda package_id NOT NULL olabilir — bundle rezervasyonları için gevşetiyoruz.
  await sql`ALTER TABLE reservations ALTER COLUMN package_id DROP NOT NULL;`;

  // İlk kurulumda mevcut sabit kodlu kullanıcıları (rizgar, acente1) veritabanına aktar.
  // Sadece tablo boşsa çalışır, tekrar tekrar eklemez.
  const { rows } = await sql`SELECT COUNT(*) as count FROM users;`;
  if (Number(rows[0].count) === 0) {
    const adminHash = await bcrypt.hash("admin123", 10);
    const partnerHash = await bcrypt.hash("acente123", 10);
    await sql`
      INSERT INTO users (id, username, password_hash, role, display_name, status)
      VALUES
        ('u_admin_1', 'rizgar', ${adminHash}, 'admin', 'Rizgar (Yönetici)', 'active'),
        ('u_partner_1', 'acente1', ${partnerHash}, 'partner', 'Test Acente 1', 'active')
      ON CONFLICT (username) DO NOTHING;
    `;
  }

  // --- Destinasyonlar ---
  await sql`
    CREATE TABLE IF NOT EXISTS destinations (
      id SERIAL PRIMARY KEY,
      slug TEXT UNIQUE NOT NULL,
      name TEXT NOT NULL,
      region TEXT NOT NULL,
      era TEXT,
      era_display TEXT,
      era_caption TEXT,
      unesco BOOLEAN NOT NULL DEFAULT false,
      tags JSONB NOT NULL DEFAULT '[]',
      image_url TEXT,
      rating NUMERIC,
      reviews INTEGER,
      history JSONB NOT NULL DEFAULT '[]',
      features JSONB NOT NULL DEFAULT '[]',
      visit_location TEXT,
      visit_nearest_city TEXT,
      visit_duration TEXT,
      visit_best_time TEXT,
      related JSONB NOT NULL DEFAULT '[]',
      status TEXT NOT NULL DEFAULT 'active',
      created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
      updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
    );
  `;

  // Kart/başlık seviyesi çok dilli içerik (name/region/era_display/era_caption).
  // Yapı: {"DE": {"name": "...", "region": "...", "eraDisplay": "...", "eraCaption": "..."}, "EN": {...}, "KU": {...}}
  // Eksik dil/alan TR taban değerine düşer (dictionary.ts'teki t() fallback deseniyle aynı mantık).
  await sql`ALTER TABLE destinations ADD COLUMN IF NOT EXISTS translations JSONB NOT NULL DEFAULT '{}';`;

  const { rows: destCount } = await sql`SELECT COUNT(*) as count FROM destinations;`;
  if (Number(destCount[0].count) === 0) {
    for (const d of SEED_DESTINATIONS) {
      await sql`
        INSERT INTO destinations (
          slug, name, region, era, era_display, era_caption, unesco, tags, image_url,
          rating, reviews, history, features, visit_location, visit_nearest_city,
          visit_duration, visit_best_time, related, translations
        ) VALUES (
          ${d.slug}, ${d.name}, ${d.region}, ${d.era}, ${d.eraDisplay}, ${d.eraCaption},
          ${d.unesco}, ${JSON.stringify(d.tags)}::jsonb, ${d.imageUrl},
          ${d.rating}, ${d.reviews}, ${JSON.stringify(d.history)}::jsonb,
          ${JSON.stringify(d.features)}::jsonb, ${d.visitLocation}, ${d.visitNearestCity},
          ${d.visitDuration}, ${d.visitBestTime}, ${JSON.stringify(d.related)}::jsonb,
          ${JSON.stringify(d.translations || {})}::jsonb
        )
        ON CONFLICT (slug) DO NOTHING;
      `;
    }
  }

  // Tek seferlik geriye dönük dolgu (bkz. bundles'taki aynı desen için not).
  for (const d of SEED_DESTINATIONS) {
    if (d.translations && Object.keys(d.translations).length > 0) {
      await sql`
        UPDATE destinations SET translations = ${JSON.stringify(d.translations)}::jsonb
        WHERE slug = ${d.slug} AND translations = '{}'::jsonb;
      `;
    }
  }

  // İkinci tek seferlik geriye dönük dolgu: history/features (tarihçe ve öne
  // çıkan özellikler) alanları translations şemasına SONRADAN eklendi — yukarıdaki
  // dolgu artık translations dolu olduğu için bir daha tetiklenmiyor. Burada her
  // dil için sadece "history" alt-anahtarı eksikse doldurulur; admin panelinden
  // elle girilmiş bir çeviri varsa (alt-anahtar zaten var demektir) asla ezilmez.
  //
  // jsonb_set(..., create_missing=true) SADECE path'in son elemanını otomatik
  // oluşturur — ara elemanlar (burada dil kodu, örn. "CKB") translations içinde
  // hiç yoksa jsonb_set sessizce hiçbir şey yapmaz. Bu yüzden dil anahtarını
  // önce COALESCE ile garantiye alıp üst seviyede `||` (shallow merge) ile
  // birleştiriyoruz — bu, dil anahtarı ister hiç olmasın ister zaten var olup
  // sadece history/features eksik olsun, her iki durumda da çalışır.
  for (const d of SEED_DESTINATIONS) {
    for (const lang of ["DE", "EN", "KU", "CKB"] as const) {
      const t = d.translations?.[lang];
      if (t?.history?.length || t?.features?.length) {
        const historyPath = `{${lang},history}`;
        const langEntry = JSON.stringify({ history: t.history || [], features: t.features || [] });
        await sql`
          UPDATE destinations
          SET translations = translations || jsonb_build_object(
            ${lang}::text,
            COALESCE(translations->${lang}::text, '{}'::jsonb) || ${langEntry}::jsonb
          )
          WHERE slug = ${d.slug} AND translations #> ${historyPath}::text[] IS NULL;
        `;
      }
    }
  }

  // --- Bundle Paketleri ---
  await sql`
    CREATE TABLE IF NOT EXISTS bundles (
      id SERIAL PRIMARY KEY,
      slug TEXT UNIQUE NOT NULL,
      title TEXT NOT NULL,
      image_url TEXT,
      description TEXT NOT NULL,
      nights INTEGER NOT NULL DEFAULT 1,
      destinations JSONB NOT NULL DEFAULT '[]',
      price NUMERIC NOT NULL,
      original_price NUMERIC,
      includes JSONB NOT NULL DEFAULT '[]',
      badge TEXT,
      status TEXT NOT NULL DEFAULT 'active',
      created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
      updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
    );
  `;

  // Kart/başlık seviyesi çok dilli içerik (title/description/includes/badge).
  // Yapı: {"DE": {"title": "...", "description": "...", "includes": [...], "badge": "..."}, "EN": {...}, "KU": {...}}
  await sql`ALTER TABLE bundles ADD COLUMN IF NOT EXISTS translations JSONB NOT NULL DEFAULT '{}';`;

  const { rows: bundleCount } = await sql`SELECT COUNT(*) as count FROM bundles;`;
  if (Number(bundleCount[0].count) === 0) {
    for (const b of SEED_BUNDLES) {
      await sql`
        INSERT INTO bundles (
          slug, title, image_url, description, nights, destinations, price,
          original_price, includes, badge, translations
        ) VALUES (
          ${b.slug}, ${b.title}, ${b.imageUrl}, ${b.description}, ${b.nights},
          ${JSON.stringify(b.destinations)}::jsonb, ${b.price}, ${b.originalPrice},
          ${JSON.stringify(b.includes)}::jsonb, ${b.badge}, ${JSON.stringify(b.translations || {})}::jsonb
        )
        ON CONFLICT (slug) DO NOTHING;
      `;
    }
  }

  // Tek seferlik geriye dönük dolgu: tablo daha önce (translations sütunu eklenmeden
  // önce) kurulmuş olabilir — bu durumda seed INSERT'i hiç çalışmaz. Sadece hâlâ
  // boş ('{}') olan satırları doldurur, admin panelinden elle girilmiş bir çeviri
  // varsa asla üzerine yazmaz.
  for (const b of SEED_BUNDLES) {
    if (b.translations && Object.keys(b.translations).length > 0) {
      await sql`
        UPDATE bundles SET translations = ${JSON.stringify(b.translations)}::jsonb
        WHERE slug = ${b.slug} AND translations = '{}'::jsonb;
      `;
    }
  }

  // Bundle (çoklu destinasyon rotası) rezervasyonlarını desteklemek için yeni sütun.
  // bundles tablosu oluşturulduktan SONRA çalışmalı (FK referansı için).
  await sql`ALTER TABLE reservations ADD COLUMN IF NOT EXISTS bundle_id INTEGER REFERENCES bundles(id) ON DELETE CASCADE;`;
  // Bir rezervasyonun ya paket ya da bundle'a ait olmasını garanti altına alan kontrol.
  await sql`
    DO $$
    BEGIN
      IF NOT EXISTS (
        SELECT 1 FROM pg_constraint WHERE conname = 'reservations_package_or_bundle_chk'
      ) THEN
        ALTER TABLE reservations
          ADD CONSTRAINT reservations_package_or_bundle_chk
          CHECK (
            (package_id IS NOT NULL AND bundle_id IS NULL) OR
            (package_id IS NULL AND bundle_id IS NOT NULL)
          );
      END IF;
    END $$;
  `;

  // --- Site içeriği: Ana sayfa istatistik şeridi (yönetim panelinden düzenlenir) ---
  await sql`
    CREATE TABLE IF NOT EXISTS platform_stats (
      id SERIAL PRIMARY KEY,
      num TEXT NOT NULL,
      label_tr TEXT NOT NULL,
      label_de TEXT NOT NULL,
      sort_order INTEGER NOT NULL DEFAULT 0,
      created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
      updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
    );
  `;

  const { rows: statsCount } = await sql`SELECT COUNT(*) as count FROM platform_stats;`;
  if (Number(statsCount[0].count) === 0) {
    const seedStats = [
      { num: "12.000", labelTr: "Yıllık Tarih", labelDe: "Jahre Geschichte" },
      { num: "6", labelTr: "Dil Desteği", labelDe: "Sprachen" },
      { num: "48+", labelTr: "Destinasyon", labelDe: "Destinationen" },
      { num: "120+", labelTr: "Yerel Rehber", labelDe: "Lokale Guides" },
      { num: "4.8★", labelTr: "Ortalama Puan", labelDe: "Durchschnittsbewertung" },
    ];
    for (let i = 0; i < seedStats.length; i++) {
      const s = seedStats[i];
      await sql`
        INSERT INTO platform_stats (num, label_tr, label_de, sort_order)
        VALUES (${s.num}, ${s.labelTr}, ${s.labelDe}, ${i});
      `;
    }
  }

  // --- Site içeriği: Sayfa bölümlerinin sırası ve göster/gizle durumu ---
  await sql`
    CREATE TABLE IF NOT EXISTS page_sections (
      page TEXT NOT NULL,
      section_key TEXT NOT NULL,
      enabled BOOLEAN NOT NULL DEFAULT true,
      sort_order INTEGER NOT NULL DEFAULT 0,
      updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
      PRIMARY KEY (page, section_key)
    );
  `;

  const { rows: sectionsCount } = await sql`SELECT COUNT(*) as count FROM page_sections WHERE page = 'platform';`;
  if (Number(sectionsCount[0].count) === 0) {
    const seedSections = ["stats", "dest_strip", "experiences", "bundles", "why_vam", "cta", "lang_strip"];
    for (let i = 0; i < seedSections.length; i++) {
      await sql`
        INSERT INTO page_sections (page, section_key, enabled, sort_order)
        VALUES ('platform', ${seedSections[i]}, true, ${i});
      `;
    }
  }

  // --- Site içeriği: Haftalık duyuru / özel etkinlik şeridi (tekil kayıt) ---
  await sql`
    CREATE TABLE IF NOT EXISTS announcement (
      id INTEGER PRIMARY KEY DEFAULT 1,
      active BOOLEAN NOT NULL DEFAULT false,
      body_tr TEXT NOT NULL DEFAULT '',
      body_de TEXT NOT NULL DEFAULT '',
      link_url TEXT,
      link_label_tr TEXT,
      link_label_de TEXT,
      updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
      CONSTRAINT announcement_singleton CHECK (id = 1)
    );
  `;

  const { rows: annCount } = await sql`SELECT COUNT(*) as count FROM announcement;`;
  if (Number(annCount[0].count) === 0) {
    await sql`INSERT INTO announcement (id, active, body_tr, body_de) VALUES (1, false, '', '');`;
  }

}

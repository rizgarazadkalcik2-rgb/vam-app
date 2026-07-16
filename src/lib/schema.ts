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
  // Varsayılan içeriğin sadece GERÇEKTEN ilk kurulumda tohumlandığını, bir
  // admin bilerek listeyi boşalttıktan sonra bir sonraki soğuk başlangıçta
  // "tablo boş = hiç doldurulmamış" sanılmadığını garanti eden işaret tablosu.
  // Ayrıca tek seferlik geriye dönük içerik dolgularının (bkz. destinations
  // bloğu) her soğuk başlangıçta tekrar tekrar aynı sorguları çalıştırmasını
  // önlemek için de kullanılıyor — en üstte oluşturuluyor ki dosyanın her
  // yerinden (destinations dahil) erişilebilsin.
  await sql`
    CREATE TABLE IF NOT EXISTS schema_seed_state (
      key TEXT PRIMARY KEY,
      seeded_at TIMESTAMPTZ NOT NULL DEFAULT now()
    );
  `;

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

  // GÜVENLİK: oturum (session) sürüm sayacı. JWT çerezleri 7 gün geçerli ve
  // imza doğrulaması dışında hiçbir kontrolden geçmiyordu — bir kullanıcı
  // devre dışı bırakılsa veya şifresi sıfırlansa bile elindeki eski çerez
  // süresi dolana kadar tüm API'lere erişebiliyordu. Artık her giriş
  // token'ı, o anki session_version'ı içeriyor (bkz. session.ts); şifre veya
  // durum değiştiğinde bu sayaç artırılıyor (bkz. users.ts), böylece eski
  // çerezler bir sonraki istekte anında geçersiz sayılıyor.
  await sql`ALTER TABLE users ADD COLUMN IF NOT EXISTS session_version INTEGER NOT NULL DEFAULT 1;`;

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

  // Dil bazlı çeviri (title/competition/body). Yapı: {"DE": {"title": "...", ...}, ...}.
  // Bu tablonun seed verisi yok (tamamen admin girişli), o yüzden destinations/bundles'taki
  // gibi bir geriye dönük dolgu döngüsüne gerek yok — yeni sütun boş '{}' ile başlar.
  await sql`ALTER TABLE match_events ADD COLUMN IF NOT EXISTS translations JSONB NOT NULL DEFAULT '{}';`;

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

  // Enlem/boylam — JSON-LD TouristAttraction şemasının "geo" alanı için
  // (Google'ın harita bazlı zengin sonuçları bunu bekler). Opsiyonel: admin
  // henüz girmediyse JSON-LD basitçe geo alanını atlar, hata vermez.
  await sql`ALTER TABLE destinations ADD COLUMN IF NOT EXISTS latitude NUMERIC;`;
  await sql`ALTER TABLE destinations ADD COLUMN IF NOT EXISTS longitude NUMERIC;`;

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

  // Üçüncü tek seferlik geriye dönük dolgu: name/region/eraDisplay/eraCaption
  // (kart üstü bilgiler) ve visitLocation/visitNearestCity/visitDuration/
  // visitBestTime (pratik ziyaret bilgileri) alanları translations şemasına
  // SONRADAN eklendi — yukarıdaki dolgu sadece "history" alt-anahtarına bakıyor,
  // production'daki tüm destinasyonlarda bu zaten dolu olduğu için bir daha hiç
  // tetiklenmiyor ve bu yeni alanlar production'a asla ulaşmıyordu. Burada HER
  // ALAN AYRI AYRI kontrol edilir (tek bir "history var mı" kontrolü yeterli
  // değil — bazı destinasyonlarda bu alanlardan sadece bir kısmı eksik olabilir)
  // — admin panelinden elle girilmiş bir değer varsa asla ezilmez. Tüm blok
  // schema_seed_state işaretiyle korunuyor; ilk başarılı çalışmadan sonra bir
  // daha hiç tetiklenmeyip soğuk başlangıçlarda gereksiz sorgu yükü yaratmaz.
  const { rows: destCardFieldsMarker } = await sql`
    SELECT 1 FROM schema_seed_state WHERE key = 'destinations_card_practical_fields_v1' LIMIT 1;
  `;
  if (destCardFieldsMarker.length === 0) {
    const CARD_FIELDS = [
      "name", "region", "eraDisplay", "eraCaption",
      "visitLocation", "visitNearestCity", "visitDuration", "visitBestTime",
    ] as const;
    // Bu, ~480 bağımsız UPDATE sorgusuna kadar çıkabiliyor (15 destinasyon × 4
    // dil × 8 alan) — her biri farklı bir alan/satır hedeflediği için sırayla
    // await etmek yerine hepsini paralel ateşliyoruz (aynı satıra denk gelenler
    // Postgres'in satır kilidiyle zaten güvenle sıralanır). Bu marker zaten tek
    // seferlik olduğu için bu maliyet sadece deploy sonrası ilk isteğe biner.
    const updates: Promise<unknown>[] = [];
    for (const d of SEED_DESTINATIONS) {
      for (const lang of ["DE", "EN", "KU", "CKB"] as const) {
        const t = d.translations?.[lang];
        if (!t) continue;
        for (const field of CARD_FIELDS) {
          const value = t[field];
          if (!value) continue;
          const fieldPath = `{${lang},${field}}`;
          updates.push(sql`
            UPDATE destinations
            SET translations = jsonb_set(
              CASE WHEN translations ? ${lang}::text THEN translations
                   ELSE translations || jsonb_build_object(${lang}::text, '{}'::jsonb) END,
              ${fieldPath}::text[],
              ${JSON.stringify(value)}::jsonb,
              true
            )
            WHERE slug = ${d.slug} AND translations #> ${fieldPath}::text[] IS NULL;
          `);
        }
      }
    }
    await Promise.all(updates);
    await sql`INSERT INTO schema_seed_state (key) VALUES ('destinations_card_practical_fields_v1') ON CONFLICT (key) DO NOTHING;`;
  }

  // Dördüncü tek seferlik geriye dönük düzeltme: Harran'ın "Ulu Cami kalıntıları"
  // özelliğinin TR gövdesi yanlışlıkla bir üniversiteyi anlatıyordu (başlıkla
  // uyuşmuyordu); DE/EN/KU/CKB çevirilerindeki 4. özellik ("üniversite kalıntıları")
  // ise TR'nin gerçek 4. özelliği olan "Sabiilik mirası" ile hiç eşleşmiyordu.
  // Eski (yanlış) metinle EŞLEŞEN satırları hedefliyoruz — bu hem admin'in
  // elle düzelttiği satırları asla ezmez hem de sorgu doğal olarak tek
  // seferlik kalır (ikinci çalıştırmada eski metin artık yok, WHERE hiçbir
  // satır bulmaz) — ayrı bir işaret satırına gerek yok.
  await sql`
    UPDATE destinations
    SET features = jsonb_set(features, '{2,body}', ${JSON.stringify(
      "8. yüzyılda Emeviler döneminde inşa edilen, Anadolu'nun en eski camilerinden biri."
    )}::jsonb)
    WHERE slug = 'harran'
      AND features->2->>'body' = 'İslam dünyasının ilk üniversitelerinden biri olarak kabul edilen yapının kalıntıları hâlâ ziyaret edilebiliyor.';
  `;
  const HARRAN_FEATURE4_FIX: Record<string, { oldTitle: string; newTitle: string; newBody: string }> = {
    DE: {
      oldTitle: "Antike Universitätsruinen",
      newTitle: "Sabäisches Erbe",
      newBody: "Harran war ein Zentrum, in dem die Sabäer, die den Mondgott Sin verehrten, bis ins 11. Jahrhundert fortbestanden.",
    },
    EN: {
      oldTitle: "Ancient university ruins",
      newTitle: "Sabian heritage",
      newBody: "Harran was a center where the Sabians, who worshipped the moon god Sin, persisted until the 11th century.",
    },
    KU: {
      oldTitle: "Kavilên zanîngeha kevnar",
      newTitle: "Mîrateya Sabiyan",
      newBody: "Herran navendek bû ku Sabiyên ku perizîna xwedayê heyvê Sîn dikirin, heta sedsala 11an domandin.",
    },
    CKB: {
      oldTitle: "کاولی زانکۆیە کۆنەکە",
      newTitle: "میراتی سابییەکان",
      newBody: "حەڕان ناوەندێک بوو کە سابییەکان، کە پەرستنی خودای مانگ سین دەکرد، هەتا سەدەی ١١ بەردەوام بوون.",
    },
  };
  for (const [lang, fix] of Object.entries(HARRAN_FEATURE4_FIX)) {
    const featurePath = `{${lang},features,3}`;
    const titlePath = `{${lang},features,3,title}`;
    await sql`
      UPDATE destinations
      SET translations = jsonb_set(
        translations,
        ${featurePath}::text[],
        ${JSON.stringify({ title: fix.newTitle, body: fix.newBody })}::jsonb
      )
      WHERE slug = 'harran' AND translations #>> ${titlePath}::text[] = ${fix.oldTitle};
    `;
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

  // İkinci tek seferlik geriye dönük dolgu: CKB çevirisi translations şemasına
  // SONRADAN eklendi — yukarıdaki dolgu artık translations dolu (DE/EN/KU) olduğu
  // için bir daha tetiklenmiyor. jsonb_set(create_missing=true) "CKB" anahtarı hiç
  // yokken çalışmadığı için (bkz. destinations'taki aynı bug'ın notu) üst seviyede
  // `||` ile birleştiriyoruz — CKB anahtarı ister hiç olmasın ister zaten var olsun
  // çalışır; admin panelinden elle girilmiş bir CKB çevirisi varsa dokunmaz.
  for (const b of SEED_BUNDLES) {
    const ckb = b.translations?.CKB;
    if (ckb && Object.keys(ckb).length > 0) {
      await sql`
        UPDATE bundles
        SET translations = translations || jsonb_build_object('CKB', ${JSON.stringify(ckb)}::jsonb)
        WHERE slug = ${b.slug} AND translations->'CKB' IS NULL;
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

  // GÜVENLİK: package_id/bundle_id ON DELETE CASCADE idi — bir partner kendi
  // paketini/bundle'ını sildiğinde ona bağlı TÜM rezervasyon geçmişi (müşteri
  // adı/e-posta/telefon dahil) sessizce ve geri dönüşsüz siliniyordu (örn. bir
  // ödeme anlaşmazlığında kanıtı yok etmek için kötüye kullanılabilir).
  // RESTRICT'e çeviriyoruz — rezervasyonu olan bir paket/bundle artık DB
  // seviyesinde silinemez (uygulama katmanındaki ön-kontrole ek koruma).
  await sql`
    DO $$
    BEGIN
      IF EXISTS (
        SELECT 1 FROM pg_constraint
        WHERE conname = 'reservations_package_id_fkey' AND confdeltype = 'c'
      ) THEN
        ALTER TABLE reservations DROP CONSTRAINT reservations_package_id_fkey;
        ALTER TABLE reservations
          ADD CONSTRAINT reservations_package_id_fkey
          FOREIGN KEY (package_id) REFERENCES packages(id) ON DELETE RESTRICT;
      END IF;
    END $$;
  `;
  await sql`
    DO $$
    BEGIN
      IF EXISTS (
        SELECT 1 FROM pg_constraint
        WHERE conname = 'reservations_bundle_id_fkey' AND confdeltype = 'c'
      ) THEN
        ALTER TABLE reservations DROP CONSTRAINT reservations_bundle_id_fkey;
        ALTER TABLE reservations
          ADD CONSTRAINT reservations_bundle_id_fkey
          FOREIGN KEY (bundle_id) REFERENCES bundles(id) ON DELETE RESTRICT;
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

  // EN/KU/CKB etiketleri sonradan eklendi. Nullable — dolu değilse render
  // tarafı (platform statik sayfası) label_tr'ye düşer.
  await sql`ALTER TABLE platform_stats ADD COLUMN IF NOT EXISTS label_en TEXT;`;
  await sql`ALTER TABLE platform_stats ADD COLUMN IF NOT EXISTS label_ku TEXT;`;
  await sql`ALTER TABLE platform_stats ADD COLUMN IF NOT EXISTS label_ckb TEXT;`;

  const { rows: statsSeedMarker } = await sql`SELECT 1 FROM schema_seed_state WHERE key = 'platform_stats' LIMIT 1;`;
  if (statsSeedMarker.length === 0) {
    // Marker yoksa bu ya gerçekten ilk kurulum ya da bu satır bu koddan
    // ÖNCE (sayım bazlı eski mantıkla) zaten doldurulmuş bir prod DB'si —
    // count halen kontrol ediliyor ama marker'ı her durumda (tohumlasak da
    // tohumlamasak da) yazıyoruz, böylece bir daha asla count'a bakılmıyor.
    const { rows: statsCount } = await sql`SELECT COUNT(*) as count FROM platform_stats;`;
    if (Number(statsCount[0].count) === 0) {
      const seedStats = [
        { num: "12.000", labelTr: "Yıllık Tarih", labelDe: "Jahre Geschichte", labelEn: "Years of History", labelKu: "Salên Dîrokê", labelCkb: "ساڵانی مێژوو" },
        { num: "6", labelTr: "Dil Desteği", labelDe: "Sprachen", labelEn: "Languages Supported", labelKu: "Piştgiriya Ziman", labelCkb: "پشتگیریی زمان" },
        { num: "48+", labelTr: "Destinasyon", labelDe: "Destinationen", labelEn: "Destinations", labelKu: "Cihên Gerê", labelCkb: "شوێنی گەشتیاری" },
        { num: "120+", labelTr: "Yerel Rehber", labelDe: "Lokale Guides", labelEn: "Local Guides", labelKu: "Rêberên Herêmî", labelCkb: "ڕابەری هەرێمی" },
        { num: "4.8★", labelTr: "Ortalama Puan", labelDe: "Durchschnittsbewertung", labelEn: "Average Rating", labelKu: "Nirxa Navîn", labelCkb: "نرخاندنی ناوەند" },
      ];
      for (let i = 0; i < seedStats.length; i++) {
        const s = seedStats[i];
        await sql`
          INSERT INTO platform_stats (num, label_tr, label_de, label_en, label_ku, label_ckb, sort_order)
          VALUES (${s.num}, ${s.labelTr}, ${s.labelDe}, ${s.labelEn}, ${s.labelKu}, ${s.labelCkb}, ${i});
        `;
      }
    }
    await sql`INSERT INTO schema_seed_state (key) VALUES ('platform_stats') ON CONFLICT (key) DO NOTHING;`;
  }

  // Tek seferlik geriye dönük dolgu: tablo daha önce (EN/KU/CKB sütunları eklenmeden
  // önce) dolmuş olabilir — bu durumda seed INSERT'i hiç çalışmaz. Sadece hâlâ boş
  // olan (label_en IS NULL) ve TR etiketi bilinen varsayılan istatistiklerle eşleşen
  // satırları doldurur; admin panelinden elle girilmiş bir çeviri varsa dokunmaz.
  const backfillStats: Record<string, { labelEn: string; labelKu: string; labelCkb: string }> = {
    "Yıllık Tarih": { labelEn: "Years of History", labelKu: "Salên Dîrokê", labelCkb: "ساڵانی مێژوو" },
    "Dil Desteği": { labelEn: "Languages Supported", labelKu: "Piştgiriya Ziman", labelCkb: "پشتگیریی زمان" },
    "Destinasyon": { labelEn: "Destinations", labelKu: "Cihên Gerê", labelCkb: "شوێنی گەشتیاری" },
    "Yerel Rehber": { labelEn: "Local Guides", labelKu: "Rêberên Herêmî", labelCkb: "ڕابەری هەرێمی" },
    "Ortalama Puan": { labelEn: "Average Rating", labelKu: "Nirxa Navîn", labelCkb: "نرخاندنی ناوەند" },
  };
  for (const [labelTr, t] of Object.entries(backfillStats)) {
    await sql`
      UPDATE platform_stats
      SET label_en = ${t.labelEn}, label_ku = ${t.labelKu}, label_ckb = ${t.labelCkb}
      WHERE label_tr = ${labelTr} AND label_en IS NULL;
    `;
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

  const { rows: sectionsSeedMarker } = await sql`SELECT 1 FROM schema_seed_state WHERE key = 'page_sections_platform' LIMIT 1;`;
  if (sectionsSeedMarker.length === 0) {
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
    await sql`INSERT INTO schema_seed_state (key) VALUES ('page_sections_platform') ON CONFLICT (key) DO NOTHING;`;
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

  // EN/KU/CKB metinleri sonradan eklendi. Nullable — dolu değilse render tarafı
  // (platform statik sayfası) body_tr/link_label_tr'ye düşer.
  await sql`ALTER TABLE announcement ADD COLUMN IF NOT EXISTS body_en TEXT;`;
  await sql`ALTER TABLE announcement ADD COLUMN IF NOT EXISTS body_ku TEXT;`;
  await sql`ALTER TABLE announcement ADD COLUMN IF NOT EXISTS body_ckb TEXT;`;
  await sql`ALTER TABLE announcement ADD COLUMN IF NOT EXISTS link_label_en TEXT;`;
  await sql`ALTER TABLE announcement ADD COLUMN IF NOT EXISTS link_label_ku TEXT;`;
  await sql`ALTER TABLE announcement ADD COLUMN IF NOT EXISTS link_label_ckb TEXT;`;

  const { rows: annCount } = await sql`SELECT COUNT(*) as count FROM announcement;`;
  if (Number(annCount[0].count) === 0) {
    await sql`INSERT INTO announcement (id, active, body_tr, body_de) VALUES (1, false, '', '');`;
  }

}

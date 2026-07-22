import { sql } from "@vercel/postgres";
import { ensureSchema } from "./schema";

// /paketler sayfasındaki ve ana sayfa arama kutusundaki "Erlebnis" filtresiyle
// aynı liste — bundles/BundlesClient.tsx'teki EXP_TYPES ile de tutarlı.
// Statik ana sayfa (public/static-pages/platform/index.html) bu değerleri
// kendi içinde ayrıca tutar (Babel Standalone ile tarayıcıda derlendiği için
// bu modülü import edemiyor) — biri değişirse diğeri elle güncellenmeli.
export const PACKAGE_CATEGORIES = ["Arkeoloji", "Tarih", "Doğa", "Kültür", "Gastronomi"] as const;

export interface VamPackage {
  id: number;
  partner_id: string;
  partner_name: string;
  title: string;
  destination: string;
  nights: number;
  price_try: number;
  capacity: number;
  description: string | null;
  image_url: string | null;
  image_urls: string[];
  category: string | null;
  status: string;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export async function listAllPackages(): Promise<VamPackage[]> {
  await ensureSchema();
  const { rows } = await sql<VamPackage>`
    SELECT * FROM packages ORDER BY created_at DESC;
  `;
  return rows;
}

export async function listPackagesByPartner(partnerId: string): Promise<VamPackage[]> {
  await ensureSchema();
  const { rows } = await sql<VamPackage>`
    SELECT * FROM packages WHERE partner_id = ${partnerId} ORDER BY created_at DESC;
  `;
  return rows;
}

// Ana sayfa/deneyimler sayfasında görünen sırayla aynı (bkz. api/packages/public)
// — admin panelindeki "Ana Sayfa Sırası" bölümü bu listeyi ↑/↓ ile düzenler.
export async function listActivePackagesBySortOrder(): Promise<VamPackage[]> {
  await ensureSchema();
  const { rows } = await sql<VamPackage>`
    SELECT * FROM packages WHERE status = 'active' ORDER BY sort_order ASC, created_at DESC;
  `;
  return rows;
}

// /paketler sayfası için — listActiveBundles() ile aynı desen. Test
// amaçlı girilmiş kayıtları (bkz. api/packages/public'teki aynı filtre)
// müşteri tarafında da dışarıda bırakıyor.
export async function listActivePackages(): Promise<VamPackage[]> {
  await ensureSchema();
  const { rows } = await sql<VamPackage>`
    SELECT * FROM packages
    WHERE status = 'active'
      AND (partner_name IS NULL OR partner_name NOT ILIKE 'test%')
      AND title NOT ILIKE 'test%'
    ORDER BY sort_order ASC, created_at DESC;
  `;
  return rows;
}

export async function getPackageById(id: number): Promise<VamPackage | null> {
  await ensureSchema();
  const { rows } = await sql<VamPackage>`
    SELECT * FROM packages WHERE id = ${id} LIMIT 1;
  `;
  return rows[0] || null;
}

export async function createPackage(data: {
  partnerId: string;
  partnerName: string;
  title: string;
  destination: string;
  nights: number;
  priceTry: number;
  capacity: number;
  description: string;
  imageUrls?: string[];
  category?: string | null;
}): Promise<VamPackage> {
  await ensureSchema();
  const imageUrls = data.imageUrls || [];
  // image_url, image_urls[0]'ı yansıtan bir kapak alanı — asıl kaynak
  // image_urls (bkz. schema.ts'teki backfill yorumu).
  // sort_order: yeni paket her zaman ana sayfa sıralamasının SONUNA eklenir
  // (mevcut en yüksek sıra + 1) — admin'in elle düzenlediği sırayı bozmaz.
  const { rows } = await sql<VamPackage>`
    INSERT INTO packages (partner_id, partner_name, title, destination, nights, price_try, capacity, description, image_url, image_urls, category, sort_order)
    VALUES (
      ${data.partnerId}, ${data.partnerName}, ${data.title}, ${data.destination}, ${data.nights}, ${data.priceTry}, ${data.capacity}, ${data.description}, ${imageUrls[0] || null}, ${JSON.stringify(imageUrls)}::jsonb, ${data.category || null},
      (SELECT COALESCE(MAX(sort_order), -1) + 1 FROM packages)
    )
    RETURNING *;
  `;
  return rows[0];
}

export async function updatePackage(
  id: number,
  partnerId: string,
  isAdmin: boolean,
  data: {
    title: string;
    destination: string;
    nights: number;
    priceTry: number;
    capacity: number;
    description: string;
    status: string;
    imageUrls?: string[];
    category?: string | null;
    newPartnerId?: string;
    newPartnerName?: string;
  }
): Promise<VamPackage | null> {
  await ensureSchema();
  const imageUrls = data.imageUrls || [];
  const imageUrlsJson = JSON.stringify(imageUrls);
  const category = data.category || null;
  // partner sadece kendi paketini düzenleyebilir; admin hepsini düzenleyebilir
  // admin ayrıca paketin sahibini (acentesini) de değiştirebilir
  const { rows } = isAdmin
    ? data.newPartnerId && data.newPartnerName
      ? await sql<VamPackage>`
          UPDATE packages
          SET title = ${data.title}, destination = ${data.destination}, nights = ${data.nights},
              price_try = ${data.priceTry}, capacity = ${data.capacity}, description = ${data.description},
              status = ${data.status}, image_url = ${imageUrls[0] || null}, image_urls = ${imageUrlsJson}::jsonb, category = ${category},
              partner_id = ${data.newPartnerId}, partner_name = ${data.newPartnerName},
              updated_at = now()
          WHERE id = ${id}
          RETURNING *;
        `
      : await sql<VamPackage>`
          UPDATE packages
          SET title = ${data.title}, destination = ${data.destination}, nights = ${data.nights},
              price_try = ${data.priceTry}, capacity = ${data.capacity}, description = ${data.description},
              status = ${data.status}, image_url = ${imageUrls[0] || null}, image_urls = ${imageUrlsJson}::jsonb, category = ${category},
              updated_at = now()
          WHERE id = ${id}
          RETURNING *;
        `
    : await sql<VamPackage>`
        UPDATE packages
        SET title = ${data.title}, destination = ${data.destination}, nights = ${data.nights},
            price_try = ${data.priceTry}, capacity = ${data.capacity}, description = ${data.description},
            status = ${data.status}, image_url = ${imageUrls[0] || null}, image_urls = ${imageUrlsJson}::jsonb, category = ${category},
            updated_at = now()
        WHERE id = ${id} AND partner_id = ${partnerId}
        RETURNING *;
      `;
  return rows[0] || null;
}

// Admin panelindeki "Ana Sayfa Sırası" ↑/↓ butonları — verilen paketin
// sort_order'ını aktif paketler arasındaki bir komşusuyla değiştirir.
// Zaten listenin ucundaysa (yukarı/aşağı komşusu yoksa) false döner.
export async function reorderPackage(id: number, direction: "up" | "down"): Promise<boolean> {
  await ensureSchema();
  const { rows } = await sql<{ id: number; sort_order: number }>`
    SELECT id, sort_order FROM packages WHERE status = 'active' ORDER BY sort_order ASC, created_at DESC;
  `;
  const index = rows.findIndex((r) => r.id === id);
  if (index === -1) return false;
  const neighborIndex = direction === "up" ? index - 1 : index + 1;
  if (neighborIndex < 0 || neighborIndex >= rows.length) return false;

  const current = rows[index];
  const neighbor = rows[neighborIndex];
  await sql`UPDATE packages SET sort_order = ${neighbor.sort_order} WHERE id = ${current.id};`;
  await sql`UPDATE packages SET sort_order = ${current.sort_order} WHERE id = ${neighbor.id};`;
  return true;
}

export async function deletePackage(
  id: number,
  partnerId: string,
  isAdmin: boolean
): Promise<{ ok: boolean; reservationCount?: number }> {
  await ensureSchema();

  // Rezervasyonu olan bir paket silinirse müşteri geçmişi (ad/e-posta/telefon)
  // geri dönüşsüz kaybolur — silmeden önce kontrol et, varsa engelle.
  const { rows: resRows } = await sql<{ count: string }>`
    SELECT COUNT(*)::text as count FROM reservations WHERE package_id = ${id};
  `;
  const reservationCount = Number(resRows[0]?.count || 0);
  if (reservationCount > 0) {
    return { ok: false, reservationCount };
  }

  const { rowCount } = isAdmin
    ? await sql`DELETE FROM packages WHERE id = ${id};`
    : await sql`DELETE FROM packages WHERE id = ${id} AND partner_id = ${partnerId};`;
  return { ok: (rowCount ?? 0) > 0 };
}

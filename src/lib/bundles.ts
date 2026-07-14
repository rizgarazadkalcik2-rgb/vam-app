import { sql } from "@vercel/postgres";
import { ensureSchema } from "./schema";

export interface BundleTranslation {
  title?: string;
  description?: string;
  includes?: string[];
  badge?: string;
}

export type BundleTranslations = Partial<Record<"DE" | "EN" | "KU" | "CKB", BundleTranslation>>;

export interface VamBundle {
  id: number;
  slug: string;
  title: string;
  image_url: string | null;
  description: string;
  nights: number;
  destinations: string[];
  price: number;
  original_price: number | null;
  includes: string[];
  badge: string | null;
  status: string;
  translations: BundleTranslations;
  created_at: string;
  updated_at: string;
}

export interface BundleInput {
  slug: string;
  title: string;
  imageUrl?: string | null;
  description: string;
  nights: number;
  destinations?: string[];
  price: number;
  originalPrice?: number | null;
  includes?: string[];
  badge?: string | null;
  status?: string;
  translations?: BundleTranslations;
}

// includes dizisi kısmen çevrilmiş olabilir (bkz. destinations.ts'teki aynı
// yorum) — öğe bazında karşılaştırıp çevrilmeyen öğelerde TR'ye düşüyoruz,
// dizinin tamamını atlamıyoruz.
function mergeStringArray(translated: string[] | undefined, base: string[]): string[] {
  if (!translated || !translated.length) return base;
  return base.map((item, i) => (translated[i]?.trim() ? translated[i] : item));
}

/**
 * DE/EN/KU/CKB çevirisi varsa onu, yoksa TR taban değerini döner —
 * destinations.ts'teki localizeDestination() ile aynı fallback mantığı.
 */
export function localizeBundle(b: VamBundle, lang: "TR" | "DE" | "EN" | "KU" | "CKB") {
  const tr = lang === "TR" ? undefined : b.translations?.[lang];
  return {
    ...b,
    title: tr?.title || b.title,
    description: tr?.description || b.description,
    includes: mergeStringArray(tr?.includes, b.includes),
    badge: tr?.badge || b.badge,
  };
}

export async function listAllBundles(): Promise<VamBundle[]> {
  await ensureSchema();
  const { rows } = await sql<VamBundle>`
    SELECT * FROM bundles ORDER BY created_at DESC;
  `;
  return rows;
}

export async function listActiveBundles(): Promise<VamBundle[]> {
  await ensureSchema();
  const { rows } = await sql<VamBundle>`
    SELECT * FROM bundles WHERE status = 'active' ORDER BY created_at DESC;
  `;
  return rows;
}

export async function getBundleBySlug(slug: string): Promise<VamBundle | null> {
  await ensureSchema();
  const { rows } = await sql<VamBundle>`
    SELECT * FROM bundles WHERE slug = ${slug} LIMIT 1;
  `;
  return rows[0] || null;
}

export async function getBundleById(id: number): Promise<VamBundle | null> {
  await ensureSchema();
  const { rows } = await sql<VamBundle>`
    SELECT * FROM bundles WHERE id = ${id} LIMIT 1;
  `;
  return rows[0] || null;
}

export async function bundleSlugExists(slug: string, excludeId?: number): Promise<boolean> {
  await ensureSchema();
  const { rows } = excludeId
    ? await sql`SELECT 1 FROM bundles WHERE slug = ${slug} AND id != ${excludeId} LIMIT 1;`
    : await sql`SELECT 1 FROM bundles WHERE slug = ${slug} LIMIT 1;`;
  return rows.length > 0;
}

export async function createBundle(data: BundleInput): Promise<VamBundle> {
  await ensureSchema();
  const { rows } = await sql<VamBundle>`
    INSERT INTO bundles (
      slug, title, image_url, description, nights, destinations, price,
      original_price, includes, badge, status, translations
    ) VALUES (
      ${data.slug}, ${data.title}, ${data.imageUrl || null}, ${data.description},
      ${data.nights}, ${JSON.stringify(data.destinations || [])}::jsonb, ${data.price},
      ${data.originalPrice ?? null}, ${JSON.stringify(data.includes || [])}::jsonb,
      ${data.badge || null}, ${data.status || "active"}, ${JSON.stringify(data.translations || {})}::jsonb
    )
    RETURNING *;
  `;
  return rows[0];
}

export async function updateBundle(id: number, data: BundleInput): Promise<VamBundle | null> {
  await ensureSchema();
  const { rows } = await sql<VamBundle>`
    UPDATE bundles SET
      slug = ${data.slug}, title = ${data.title}, image_url = ${data.imageUrl || null},
      description = ${data.description}, nights = ${data.nights},
      destinations = ${JSON.stringify(data.destinations || [])}::jsonb, price = ${data.price},
      original_price = ${data.originalPrice ?? null},
      includes = ${JSON.stringify(data.includes || [])}::jsonb, badge = ${data.badge || null},
      status = ${data.status || "active"}, translations = ${JSON.stringify(data.translations || {})}::jsonb,
      updated_at = now()
    WHERE id = ${id}
    RETURNING *;
  `;
  return rows[0] || null;
}

export async function deleteBundle(id: number): Promise<{ ok: boolean; reservationCount?: number }> {
  await ensureSchema();

  // Rezervasyonu olan bir bundle silinirse müşteri geçmişi (ad/e-posta/telefon)
  // geri dönüşsüz kaybolur — silmeden önce kontrol et, varsa engelle.
  const { rows: resRows } = await sql<{ count: string }>`
    SELECT COUNT(*)::text as count FROM reservations WHERE bundle_id = ${id};
  `;
  const reservationCount = Number(resRows[0]?.count || 0);
  if (reservationCount > 0) {
    return { ok: false, reservationCount };
  }

  const { rowCount } = await sql`DELETE FROM bundles WHERE id = ${id};`;
  return { ok: (rowCount ?? 0) > 0 };
}

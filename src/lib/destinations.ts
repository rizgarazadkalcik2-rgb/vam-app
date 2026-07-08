import { sql } from "@vercel/postgres";
import { ensureSchema } from "./schema";

export interface DestinationTranslation {
  name?: string;
  region?: string;
  eraDisplay?: string;
  eraCaption?: string;
}

export type DestinationTranslations = Partial<Record<"DE" | "EN" | "KU", DestinationTranslation>>;

export interface VamDestination {
  id: number;
  slug: string;
  name: string;
  region: string;
  era: string | null;
  era_display: string | null;
  era_caption: string | null;
  unesco: boolean;
  tags: string[];
  image_url: string | null;
  rating: number | null;
  reviews: number | null;
  history: string[];
  features: { title: string; body: string }[];
  visit_location: string | null;
  visit_nearest_city: string | null;
  visit_duration: string | null;
  visit_best_time: string | null;
  related: string[];
  status: string;
  translations: DestinationTranslations;
  created_at: string;
  updated_at: string;
}

export interface DestinationInput {
  slug: string;
  name: string;
  region: string;
  era?: string | null;
  eraDisplay?: string | null;
  eraCaption?: string | null;
  unesco?: boolean;
  tags?: string[];
  imageUrl?: string | null;
  rating?: number | null;
  reviews?: number | null;
  history?: string[];
  features?: { title: string; body: string }[];
  visitLocation?: string | null;
  visitNearestCity?: string | null;
  visitDuration?: string | null;
  visitBestTime?: string | null;
  related?: string[];
  status?: string;
  translations?: DestinationTranslations;
}

/** DE/EN/KU çevirisi varsa onu, yoksa TR taban değerini döner — dictionary.ts'teki t() ile aynı fallback mantığı. */
export function localizeDestination(d: VamDestination, lang: "TR" | "DE" | "EN" | "KU") {
  const tr = lang === "TR" ? undefined : d.translations?.[lang];
  return {
    ...d,
    name: tr?.name || d.name,
    region: tr?.region || d.region,
    era_display: tr?.eraDisplay || d.era_display,
    era_caption: tr?.eraCaption || d.era_caption,
  };
}

export async function listAllDestinations(): Promise<VamDestination[]> {
  await ensureSchema();
  const { rows } = await sql<VamDestination>`
    SELECT * FROM destinations ORDER BY name ASC;
  `;
  return rows;
}

export async function listActiveDestinations(): Promise<VamDestination[]> {
  await ensureSchema();
  const { rows } = await sql<VamDestination>`
    SELECT * FROM destinations WHERE status = 'active' ORDER BY name ASC;
  `;
  return rows;
}

export async function getDestinationBySlug(slug: string): Promise<VamDestination | null> {
  await ensureSchema();
  const { rows } = await sql<VamDestination>`
    SELECT * FROM destinations WHERE slug = ${slug} LIMIT 1;
  `;
  return rows[0] || null;
}

export async function getDestinationById(id: number): Promise<VamDestination | null> {
  await ensureSchema();
  const { rows } = await sql<VamDestination>`
    SELECT * FROM destinations WHERE id = ${id} LIMIT 1;
  `;
  return rows[0] || null;
}

export async function slugExists(slug: string, excludeId?: number): Promise<boolean> {
  await ensureSchema();
  const { rows } = excludeId
    ? await sql`SELECT 1 FROM destinations WHERE slug = ${slug} AND id != ${excludeId} LIMIT 1;`
    : await sql`SELECT 1 FROM destinations WHERE slug = ${slug} LIMIT 1;`;
  return rows.length > 0;
}

export async function createDestination(data: DestinationInput): Promise<VamDestination> {
  await ensureSchema();
  const { rows } = await sql<VamDestination>`
    INSERT INTO destinations (
      slug, name, region, era, era_display, era_caption, unesco, tags, image_url,
      rating, reviews, history, features, visit_location, visit_nearest_city,
      visit_duration, visit_best_time, related, status, translations
    ) VALUES (
      ${data.slug}, ${data.name}, ${data.region}, ${data.era || null},
      ${data.eraDisplay || null}, ${data.eraCaption || null}, ${data.unesco ?? false},
      ${JSON.stringify(data.tags || [])}::jsonb, ${data.imageUrl || null},
      ${data.rating ?? null}, ${data.reviews ?? null},
      ${JSON.stringify(data.history || [])}::jsonb, ${JSON.stringify(data.features || [])}::jsonb,
      ${data.visitLocation || null}, ${data.visitNearestCity || null},
      ${data.visitDuration || null}, ${data.visitBestTime || null},
      ${JSON.stringify(data.related || [])}::jsonb, ${data.status || "active"},
      ${JSON.stringify(data.translations || {})}::jsonb
    )
    RETURNING *;
  `;
  return rows[0];
}

export async function updateDestination(
  id: number,
  data: DestinationInput
): Promise<VamDestination | null> {
  await ensureSchema();
  const { rows } = await sql<VamDestination>`
    UPDATE destinations SET
      slug = ${data.slug}, name = ${data.name}, region = ${data.region},
      era = ${data.era || null}, era_display = ${data.eraDisplay || null},
      era_caption = ${data.eraCaption || null}, unesco = ${data.unesco ?? false},
      tags = ${JSON.stringify(data.tags || [])}::jsonb, image_url = ${data.imageUrl || null},
      rating = ${data.rating ?? null}, reviews = ${data.reviews ?? null},
      history = ${JSON.stringify(data.history || [])}::jsonb,
      features = ${JSON.stringify(data.features || [])}::jsonb,
      visit_location = ${data.visitLocation || null},
      visit_nearest_city = ${data.visitNearestCity || null},
      visit_duration = ${data.visitDuration || null},
      visit_best_time = ${data.visitBestTime || null},
      related = ${JSON.stringify(data.related || [])}::jsonb,
      status = ${data.status || "active"}, translations = ${JSON.stringify(data.translations || {})}::jsonb,
      updated_at = now()
    WHERE id = ${id}
    RETURNING *;
  `;
  return rows[0] || null;
}

export async function deleteDestination(id: number): Promise<boolean> {
  await ensureSchema();
  const { rowCount } = await sql`DELETE FROM destinations WHERE id = ${id};`;
  return (rowCount ?? 0) > 0;
}

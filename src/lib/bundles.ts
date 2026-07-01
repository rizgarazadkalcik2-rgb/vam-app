import { sql } from "@vercel/postgres";
import { ensureSchema } from "./schema";

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
      original_price, includes, badge, status
    ) VALUES (
      ${data.slug}, ${data.title}, ${data.imageUrl || null}, ${data.description},
      ${data.nights}, ${JSON.stringify(data.destinations || [])}::jsonb, ${data.price},
      ${data.originalPrice ?? null}, ${JSON.stringify(data.includes || [])}::jsonb,
      ${data.badge || null}, ${data.status || "active"}
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
      status = ${data.status || "active"}, updated_at = now()
    WHERE id = ${id}
    RETURNING *;
  `;
  return rows[0] || null;
}

export async function deleteBundle(id: number): Promise<boolean> {
  await ensureSchema();
  const { rowCount } = await sql`DELETE FROM bundles WHERE id = ${id};`;
  return (rowCount ?? 0) > 0;
}

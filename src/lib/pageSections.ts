import { sql } from "@vercel/postgres";
import { ensureSchema } from "./schema";

export interface PageSection {
  page: string;
  section_key: string;
  enabled: boolean;
  sort_order: number;
  updated_at: string;
}

export interface PageSectionInput {
  sectionKey: string;
  enabled: boolean;
}

export async function listPageSections(page: string): Promise<PageSection[]> {
  await ensureSchema();
  const { rows } = await sql<PageSection>`
    SELECT * FROM page_sections WHERE page = ${page} ORDER BY sort_order ASC;
  `;
  return rows;
}

// Sırayı ve göster/gizle durumunu tek seferde, tam liste olarak günceller.
export async function replacePageSections(
  page: string,
  items: PageSectionInput[]
): Promise<PageSection[]> {
  await ensureSchema();
  await sql`DELETE FROM page_sections WHERE page = ${page};`;
  for (let i = 0; i < items.length; i++) {
    const s = items[i];
    await sql`
      INSERT INTO page_sections (page, section_key, enabled, sort_order)
      VALUES (${page}, ${s.sectionKey}, ${s.enabled}, ${i});
    `;
  }
  return listPageSections(page);
}

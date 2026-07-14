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
// DELETE + INSERT'ler tek transaction içinde — aradaki bir INSERT başarısız
// olursa (kötü veri, geçici ağ kesintisi) tablo yarım/boş kalmak yerine
// ROLLBACK ile önceki hâline döner (bu tablo doğrudan canlı sayfada okunuyor).
export async function replacePageSections(
  page: string,
  items: PageSectionInput[]
): Promise<PageSection[]> {
  await ensureSchema();
  const client = await sql.connect();
  try {
    await client.sql`BEGIN`;
    await client.sql`DELETE FROM page_sections WHERE page = ${page};`;
    for (let i = 0; i < items.length; i++) {
      const s = items[i];
      await client.sql`
        INSERT INTO page_sections (page, section_key, enabled, sort_order)
        VALUES (${page}, ${s.sectionKey}, ${s.enabled}, ${i});
      `;
    }
    await client.sql`COMMIT`;
  } catch (err) {
    await client.sql`ROLLBACK`;
    throw err;
  } finally {
    client.release();
  }
  return listPageSections(page);
}

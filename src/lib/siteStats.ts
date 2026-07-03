import { sql } from "@vercel/postgres";
import { ensureSchema } from "./schema";

export interface PlatformStat {
  id: number;
  num: string;
  label_tr: string;
  label_de: string;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export interface PlatformStatInput {
  num: string;
  labelTr: string;
  labelDe: string;
}

export async function listPlatformStats(): Promise<PlatformStat[]> {
  await ensureSchema();
  const { rows } = await sql<PlatformStat>`
    SELECT * FROM platform_stats ORDER BY sort_order ASC, id ASC;
  `;
  return rows;
}

// Sıralamayı ve içeriği tek seferde, tam liste olarak günceller.
// Basit tutmak için: mevcut tüm satırları silip yeniden ekler (sıra numarası dizideki konuma göre atanır).
export async function replaceAllStats(items: PlatformStatInput[]): Promise<PlatformStat[]> {
  await ensureSchema();
  await sql`DELETE FROM platform_stats;`;
  for (let i = 0; i < items.length; i++) {
    const s = items[i];
    await sql`
      INSERT INTO platform_stats (num, label_tr, label_de, sort_order)
      VALUES (${s.num}, ${s.labelTr}, ${s.labelDe}, ${i});
    `;
  }
  return listPlatformStats();
}

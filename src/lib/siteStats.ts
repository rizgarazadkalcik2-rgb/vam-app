import { sql } from "@vercel/postgres";
import { ensureSchema } from "./schema";

export interface PlatformStat {
  id: number;
  num: string;
  label_tr: string;
  label_de: string;
  label_en: string | null;
  label_ku: string | null;
  label_ckb: string | null;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export interface PlatformStatInput {
  num: string;
  labelTr: string;
  labelDe: string;
  labelEn?: string | null;
  labelKu?: string | null;
  labelCkb?: string | null;
}

// announcement.ts'teki localizeAnnouncement() ile aynı desen — bkz. o dosyadaki yorum.
export function localizePlatformStat(s: PlatformStat, lang: "TR" | "DE" | "EN" | "KU" | "CKB") {
  const label =
    lang === "DE" ? s.label_de :
    lang === "EN" ? s.label_en :
    lang === "KU" ? s.label_ku :
    lang === "CKB" ? s.label_ckb :
    s.label_tr;
  return {
    ...s,
    label: label || s.label_tr,
  };
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
// DELETE + INSERT'ler tek transaction içinde — aradaki bir INSERT başarısız
// olursa tablo boş kalmak yerine ROLLBACK ile önceki hâline döner (bu tablo
// ana sayfadaki canlı istatistik şeridini besliyor).
export async function replaceAllStats(items: PlatformStatInput[]): Promise<PlatformStat[]> {
  await ensureSchema();
  const client = await sql.connect();
  try {
    await client.sql`BEGIN`;
    await client.sql`DELETE FROM platform_stats;`;
    for (let i = 0; i < items.length; i++) {
      const s = items[i];
      await client.sql`
        INSERT INTO platform_stats (num, label_tr, label_de, label_en, label_ku, label_ckb, sort_order)
        VALUES (${s.num}, ${s.labelTr}, ${s.labelDe}, ${s.labelEn || null}, ${s.labelKu || null}, ${s.labelCkb || null}, ${i});
      `;
    }
    await client.sql`COMMIT`;
  } catch (err) {
    await client.sql`ROLLBACK`;
    throw err;
  } finally {
    client.release();
  }
  return listPlatformStats();
}

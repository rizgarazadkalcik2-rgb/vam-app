import { sql } from "@vercel/postgres";
import { ensureSchema } from "./schema";

export interface Announcement {
  id: number;
  active: boolean;
  body_tr: string;
  body_de: string;
  body_en: string | null;
  body_ku: string | null;
  body_ckb: string | null;
  link_url: string | null;
  link_label_tr: string | null;
  link_label_de: string | null;
  link_label_en: string | null;
  link_label_ku: string | null;
  link_label_ckb: string | null;
  updated_at: string;
}

export interface AnnouncementInput {
  active: boolean;
  bodyTr: string;
  bodyDe: string;
  bodyEn?: string | null;
  bodyKu?: string | null;
  bodyCkb?: string | null;
  linkUrl?: string | null;
  linkLabelTr?: string | null;
  linkLabelDe?: string | null;
  linkLabelEn?: string | null;
  linkLabelKu?: string | null;
  linkLabelCkb?: string | null;
}

export async function getAnnouncement(): Promise<Announcement> {
  await ensureSchema();
  const { rows } = await sql<Announcement>`SELECT * FROM announcement WHERE id = 1 LIMIT 1;`;
  return rows[0];
}

export async function updateAnnouncement(data: AnnouncementInput): Promise<Announcement> {
  await ensureSchema();
  const { rows } = await sql<Announcement>`
    UPDATE announcement SET
      active = ${data.active},
      body_tr = ${data.bodyTr},
      body_de = ${data.bodyDe},
      body_en = ${data.bodyEn || null},
      body_ku = ${data.bodyKu || null},
      body_ckb = ${data.bodyCkb || null},
      link_url = ${data.linkUrl || null},
      link_label_tr = ${data.linkLabelTr || null},
      link_label_de = ${data.linkLabelDe || null},
      link_label_en = ${data.linkLabelEn || null},
      link_label_ku = ${data.linkLabelKu || null},
      link_label_ckb = ${data.linkLabelCkb || null},
      updated_at = now()
    WHERE id = 1
    RETURNING *;
  `;
  return rows[0];
}

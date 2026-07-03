import { sql } from "@vercel/postgres";
import { ensureSchema } from "./schema";

export interface Announcement {
  id: number;
  active: boolean;
  body_tr: string;
  body_de: string;
  link_url: string | null;
  link_label_tr: string | null;
  link_label_de: string | null;
  updated_at: string;
}

export interface AnnouncementInput {
  active: boolean;
  bodyTr: string;
  bodyDe: string;
  linkUrl?: string | null;
  linkLabelTr?: string | null;
  linkLabelDe?: string | null;
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
      link_url = ${data.linkUrl || null},
      link_label_tr = ${data.linkLabelTr || null},
      link_label_de = ${data.linkLabelDe || null},
      updated_at = now()
    WHERE id = 1
    RETURNING *;
  `;
  return rows[0];
}

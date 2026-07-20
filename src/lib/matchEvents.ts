import { sql } from "@vercel/postgres";
import { ensureSchema } from "./schema";
import { normalizePgDate } from "./pgDate";

export type MatchEventKind = "match" | "news";

export type MatchEventTranslation = { title?: string; competition?: string; body?: string };
export type MatchEventTranslations = Partial<Record<"DE" | "EN" | "KU" | "CKB", MatchEventTranslation>>;

export interface MatchEvent {
  id: number;
  team: string; // TeamSelector'daki slug: amedspor | vanspor | batman | mardin1969 | igdir
  kind: MatchEventKind;
  title: string; // maçta rakip adı, haberde başlık
  event_date: string | null;
  event_time: string | null;
  competition: string | null;
  venue: string | null;
  image_url: string | null;
  body: string | null;
  status: string;
  translations: MatchEventTranslations;
  created_at: string;
  updated_at: string;
}

export interface MatchEventInput {
  team: string;
  kind: MatchEventKind;
  title: string;
  eventDate?: string | null;
  eventTime?: string | null;
  competition?: string | null;
  venue?: string | null;
  imageUrl?: string | null;
  body?: string | null;
  status?: string;
  translations?: MatchEventTranslations;
}

/**
 * DE/EN/KU/CKB çevirisi varsa onu, yoksa TR taban değerini döner —
 * destinations.ts'teki localizeDestination() ile aynı fallback mantığı.
 * venue/event_date/event_time/image_url dil-bağımsız olduğu için dokunulmaz.
 */
export function localizeMatchEvent(e: MatchEvent, lang: "TR" | "DE" | "EN" | "KU" | "CKB"): MatchEvent {
  const tr = lang === "TR" ? undefined : e.translations?.[lang];
  return {
    ...e,
    title: tr?.title || e.title,
    competition: tr?.competition || e.competition,
    body: tr?.body || e.body,
  };
}

/** Postgres DATE kolonları JS Date nesnesi olarak döner; her yerde
 *  güvenli kullanım için "YYYY-MM-DD" metnine normalize ediyoruz. */
function normalizeRow(row: MatchEvent): MatchEvent {
  return {
    ...row,
    event_date: normalizePgDate(row.event_date),
  };
}

export async function listAllMatchEvents(): Promise<MatchEvent[]> {
  await ensureSchema();
  const { rows } = await sql<MatchEvent>`
    SELECT * FROM match_events
    ORDER BY (event_date IS NULL), event_date ASC, created_at DESC;
  `;
  return rows.map(normalizeRow);
}

export async function listActiveMatchEvents(): Promise<MatchEvent[]> {
  await ensureSchema();
  const { rows } = await sql<MatchEvent>`
    SELECT * FROM match_events
    WHERE status = 'active'
    ORDER BY (event_date IS NULL), event_date ASC, created_at DESC;
  `;
  return rows.map(normalizeRow);
}

/** Bugünden itibaren tarihi olan aktif maçlar (acente paneli ve fikstür için). */
export async function listUpcomingMatches(): Promise<MatchEvent[]> {
  await ensureSchema();
  const { rows } = await sql<MatchEvent>`
    SELECT * FROM match_events
    WHERE status = 'active' AND kind = 'match'
      AND event_date IS NOT NULL AND event_date >= CURRENT_DATE
    ORDER BY event_date ASC;
  `;
  return rows.map(normalizeRow);
}

export async function createMatchEvent(data: MatchEventInput): Promise<MatchEvent> {
  await ensureSchema();
  const { rows } = await sql<MatchEvent>`
    INSERT INTO match_events (
      team, kind, title, event_date, event_time, competition, venue, image_url, body, status, translations
    ) VALUES (
      ${data.team}, ${data.kind}, ${data.title},
      ${data.eventDate || null}, ${data.eventTime || null},
      ${data.competition || null}, ${data.venue || null},
      ${data.imageUrl || null}, ${data.body || null},
      ${data.status || "active"}, ${JSON.stringify(data.translations || {})}::jsonb
    )
    RETURNING *;
  `;
  return normalizeRow(rows[0]);
}

export async function updateMatchEvent(id: number, data: MatchEventInput): Promise<MatchEvent | null> {
  await ensureSchema();
  const { rows } = await sql<MatchEvent>`
    UPDATE match_events SET
      team = ${data.team},
      kind = ${data.kind},
      title = ${data.title},
      event_date = ${data.eventDate || null},
      event_time = ${data.eventTime || null},
      competition = ${data.competition || null},
      venue = ${data.venue || null},
      image_url = ${data.imageUrl || null},
      body = ${data.body || null},
      status = ${data.status || "active"},
      translations = ${JSON.stringify(data.translations || {})}::jsonb,
      updated_at = now()
    WHERE id = ${id}
    RETURNING *;
  `;
  return rows[0] ? normalizeRow(rows[0]) : null;
}

export async function deleteMatchEvent(id: number): Promise<boolean> {
  await ensureSchema();
  const { rowCount } = await sql`DELETE FROM match_events WHERE id = ${id};`;
  return (rowCount ?? 0) > 0;
}

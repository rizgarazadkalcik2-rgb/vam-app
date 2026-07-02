import { sql } from "@vercel/postgres";
import { ensureSchema } from "./schema";

export type MatchEventKind = "match" | "news";

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
}

export async function listAllMatchEvents(): Promise<MatchEvent[]> {
  await ensureSchema();
  const { rows } = await sql<MatchEvent>`
    SELECT * FROM match_events
    ORDER BY (event_date IS NULL), event_date ASC, created_at DESC;
  `;
  return rows;
}

export async function listActiveMatchEvents(): Promise<MatchEvent[]> {
  await ensureSchema();
  const { rows } = await sql<MatchEvent>`
    SELECT * FROM match_events
    WHERE status = 'active'
    ORDER BY (event_date IS NULL), event_date ASC, created_at DESC;
  `;
  return rows;
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
  return rows;
}

export async function createMatchEvent(data: MatchEventInput): Promise<MatchEvent> {
  await ensureSchema();
  const { rows } = await sql<MatchEvent>`
    INSERT INTO match_events (
      team, kind, title, event_date, event_time, competition, venue, image_url, body, status
    ) VALUES (
      ${data.team}, ${data.kind}, ${data.title},
      ${data.eventDate || null}, ${data.eventTime || null},
      ${data.competition || null}, ${data.venue || null},
      ${data.imageUrl || null}, ${data.body || null},
      ${data.status || "active"}
    )
    RETURNING *;
  `;
  return rows[0];
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
      updated_at = now()
    WHERE id = ${id}
    RETURNING *;
  `;
  return rows[0] || null;
}

export async function deleteMatchEvent(id: number): Promise<boolean> {
  await ensureSchema();
  const { rowCount } = await sql`DELETE FROM match_events WHERE id = ${id};`;
  return (rowCount ?? 0) > 0;
}

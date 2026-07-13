import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/session";
import { listAllMatchEvents, createMatchEvent } from "@/lib/matchEvents";

const VALID_TEAMS = ["amedspor", "vanspor", "batman", "mardin1969", "igdir"];
// <input type="date"> her zaman YYYY-MM-DD formatında gönderir (reservations
// route'undaki DATE_REGEX ile aynı desen).
const DATE_REGEX = /^\d{4}-\d{2}-\d{2}$/;

export async function GET() {
  const session = await getSession();
  if (!session || session.role !== "admin") {
    return NextResponse.json({ error: "Yetkiniz yok." }, { status: 403 });
  }
  const events = await listAllMatchEvents();
  return NextResponse.json({ events });
}

export async function POST(req: NextRequest) {
  const session = await getSession();
  if (!session || session.role !== "admin") {
    return NextResponse.json({ error: "Yetkiniz yok." }, { status: 403 });
  }

  const body = await req.json().catch(() => null);
  if (body === null) {
    return NextResponse.json({ error: "Geçersiz istek gövdesi." }, { status: 400 });
  }
  const team = body?.team;
  const kind = body?.kind === "news" ? "news" : "match";
  const title = body?.title?.trim();

  if (!team || !VALID_TEAMS.includes(team)) {
    return NextResponse.json({ error: "Geçerli bir takım seçin." }, { status: 400 });
  }
  if (!title) {
    return NextResponse.json(
      { error: kind === "match" ? "Rakip takım adı gerekli." : "Başlık gerekli." },
      { status: 400 }
    );
  }
  if (kind === "match" && !body?.eventDate) {
    return NextResponse.json({ error: "Maç için tarih gerekli." }, { status: 400 });
  }
  // event_date DATE sütunu geçersiz bir string'i zaten reddediyordu ama
  // route'ta try/catch olmadığı için bu ham bir 500'e yol açıyordu —
  // reservations'daki travelDate ile aynı formata göre burada da doğrula.
  if (body?.eventDate && (typeof body.eventDate !== "string" || !DATE_REGEX.test(body.eventDate) || Number.isNaN(new Date(body.eventDate).getTime()))) {
    return NextResponse.json({ error: "Geçersiz tarih formatı." }, { status: 400 });
  }

  const event = await createMatchEvent({
    team,
    kind,
    title,
    eventDate: body?.eventDate || null,
    eventTime: body?.eventTime?.trim() || null,
    competition: body?.competition?.trim() || null,
    venue: body?.venue?.trim() || null,
    imageUrl: body?.imageUrl?.trim() || null,
    body: body?.body?.trim() || null,
    status: body?.status === "inactive" ? "inactive" : "active",
    translations: body.translations && typeof body.translations === "object" ? body.translations : {},
  });

  return NextResponse.json({ event }, { status: 201 });
}

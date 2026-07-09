import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/session";
import { listAllMatchEvents, createMatchEvent } from "@/lib/matchEvents";

const VALID_TEAMS = ["amedspor", "vanspor", "batman", "mardin1969", "igdir"];

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
  });

  return NextResponse.json({ event }, { status: 201 });
}

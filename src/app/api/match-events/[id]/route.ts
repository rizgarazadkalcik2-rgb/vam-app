import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/session";
import { updateMatchEvent, deleteMatchEvent } from "@/lib/matchEvents";

const VALID_TEAMS = ["amedspor", "vanspor", "batman", "mardin1969", "igdir"];

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getSession();
  if (!session || session.role !== "admin") {
    return NextResponse.json({ error: "Yetkiniz yok." }, { status: 403 });
  }

  const { id } = await params;
  const body = await req.json().catch(() => null);
  if (body === null) {
    return NextResponse.json({ error: "Geçersiz istek gövdesi." }, { status: 400 });
  }
  const team = body?.team;
  const kind = body?.kind === "news" ? "news" : "match";
  const title = body?.title?.trim();

  if (!team || !VALID_TEAMS.includes(team) || !title) {
    return NextResponse.json({ error: "Takım ve başlık gerekli." }, { status: 400 });
  }

  const event = await updateMatchEvent(Number(id), {
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

  if (!event) {
    return NextResponse.json({ error: "Kayıt bulunamadı." }, { status: 404 });
  }
  return NextResponse.json({ event });
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getSession();
  if (!session || session.role !== "admin") {
    return NextResponse.json({ error: "Yetkiniz yok." }, { status: 403 });
  }
  const { id } = await params;
  const ok = await deleteMatchEvent(Number(id));
  if (!ok) {
    return NextResponse.json({ error: "Kayıt bulunamadı." }, { status: 404 });
  }
  return NextResponse.json({ ok: true });
}

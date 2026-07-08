import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/session";
import { getAnnouncement, updateAnnouncement } from "@/lib/announcement";

// Herkese açık: canlı sitedeki duyuru şeridi bu uçtan okunur.
export async function GET() {
  const announcement = await getAnnouncement();
  return NextResponse.json({ announcement });
}

// Sadece yönetici: duyuruyu günceller (aç/kapat, metin, bağlantı).
export async function PUT(req: NextRequest) {
  const session = await getSession();
  if (!session || session.role !== "admin") {
    return NextResponse.json({ error: "Yetkiniz yok." }, { status: 403 });
  }

  const body = await req.json().catch(() => null);
  if (body === null) {
    return NextResponse.json({ error: "Geçersiz istek gövdesi." }, { status: 400 });
  }
  if (body?.active && !body?.bodyTr?.trim()) {
    return NextResponse.json(
      { error: "Duyuru aktifken en az Türkçe metin gerekli." },
      { status: 400 }
    );
  }

  const announcement = await updateAnnouncement({
    active: !!body?.active,
    bodyTr: (body?.bodyTr || "").trim(),
    bodyDe: (body?.bodyDe || "").trim(),
    linkUrl: body?.linkUrl?.trim() || null,
    linkLabelTr: body?.linkLabelTr?.trim() || null,
    linkLabelDe: body?.linkLabelDe?.trim() || null,
  });

  return NextResponse.json({ announcement });
}

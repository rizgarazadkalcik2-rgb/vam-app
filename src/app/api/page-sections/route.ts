import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/session";
import { listPageSections, replacePageSections } from "@/lib/pageSections";

// Herkese açık: canlı sitedeki bölüm sırası/görünürlüğü bu uçtan okunur.
// ?page=platform gibi bir parametre bekler, verilmezse 'platform' varsayılır.
export async function GET(req: NextRequest) {
  const page = req.nextUrl.searchParams.get("page") || "platform";
  const sections = await listPageSections(page);
  return NextResponse.json({ sections });
}

// Sadece yönetici: tüm listeyi (sıra + göster/gizle) tek seferde günceller.
export async function PUT(req: NextRequest) {
  const session = await getSession();
  if (!session || session.role !== "admin") {
    return NextResponse.json({ error: "Yetkiniz yok." }, { status: 403 });
  }

  const body = await req.json().catch(() => null);
  if (body === null) {
    return NextResponse.json({ error: "Geçersiz istek gövdesi." }, { status: 400 });
  }
  const page = body?.page || "platform";
  const items = Array.isArray(body?.sections) ? body.sections : null;

  if (!items || items.length === 0) {
    return NextResponse.json({ error: "En az bir bölüm gerekli." }, { status: 400 });
  }

  const cleaned = items.map((item: { sectionKey: string; enabled: boolean }) => ({
    sectionKey: String(item.sectionKey),
    enabled: !!item.enabled,
  }));

  const sections = await replacePageSections(page, cleaned);
  return NextResponse.json({ sections });
}

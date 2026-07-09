import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/session";
import { listPlatformStats, replaceAllStats } from "@/lib/siteStats";

// Herkese açık: canlı sitedeki istatistik şeridi bu uçtan veri çeker.
export async function GET() {
  const stats = await listPlatformStats();
  return NextResponse.json({ stats });
}

// Sadece yönetici: tüm listeyi (içerik + sıralama) tek seferde günceller.
export async function PUT(req: NextRequest) {
  const session = await getSession();
  if (!session || session.role !== "admin") {
    return NextResponse.json({ error: "Yetkiniz yok." }, { status: 403 });
  }

  const body = await req.json().catch(() => null);
  if (body === null) {
    return NextResponse.json({ error: "Geçersiz istek gövdesi." }, { status: 400 });
  }
  const items = Array.isArray(body?.stats) ? body.stats : null;

  if (!items || items.length === 0) {
    return NextResponse.json({ error: "En az bir istatistik gerekli." }, { status: 400 });
  }

  for (const item of items) {
    if (!item?.num?.toString().trim() || !item?.labelTr?.trim() || !item?.labelDe?.trim()) {
      return NextResponse.json(
        { error: "Her istatistik için sayı, Türkçe ve Almanca etiket gerekli." },
        { status: 400 }
      );
    }
  }

  const cleaned = items.map((item: { num: string; labelTr: string; labelDe: string }) => ({
    num: item.num.toString().trim(),
    labelTr: item.labelTr.trim(),
    labelDe: item.labelDe.trim(),
  }));

  const stats = await replaceAllStats(cleaned);
  return NextResponse.json({ stats });
}

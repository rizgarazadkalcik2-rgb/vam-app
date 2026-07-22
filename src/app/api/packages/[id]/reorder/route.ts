import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/session";
import { reorderPackage } from "@/lib/packages";

// Ana sayfadaki paket sırasını sadece admin değiştirebilir — acente
// kendi paketinin diğer acentelere göre nerede göründüğünü kontrol edemez.
export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getSession();
  if (!session || session.role !== "admin") {
    return NextResponse.json({ error: "Yetkiniz yok." }, { status: 403 });
  }

  const { id } = await params;
  const packageId = Number(id);
  if (!Number.isFinite(packageId)) {
    return NextResponse.json({ error: "Geçersiz paket ID." }, { status: 400 });
  }

  const body = await req.json().catch(() => null);
  if (body?.direction !== "up" && body?.direction !== "down") {
    return NextResponse.json({ error: "Geçersiz yön." }, { status: 400 });
  }

  const moved = await reorderPackage(packageId, body.direction);
  if (!moved) {
    return NextResponse.json({ error: "Paket zaten listenin ucunda." }, { status: 400 });
  }

  return NextResponse.json({ ok: true });
}

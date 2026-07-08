import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/session";
import { updateDestination, deleteDestination, slugExists } from "@/lib/destinations";

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await getSession();
  if (!session || session.role !== "admin") {
    return NextResponse.json({ error: "Yetkiniz yok." }, { status: 403 });
  }

  const { id } = await params;
  const destId = Number(id);
  const body = await req.json().catch(() => null);

  const slug = body?.slug?.trim();
  const name = body?.name?.trim();
  const region = body?.region?.trim();

  if (!slug || !name || !region) {
    return NextResponse.json(
      { error: "Slug, isim ve bölge alanları gerekli." },
      { status: 400 }
    );
  }

  if (!/^[a-z0-9-]+$/.test(slug)) {
    return NextResponse.json(
      { error: "Slug sadece küçük harf, rakam ve tire (-) içerebilir." },
      { status: 400 }
    );
  }

  if (await slugExists(slug, destId)) {
    return NextResponse.json(
      { error: "Bu slug zaten kullanılıyor." },
      { status: 409 }
    );
  }

  const destination = await updateDestination(destId, {
    slug,
    name,
    region,
    era: body.era || null,
    eraDisplay: body.eraDisplay || null,
    eraCaption: body.eraCaption || null,
    unesco: !!body.unesco,
    tags: Array.isArray(body.tags) ? body.tags : [],
    imageUrl: body.imageUrl || null,
    rating: body.rating ?? null,
    reviews: body.reviews ?? null,
    history: Array.isArray(body.history) ? body.history : [],
    features: Array.isArray(body.features) ? body.features : [],
    visitLocation: body.visitLocation || null,
    visitNearestCity: body.visitNearestCity || null,
    visitDuration: body.visitDuration || null,
    visitBestTime: body.visitBestTime || null,
    related: Array.isArray(body.related) ? body.related : [],
    status: body.status || "active",
    translations: body.translations && typeof body.translations === "object" ? body.translations : {},
  });

  if (!destination) {
    return NextResponse.json({ error: "Destinasyon bulunamadı." }, { status: 404 });
  }
  return NextResponse.json({ destination });
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await getSession();
  if (!session || session.role !== "admin") {
    return NextResponse.json({ error: "Yetkiniz yok." }, { status: 403 });
  }

  const { id } = await params;
  const ok = await deleteDestination(Number(id));
  if (!ok) {
    return NextResponse.json({ error: "Destinasyon bulunamadı." }, { status: 404 });
  }
  return NextResponse.json({ ok: true });
}

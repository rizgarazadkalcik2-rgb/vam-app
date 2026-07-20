import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/session";
import { updateDestination, deleteDestination, slugExists } from "@/lib/destinations";
import { isUniqueViolation } from "@/lib/pgErrors";

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await getSession();
  if (!session || session.role !== "admin") {
    return NextResponse.json({ error: "Yetkiniz yok." }, { status: 403 });
  }

  const { id } = await params;
  const destId = Number(id);
  if (!Number.isFinite(destId)) {
    return NextResponse.json({ error: "Geçersiz destinasyon ID." }, { status: 400 });
  }
  const body = await req.json().catch(() => null);
  if (body === null) {
    return NextResponse.json({ error: "Geçersiz istek gövdesi." }, { status: 400 });
  }

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

  if (body.rating != null && body.rating !== "") {
    const r = Number(body.rating);
    if (!Number.isFinite(r) || r < 1 || r > 5) {
      return NextResponse.json({ error: "Puan 1 ile 5 arasında olmalı." }, { status: 400 });
    }
  }
  if (body.reviews != null && body.reviews !== "") {
    const rv = Number(body.reviews);
    if (!Number.isFinite(rv) || !Number.isInteger(rv) || rv < 0) {
      return NextResponse.json({ error: "Değerlendirme sayısı negatif olmayan bir tam sayı olmalı." }, { status: 400 });
    }
  }
  if (body.latitude != null && body.latitude !== "" && !Number.isFinite(Number(body.latitude))) {
    return NextResponse.json({ error: "Geçersiz enlem değeri." }, { status: 400 });
  }
  if (body.longitude != null && body.longitude !== "" && !Number.isFinite(Number(body.longitude))) {
    return NextResponse.json({ error: "Geçersiz boylam değeri." }, { status: 400 });
  }

  try {
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
      rating: body.rating != null && body.rating !== "" ? Number(body.rating) : null,
      reviews: body.reviews != null && body.reviews !== "" ? Number(body.reviews) : null,
      history: Array.isArray(body.history) ? body.history : [],
      features: Array.isArray(body.features) ? body.features : [],
      visitLocation: body.visitLocation || null,
      visitNearestCity: body.visitNearestCity || null,
      visitDuration: body.visitDuration || null,
      visitBestTime: body.visitBestTime || null,
      latitude: body.latitude != null && body.latitude !== "" ? Number(body.latitude) : null,
      longitude: body.longitude != null && body.longitude !== "" ? Number(body.longitude) : null,
      related: Array.isArray(body.related) ? body.related : [],
      status: body.status || "active",
      translations: body.translations && typeof body.translations === "object" ? body.translations : {},
    });

    if (!destination) {
      return NextResponse.json({ error: "Destinasyon bulunamadı." }, { status: 404 });
    }
    return NextResponse.json({ destination });
  } catch (err) {
    if (isUniqueViolation(err)) {
      return NextResponse.json({ error: "Bu slug zaten kullanılıyor." }, { status: 409 });
    }
    console.error("[destinations PATCH]", err);
    return NextResponse.json({ error: "Destinasyon güncellenirken bir hata oluştu." }, { status: 500 });
  }
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await getSession();
  if (!session || session.role !== "admin") {
    return NextResponse.json({ error: "Yetkiniz yok." }, { status: 403 });
  }

  const { id } = await params;
  const destId = Number(id);
  if (!Number.isFinite(destId)) {
    return NextResponse.json({ error: "Geçersiz destinasyon ID." }, { status: 400 });
  }
  const ok = await deleteDestination(destId);
  if (!ok) {
    return NextResponse.json({ error: "Destinasyon bulunamadı." }, { status: 404 });
  }
  return NextResponse.json({ ok: true });
}

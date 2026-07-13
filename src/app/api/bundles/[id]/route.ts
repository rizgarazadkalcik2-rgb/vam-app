import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/session";
import { updateBundle, deleteBundle, bundleSlugExists } from "@/lib/bundles";

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await getSession();
  if (!session || session.role !== "admin") {
    return NextResponse.json({ error: "Yetkiniz yok." }, { status: 403 });
  }

  const { id } = await params;
  const bundleId = Number(id);
  const body = await req.json().catch(() => null);
  if (body === null) {
    return NextResponse.json({ error: "Geçersiz istek gövdesi." }, { status: 400 });
  }

  const slug = body?.slug?.trim();
  const title = body?.title?.trim();
  const description = body?.description?.trim();
  const nights = Number(body?.nights);
  const price = Number(body?.price);

  if (!slug || !title || !description || !nights || !price) {
    return NextResponse.json(
      { error: "Slug, başlık, açıklama, gece sayısı ve fiyat alanları gerekli." },
      { status: 400 }
    );
  }

  if (!Number.isFinite(nights) || nights < 1 || !Number.isFinite(price) || price < 0) {
    return NextResponse.json(
      { error: "Gece sayısı en az 1, fiyat negatif olamaz." },
      { status: 400 }
    );
  }

  if (!/^[a-z0-9-]+$/.test(slug)) {
    return NextResponse.json(
      { error: "Slug sadece küçük harf, rakam ve tire (-) içerebilir." },
      { status: 400 }
    );
  }

  if (await bundleSlugExists(slug, bundleId)) {
    return NextResponse.json(
      { error: "Bu slug zaten kullanılıyor." },
      { status: 409 }
    );
  }

  const bundle = await updateBundle(bundleId, {
    slug,
    title,
    imageUrl: body.imageUrl || null,
    description,
    nights,
    destinations: Array.isArray(body.destinations) ? body.destinations : [],
    price,
    originalPrice: body.originalPrice ? Number(body.originalPrice) : null,
    includes: Array.isArray(body.includes) ? body.includes : [],
    badge: body.badge || null,
    status: body.status || "active",
    translations: body.translations && typeof body.translations === "object" ? body.translations : {},
  });

  if (!bundle) {
    return NextResponse.json({ error: "Bundle bulunamadı." }, { status: 404 });
  }
  return NextResponse.json({ bundle });
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await getSession();
  if (!session || session.role !== "admin") {
    return NextResponse.json({ error: "Yetkiniz yok." }, { status: 403 });
  }

  const { id } = await params;
  const result = await deleteBundle(Number(id));
  if (!result.ok) {
    if (result.reservationCount) {
      return NextResponse.json(
        {
          error: `Bu bundle'a ait ${result.reservationCount} rezervasyon kaydı var, bu yüzden silinemez. Önce bundle'ı "pasif" yapabilirsiniz.`,
        },
        { status: 409 }
      );
    }
    return NextResponse.json({ error: "Bundle bulunamadı." }, { status: 404 });
  }
  return NextResponse.json({ ok: true });
}

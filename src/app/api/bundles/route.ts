import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/session";
import { listAllBundles, createBundle, bundleSlugExists } from "@/lib/bundles";

export async function GET() {
  const session = await getSession();
  if (!session || session.role !== "admin") {
    return NextResponse.json({ error: "Yetkiniz yok." }, { status: 403 });
  }
  const bundles = await listAllBundles();
  return NextResponse.json({ bundles });
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

  if (!/^[a-z0-9-]+$/.test(slug)) {
    return NextResponse.json(
      { error: "Slug sadece küçük harf, rakam ve tire (-) içerebilir." },
      { status: 400 }
    );
  }

  if (await bundleSlugExists(slug)) {
    return NextResponse.json(
      { error: "Bu slug zaten kullanılıyor." },
      { status: 409 }
    );
  }

  const bundle = await createBundle({
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
  });

  return NextResponse.json({ bundle }, { status: 201 });
}

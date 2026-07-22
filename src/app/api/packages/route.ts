import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/session";
import { listAllPackages, listPackagesByPartner, createPackage } from "@/lib/packages";

export async function GET() {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Giriş gerekli." }, { status: 401 });
  }

  const packages =
    session.role === "admin"
      ? await listAllPackages()
      : await listPackagesByPartner(session.userId);

  return NextResponse.json({ packages });
}

export async function POST(req: NextRequest) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Giriş gerekli." }, { status: 401 });
  }

  const body = await req.json().catch(() => null);
  if (!body?.title || !body?.destination) {
    return NextResponse.json(
      { error: "Başlık ve destinasyon gerekli." },
      { status: 400 }
    );
  }

  const nights = Number(body.nights) || 1;
  const priceTry = Number(body.priceTry) || 0;
  const capacity = Number(body.capacity) || 0;
  // `Infinity`/`-Infinity` her iki karşılaştırmayı da (<1, <0) geçebilir
  // (Infinity < 1 false, ama -Infinity < 0 true olur) — Number.isFinite ile
  // her iki uca karşı da koruma sağlanıyor (bundles/destinations route'larıyla aynı desen).
  // nights/capacity DB'de INTEGER sütun — ondalıklı bir değer (ör. 2.5)
  // Number.isFinite'ı geçer ama INSERT sırasında Postgres'te yakalanmamış
  // bir hataya yol açar, bu yüzden ayrıca Number.isInteger kontrol ediliyor.
  if (
    !Number.isFinite(nights) || !Number.isInteger(nights) || nights < 1 ||
    !Number.isFinite(priceTry) || priceTry < 0 ||
    !Number.isFinite(capacity) || !Number.isInteger(capacity) || capacity < 0
  ) {
    return NextResponse.json(
      { error: "Gece sayısı en az 1 tam sayı olmalı, fiyat ve kontenjan negatif olmayan bir sayı olmalı." },
      { status: 400 }
    );
  }

  // Çoklu foto galerisi — en fazla MAX_IMAGES adet, hepsi dolu string olmalı.
  // undefined ise (alan hiç gönderilmemişse) boş galeri olarak kabul edilir.
  const MAX_IMAGES = 10;
  const imageUrlsRaw = body.imageUrls;
  let imageUrls: string[] = [];
  if (imageUrlsRaw !== undefined) {
    if (
      !Array.isArray(imageUrlsRaw) ||
      imageUrlsRaw.length > MAX_IMAGES ||
      imageUrlsRaw.some((u: unknown) => typeof u !== "string" || !u.trim())
    ) {
      return NextResponse.json(
        { error: `Görsel listesi en fazla ${MAX_IMAGES} adet, dolu metin değerlerinden oluşan bir dizi olmalı.` },
        { status: 400 }
      );
    }
    imageUrls = imageUrlsRaw;
  }

  // Admin, istediği acente adına paket ekleyebilir (body'den partnerId/partnerName gelir).
  // Partner (acente) ise her zaman kendi adına ekler, body'deki değerler göz ardı edilir.
  const partnerId =
    session.role === "admin" && body.partnerId ? body.partnerId : session.userId;
  const partnerName =
    session.role === "admin" && body.partnerName ? body.partnerName : session.displayName;

  try {
    const created = await createPackage({
      partnerId,
      partnerName,
      title: body.title,
      destination: body.destination,
      nights,
      priceTry,
      capacity,
      description: body.description || "",
      imageUrls,
    });
    return NextResponse.json({ package: created }, { status: 201 });
  } catch (err) {
    console.error("[packages POST]", err);
    return NextResponse.json({ error: "Paket oluşturulurken bir hata oluştu." }, { status: 500 });
  }
}

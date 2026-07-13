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
  if (nights < 1 || priceTry < 0 || capacity < 0) {
    return NextResponse.json(
      { error: "Gece sayısı en az 1, fiyat ve kontenjan negatif olamaz." },
      { status: 400 }
    );
  }

  // Admin, istediği acente adına paket ekleyebilir (body'den partnerId/partnerName gelir).
  // Partner (acente) ise her zaman kendi adına ekler, body'deki değerler göz ardı edilir.
  const partnerId =
    session.role === "admin" && body.partnerId ? body.partnerId : session.userId;
  const partnerName =
    session.role === "admin" && body.partnerName ? body.partnerName : session.displayName;

  const created = await createPackage({
    partnerId,
    partnerName,
    title: body.title,
    destination: body.destination,
    nights,
    priceTry,
    capacity,
    description: body.description || "",
    imageUrl: body.imageUrl || undefined,
  });

  return NextResponse.json({ package: created }, { status: 201 });
}

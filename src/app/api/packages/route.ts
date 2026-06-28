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

  const created = await createPackage({
    partnerId: session.userId,
    partnerName: session.displayName,
    title: body.title,
    destination: body.destination,
    nights: Number(body.nights) || 1,
    priceTry: Number(body.priceTry) || 0,
    capacity: Number(body.capacity) || 0,
    description: body.description || "",
  });

  return NextResponse.json({ package: created }, { status: 201 });
}

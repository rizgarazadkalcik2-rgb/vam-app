import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/session";
import { createReservation, listAllReservations, listReservationsByPartner } from "@/lib/reservations";
import { getPackageById } from "@/lib/packages";

export async function GET() {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Giriş gerekli." }, { status: 401 });
  }

  const reservations =
    session.role === "admin"
      ? await listAllReservations()
      : await listReservationsByPartner(session.userId);

  return NextResponse.json({ reservations });
}

// Müşteri rezervasyon oluşturuyor — giriş gerektirmez, herkes erişebilir.
export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null);

  const packageId = Number(body?.packageId);
  const customerName = body?.customerName?.trim();
  const customerEmail = body?.customerEmail?.trim();
  const customerPhone = body?.customerPhone?.trim() || "";
  const travelDate = body?.travelDate || null;
  const guestCount = Number(body?.guestCount) || 1;
  const notes = body?.notes?.trim() || "";

  if (!packageId || !customerName || !customerEmail) {
    return NextResponse.json(
      { error: "Paket, ad ve e-posta gerekli." },
      { status: 400 }
    );
  }

  const pkg = await getPackageById(packageId);
  if (!pkg) {
    return NextResponse.json({ error: "Paket bulunamadı." }, { status: 404 });
  }

  if (pkg.status !== "active") {
    return NextResponse.json(
      { error: "Bu paket şu anda rezervasyona açık değil." },
      { status: 400 }
    );
  }

  const totalPrice = Number(pkg.price_try) * guestCount;

  const reservation = await createReservation({
    packageId: pkg.id,
    partnerId: pkg.partner_id,
    partnerName: pkg.partner_name,
    packageTitle: pkg.title,
    customerName,
    customerEmail,
    customerPhone,
    travelDate,
    guestCount,
    notes,
    totalPrice,
  });

  // NOT: Ödeme entegrasyonu (iyzico) henüz bağlı değil.
  // Rezervasyon "payment_status: pending" olarak kaydediliyor.
  // İyzico entegre edildiğinde, burada ödeme başlatma adımı eklenecek.

  return NextResponse.json({ reservation }, { status: 201 });
}

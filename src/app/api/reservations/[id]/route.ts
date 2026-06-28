import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/session";
import { getReservationById, updateReservationStatus, updatePaymentStatus } from "@/lib/reservations";

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Giriş gerekli." }, { status: 401 });
  }

  const { id } = await params;
  const reservation = await getReservationById(Number(id));
  if (!reservation) {
    return NextResponse.json({ error: "Rezervasyon bulunamadı." }, { status: 404 });
  }

  // Partner sadece kendi rezervasyonunu görebilir, admin hepsini değiştirebilir.
  if (session.role !== "admin" && reservation.partner_id !== session.userId) {
    return NextResponse.json({ error: "Yetkiniz yok." }, { status: 403 });
  }

  const body = await req.json().catch(() => null);
  if (!body) {
    return NextResponse.json({ error: "Geçersiz veri." }, { status: 400 });
  }

  // Sadece admin durum değiştirebilir; partner salt okunur erişime sahip.
  if (session.role !== "admin") {
    return NextResponse.json({ error: "Yetkiniz yok." }, { status: 403 });
  }

  let updated = reservation;
  if (body.reservationStatus) {
    const result = await updateReservationStatus(Number(id), body.reservationStatus);
    if (result) updated = result;
  }
  if (body.paymentStatus) {
    const result = await updatePaymentStatus(Number(id), body.paymentStatus);
    if (result) updated = result;
  }

  return NextResponse.json({ reservation: updated });
}

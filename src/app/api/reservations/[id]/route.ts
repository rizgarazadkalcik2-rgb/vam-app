import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/session";
import {
  getReservationById,
  updateReservationStatus,
  updatePaymentStatus,
  anonymizeReservationCustomerData,
} from "@/lib/reservations";

// Admin panelinin gösterdiği (ve tanıdığı) tek değerler bunlar — bkz.
// ReservationsPanel.tsx RESERVATION_STATUS_LABELS/PAYMENT_STATUS_LABELS.
// Whitelist olmadan burası herhangi bir string'i DB'ye yazardı.
const VALID_RESERVATION_STATUSES = new Set(["new", "confirmed", "cancelled"]);
const VALID_PAYMENT_STATUSES = new Set(["pending", "paid", "refunded"]);

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Giriş gerekli." }, { status: 401 });
  }

  const { id } = await params;
  const reservationId = Number(id);
  if (!Number.isFinite(reservationId)) {
    return NextResponse.json({ error: "Geçersiz rezervasyon ID." }, { status: 400 });
  }

  const reservation = await getReservationById(reservationId);
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

  if (body.reservationStatus && !VALID_RESERVATION_STATUSES.has(body.reservationStatus)) {
    return NextResponse.json({ error: "Geçersiz rezervasyon durumu." }, { status: 400 });
  }
  if (body.paymentStatus && !VALID_PAYMENT_STATUSES.has(body.paymentStatus)) {
    return NextResponse.json({ error: "Geçersiz ödeme durumu." }, { status: 400 });
  }

  let updated = reservation;
  if (body.reservationStatus) {
    const result = await updateReservationStatus(reservationId, body.reservationStatus);
    if (result) updated = result;
  }
  if (body.paymentStatus) {
    const result = await updatePaymentStatus(reservationId, body.paymentStatus);
    if (result) updated = result;
  }

  // KVKK/GDPR silme talebi — sadece kişisel veriler temizlenir, kayıt kalır (bkz. reservations.ts).
  if (body.anonymizeCustomerData === true) {
    const result = await anonymizeReservationCustomerData(reservationId);
    if (result) updated = result;
  }

  return NextResponse.json({ reservation: updated });
}

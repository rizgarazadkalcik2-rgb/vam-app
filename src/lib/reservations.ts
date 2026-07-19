import { sql } from "@vercel/postgres";
import { ensureSchema } from "./schema";

export interface VamReservation {
  id: number;
  package_id: number | null;
  bundle_id: number | null;
  partner_id: string;
  partner_name: string;
  package_title: string;
  customer_name: string;
  customer_email: string;
  customer_phone: string | null;
  travel_date: string | null;
  guest_count: number;
  notes: string | null;
  total_price: number;
  payment_status: string;
  reservation_status: string;
  created_at: string;
  updated_at: string;
}

export async function createReservation(data: {
  packageId?: number | null;
  bundleId?: number | null;
  partnerId: string;
  partnerName: string;
  packageTitle: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  travelDate: string | null;
  guestCount: number;
  notes: string;
  totalPrice: number;
}): Promise<VamReservation> {
  await ensureSchema();
  const { rows } = await sql<VamReservation>`
    INSERT INTO reservations (
      package_id, bundle_id, partner_id, partner_name, package_title,
      customer_name, customer_email, customer_phone,
      travel_date, guest_count, notes, total_price,
      payment_status, reservation_status
    )
    VALUES (
      ${data.packageId ?? null}, ${data.bundleId ?? null}, ${data.partnerId}, ${data.partnerName}, ${data.packageTitle},
      ${data.customerName}, ${data.customerEmail}, ${data.customerPhone},
      ${data.travelDate}, ${data.guestCount}, ${data.notes}, ${data.totalPrice},
      'pending', 'new'
    )
    RETURNING *;
  `;
  return rows[0];
}

export async function listAllReservations(): Promise<VamReservation[]> {
  await ensureSchema();
  const { rows } = await sql<VamReservation>`
    SELECT * FROM reservations ORDER BY created_at DESC;
  `;
  return rows;
}

export async function listReservationsByPartner(partnerId: string): Promise<VamReservation[]> {
  await ensureSchema();
  const { rows } = await sql<VamReservation>`
    SELECT * FROM reservations WHERE partner_id = ${partnerId} ORDER BY created_at DESC;
  `;
  return rows;
}

export async function updateReservationStatus(
  id: number,
  reservationStatus: string
): Promise<VamReservation | null> {
  await ensureSchema();
  const { rows } = await sql<VamReservation>`
    UPDATE reservations
    SET reservation_status = ${reservationStatus}, updated_at = now()
    WHERE id = ${id}
    RETURNING *;
  `;
  return rows[0] || null;
}

export async function updatePaymentStatus(
  id: number,
  paymentStatus: string
): Promise<VamReservation | null> {
  await ensureSchema();
  const { rows } = await sql<VamReservation>`
    UPDATE reservations
    SET payment_status = ${paymentStatus}, updated_at = now()
    WHERE id = ${id}
    RETURNING *;
  `;
  return rows[0] || null;
}

export async function getReservationById(id: number): Promise<VamReservation | null> {
  await ensureSchema();
  const { rows } = await sql<VamReservation>`
    SELECT * FROM reservations WHERE id = ${id} LIMIT 1;
  `;
  return rows[0] || null;
}

// KVKK/GDPR: gizlilik politikamız kullanıcılara verilerinin silinmesini talep
// etme hakkı tanıyor (bkz. /gizlilik-politikasi). Rezervasyon kaydını (fiyat/
// tarih/durum — muhasebe ve kontenjan hesapları için gerekli) tamamen silmek
// yerine, sadece kişisel verileri (ad/e-posta/telefon/not) sabit bir
// yer tutucuyla değiştiriyoruz — bu hem yasal talebi karşılar hem iş
// verisinin bütünlüğünü (toplam ciro, kontenjan geçmişi vb.) korur.
const ANONYMIZED_NAME = "[Silinen Müşteri Verisi]";
const ANONYMIZED_EMAIL = "silindi@visitvam.com";

export async function anonymizeReservationCustomerData(id: number): Promise<VamReservation | null> {
  await ensureSchema();
  const { rows } = await sql<VamReservation>`
    UPDATE reservations
    SET customer_name = ${ANONYMIZED_NAME},
        customer_email = ${ANONYMIZED_EMAIL},
        customer_phone = NULL,
        notes = NULL,
        updated_at = now()
    WHERE id = ${id}
    RETURNING *;
  `;
  return rows[0] || null;
}

// İptal edilmemiş rezervasyonlardaki toplam kişi sayısını döner (kalan kontenjan hesaplamak için).
export async function getReservedGuestCountForPackage(packageId: number): Promise<number> {
  await ensureSchema();
  const { rows } = await sql<{ total: string | null }>`
    SELECT COALESCE(SUM(guest_count), 0) as total
    FROM reservations
    WHERE package_id = ${packageId} AND reservation_status != 'cancelled';
  `;
  return Number(rows[0]?.total || 0);
}

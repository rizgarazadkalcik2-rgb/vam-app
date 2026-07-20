import { sql } from "@vercel/postgres";
import { ensureSchema } from "./schema";
import { normalizePgDate } from "./pgDate";

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

// travel_date bir Postgres DATE kolonu — sürücü bunu JS Date nesnesi olarak
// döner (bkz. pgDate.ts). Tip beyanımız (VamReservation.travel_date: string)
// ile gerçek çalışma zamanı değerini eşleştirmek için her okuma noktasında
// normalize ediyoruz.
function normalizeReservation(row: VamReservation): VamReservation {
  return { ...row, travel_date: normalizePgDate(row.travel_date) };
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
  return normalizeReservation(rows[0]);
}

export type PackageReservationResult =
  | { ok: true; reservation: VamReservation }
  | { ok: false; error: "PACKAGE_NOT_FOUND" | "PACKAGE_FULL" };

// createReservation'ın paket-kapasiteli sürümü: kapasite kontrolü ve INSERT
// aynı transaction içinde, packages satırı FOR UPDATE ile kilitlenerek yapılır.
// Bu olmadan iki eşzamanlı rezervasyon isteği aynı "henüz X kişi rezerve
// edilmiş" anlık görüntüsünü okuyup ikisi de kapasite kontrolünü geçebilir
// (klasik TOCTOU yarış koşulu, kontenjan aşımına yol açar). FOR UPDATE, aynı
// paket için eşzamanlı çağrıları bu transaction commit/rollback olana kadar
// sıraya sokar.
export async function createPackageReservation(
  packageId: number,
  guestCount: number,
  data: {
    partnerId: string;
    partnerName: string;
    packageTitle: string;
    customerName: string;
    customerEmail: string;
    customerPhone: string;
    travelDate: string | null;
    notes: string;
    totalPrice: number;
  }
): Promise<PackageReservationResult> {
  await ensureSchema();
  const client = await sql.connect();
  try {
    await client.sql`BEGIN`;
    const { rows: pkgRows } = await client.sql`
      SELECT capacity FROM packages WHERE id = ${packageId} FOR UPDATE;
    `;
    if (pkgRows.length === 0) {
      await client.sql`ROLLBACK`;
      return { ok: false, error: "PACKAGE_NOT_FOUND" };
    }
    const capacity = Number(pkgRows[0].capacity);
    const { rows: sumRows } = await client.sql`
      SELECT COALESCE(SUM(guest_count), 0) as total
      FROM reservations
      WHERE package_id = ${packageId} AND reservation_status != 'cancelled';
    `;
    const alreadyReserved = Number(sumRows[0].total);
    if (alreadyReserved + guestCount > capacity) {
      await client.sql`ROLLBACK`;
      return { ok: false, error: "PACKAGE_FULL" };
    }
    const { rows } = await client.sql<VamReservation>`
      INSERT INTO reservations (
        package_id, bundle_id, partner_id, partner_name, package_title,
        customer_name, customer_email, customer_phone,
        travel_date, guest_count, notes, total_price,
        payment_status, reservation_status
      )
      VALUES (
        ${packageId}, NULL, ${data.partnerId}, ${data.partnerName}, ${data.packageTitle},
        ${data.customerName}, ${data.customerEmail}, ${data.customerPhone},
        ${data.travelDate}, ${guestCount}, ${data.notes}, ${data.totalPrice},
        'pending', 'new'
      )
      RETURNING *;
    `;
    await client.sql`COMMIT`;
    return { ok: true, reservation: normalizeReservation(rows[0]) };
  } catch (err) {
    await client.sql`ROLLBACK`;
    throw err;
  } finally {
    client.release();
  }
}

export async function listAllReservations(): Promise<VamReservation[]> {
  await ensureSchema();
  const { rows } = await sql<VamReservation>`
    SELECT * FROM reservations ORDER BY created_at DESC;
  `;
  return rows.map(normalizeReservation);
}

export async function listReservationsByPartner(partnerId: string): Promise<VamReservation[]> {
  await ensureSchema();
  const { rows } = await sql<VamReservation>`
    SELECT * FROM reservations WHERE partner_id = ${partnerId} ORDER BY created_at DESC;
  `;
  return rows.map(normalizeReservation);
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
  return rows[0] ? normalizeReservation(rows[0]) : null;
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
  return rows[0] ? normalizeReservation(rows[0]) : null;
}

export async function getReservationById(id: number): Promise<VamReservation | null> {
  await ensureSchema();
  const { rows } = await sql<VamReservation>`
    SELECT * FROM reservations WHERE id = ${id} LIMIT 1;
  `;
  return rows[0] ? normalizeReservation(rows[0]) : null;
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
  return rows[0] ? normalizeReservation(rows[0]) : null;
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

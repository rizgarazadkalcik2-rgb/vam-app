import { sql } from "@vercel/postgres";
import { ensureSchema } from "./schema";

export interface VamReservation {
  id: number;
  package_id: number;
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
  packageId: number;
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
      package_id, partner_id, partner_name, package_title,
      customer_name, customer_email, customer_phone,
      travel_date, guest_count, notes, total_price,
      payment_status, reservation_status
    )
    VALUES (
      ${data.packageId}, ${data.partnerId}, ${data.partnerName}, ${data.packageTitle},
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

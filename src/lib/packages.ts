import { sql } from "@vercel/postgres";
import { ensureSchema } from "./schema";

export interface VamPackage {
  id: number;
  partner_id: string;
  partner_name: string;
  title: string;
  destination: string;
  nights: number;
  price_try: number;
  capacity: number;
  description: string | null;
  status: string;
  created_at: string;
  updated_at: string;
}

export async function listAllPackages(): Promise<VamPackage[]> {
  await ensureSchema();
  const { rows } = await sql<VamPackage>`
    SELECT * FROM packages ORDER BY created_at DESC;
  `;
  return rows;
}

export async function listPackagesByPartner(partnerId: string): Promise<VamPackage[]> {
  await ensureSchema();
  const { rows } = await sql<VamPackage>`
    SELECT * FROM packages WHERE partner_id = ${partnerId} ORDER BY created_at DESC;
  `;
  return rows;
}

export async function createPackage(data: {
  partnerId: string;
  partnerName: string;
  title: string;
  destination: string;
  nights: number;
  priceTry: number;
  capacity: number;
  description: string;
}): Promise<VamPackage> {
  await ensureSchema();
  const { rows } = await sql<VamPackage>`
    INSERT INTO packages (partner_id, partner_name, title, destination, nights, price_try, capacity, description)
    VALUES (${data.partnerId}, ${data.partnerName}, ${data.title}, ${data.destination}, ${data.nights}, ${data.priceTry}, ${data.capacity}, ${data.description})
    RETURNING *;
  `;
  return rows[0];
}

export async function updatePackage(
  id: number,
  partnerId: string,
  isAdmin: boolean,
  data: {
    title: string;
    destination: string;
    nights: number;
    priceTry: number;
    capacity: number;
    description: string;
    status: string;
  }
): Promise<VamPackage | null> {
  await ensureSchema();
  // partner sadece kendi paketini düzenleyebilir; admin hepsini düzenleyebilir
  const { rows } = isAdmin
    ? await sql<VamPackage>`
        UPDATE packages
        SET title = ${data.title}, destination = ${data.destination}, nights = ${data.nights},
            price_try = ${data.priceTry}, capacity = ${data.capacity}, description = ${data.description},
            status = ${data.status}, updated_at = now()
        WHERE id = ${id}
        RETURNING *;
      `
    : await sql<VamPackage>`
        UPDATE packages
        SET title = ${data.title}, destination = ${data.destination}, nights = ${data.nights},
            price_try = ${data.priceTry}, capacity = ${data.capacity}, description = ${data.description},
            status = ${data.status}, updated_at = now()
        WHERE id = ${id} AND partner_id = ${partnerId}
        RETURNING *;
      `;
  return rows[0] || null;
}

export async function deletePackage(
  id: number,
  partnerId: string,
  isAdmin: boolean
): Promise<boolean> {
  await ensureSchema();
  const { rowCount } = isAdmin
    ? await sql`DELETE FROM packages WHERE id = ${id};`
    : await sql`DELETE FROM packages WHERE id = ${id} AND partner_id = ${partnerId};`;
  return (rowCount ?? 0) > 0;
}

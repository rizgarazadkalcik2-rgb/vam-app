import { NextResponse } from "next/server";
import { sql } from "@vercel/postgres";
import { ensureSchema } from "@/lib/schema";
import type { VamPackage } from "@/lib/packages";

// Herkese açık endpoint — sadece aktif paketleri, hassas olmayan alanlarla döndürür.
// Müşteri tarafındaki statik sayfalar (Ana Sayfa, Destinations vb.) bu API'yi kullanır.
export async function GET() {
  await ensureSchema();
  const { rows } = await sql<VamPackage>`
    SELECT id, title, destination, nights, price_try, capacity, description, image_url, partner_name, status
    FROM packages
    WHERE status = 'active'
      AND (partner_name IS NULL OR partner_name NOT ILIKE 'test%')
      AND title NOT ILIKE 'test%'
    ORDER BY created_at DESC;
  `;
  return NextResponse.json({ packages: rows });
}

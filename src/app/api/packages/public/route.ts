import { NextResponse } from "next/server";
import { sql } from "@vercel/postgres";
import { ensureSchema } from "@/lib/schema";
import type { VamPackage } from "@/lib/packages";

// Bu route, veritabanından her istekte taze veri okumalı — aksi halde
// Next.js dinamik fonksiyon kullanılmadığını görüp yanıtı build zamanında
// statik olarak önbelleğe alabilir ve admin panelinden eklenen yeni
// paketler siteye hiç yansımaz.
export const dynamic = "force-dynamic";

// Herkese açık endpoint — sadece aktif paketleri, hassas olmayan alanlarla döndürür.
// Müşteri tarafındaki statik sayfalar (Ana Sayfa, Destinations vb.) bu API'yi kullanır.
export async function GET() {
  await ensureSchema();
  const { rows } = await sql<VamPackage>`
    SELECT id, title, destination, nights, price_try, capacity, description, image_url, category, partner_name, status
    FROM packages
    WHERE status = 'active'
      AND (partner_name IS NULL OR partner_name NOT ILIKE 'test%')
      AND title NOT ILIKE 'test%'
    ORDER BY sort_order ASC, created_at DESC;
  `;
  return NextResponse.json({ packages: rows });
}

import { NextResponse } from "next/server";
import { listActiveDestinations } from "@/lib/destinations";

// Build-zamanı statik önbelleklemeyi engelle — admin panelinden eklenen
// yeni destinasyonların anında görünmesi için şart.
export const dynamic = "force-dynamic";

// Herkese açık endpoint — sadece aktif destinasyonları döndürür.
export async function GET() {
  const destinations = await listActiveDestinations();
  return NextResponse.json({ destinations });
}

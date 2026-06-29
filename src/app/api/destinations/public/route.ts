import { NextResponse } from "next/server";
import { listActiveDestinations } from "@/lib/destinations";

// Herkese açık endpoint — sadece aktif destinasyonları döndürür.
export async function GET() {
  const destinations = await listActiveDestinations();
  return NextResponse.json({ destinations });
}

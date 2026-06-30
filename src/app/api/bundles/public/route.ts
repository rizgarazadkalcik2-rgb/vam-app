import { NextResponse } from "next/server";
import { listActiveBundles } from "@/lib/bundles";

// Build-zamanı statik önbelleklemeyi engelle — admin panelinden eklenen
// yeni bundle'ların anında görünmesi için şart.
export const dynamic = "force-dynamic";

// Herkese açık endpoint — sadece aktif bundle paketlerini döndürür.
export async function GET() {
  const bundles = await listActiveBundles();
  return NextResponse.json({ bundles });
}

import { NextResponse } from "next/server";
import { listActiveBundles } from "@/lib/bundles";

// Herkese açık endpoint — sadece aktif bundle paketlerini döndürür.
export async function GET() {
  const bundles = await listActiveBundles();
  return NextResponse.json({ bundles });
}

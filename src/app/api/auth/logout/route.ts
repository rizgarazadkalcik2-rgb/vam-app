import { NextResponse } from "next/server";
import { clearSessionCookie, getSession } from "@/lib/session";
import { bumpSessionVersion } from "@/lib/users";

export async function POST() {
  const session = await getSession();
  if (session) {
    // Çıkış yapılan JWT'yi sunucu tarafında da geçersiz kıl — aksi halde
    // token doğal süresi (7 gün) dolana kadar geçerli kalmaya devam eder.
    await bumpSessionVersion(session.userId);
  }
  await clearSessionCookie();
  return NextResponse.json({ ok: true });
}

import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { getSession, createSessionToken, setSessionCookie } from "@/lib/session";
import { findUserById, updateUserPassword } from "@/lib/users";
import { rateLimit } from "@/lib/rateLimit";

export async function POST(req: NextRequest) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Giriş gerekli." }, { status: 401 });
  }

  // Kullanıcı başına sınırlama — çalıntı/paylaşılan bir oturum çerezi
  // olsa bile mevcut şifreyi bcrypt.compare ile sınırsız denemeyi engeller.
  const { allowed, remainingMs } = await rateLimit(`changepw:${session.userId}`, 5, 15 * 60 * 1000);
  if (!allowed) {
    const minutes = Math.ceil(remainingMs / 60000);
    return NextResponse.json(
      { error: `Çok fazla deneme yapıldı. Lütfen ${minutes} dakika sonra tekrar deneyin.` },
      { status: 429 }
    );
  }

  const body = await req.json().catch(() => null);
  if (body === null) {
    return NextResponse.json({ error: "Geçersiz istek gövdesi." }, { status: 400 });
  }
  const currentPassword = body?.currentPassword;
  const newPassword = body?.newPassword;

  if (!currentPassword || !newPassword) {
    return NextResponse.json(
      { error: "Mevcut şifre ve yeni şifre gerekli." },
      { status: 400 }
    );
  }

  if (newPassword.length < 12) {
    return NextResponse.json(
      { error: "Yeni şifre en az 12 karakter olmalı." },
      { status: 400 }
    );
  }

  const user = await findUserById(session.userId);
  if (!user) {
    return NextResponse.json({ error: "Kullanıcı bulunamadı." }, { status: 404 });
  }

  const valid = await bcrypt.compare(currentPassword, user.password_hash);
  if (!valid) {
    return NextResponse.json({ error: "Mevcut şifre hatalı." }, { status: 401 });
  }

  await updateUserPassword(session.userId, newPassword);

  // updateUserPassword session_version'ı artırır, bu da mevcut çerezi
  // (imza geçerli olsa bile) anında geçersiz kılar — kendi şifresini
  // değiştiren kullanıcı aynı anda oturumdan atılmasın diye yeni sürümle
  // taze bir token verip çerezi güncelliyoruz.
  const updatedUser = await findUserById(session.userId);
  if (updatedUser) {
    const token = await createSessionToken({
      userId: updatedUser.id,
      username: updatedUser.username,
      role: updatedUser.role,
      displayName: updatedUser.display_name,
      sessionVersion: updatedUser.session_version,
    });
    await setSessionCookie(token);
  }

  return NextResponse.json({ ok: true });
}

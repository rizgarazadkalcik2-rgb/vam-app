import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import {
  findUserByUsername,
  recordFailedLogin,
  resetFailedLogins,
  isLocked,
  lockRemainingSeconds,
} from "@/lib/users";
import { createSessionToken, setSessionCookie } from "@/lib/session";
import { rateLimit, getClientIp } from "@/lib/rateLimit";

export async function POST(req: NextRequest) {
  const ip = getClientIp(req);
  const { allowed, remainingMs } = await rateLimit(`login:${ip}`, 10, 5 * 60 * 1000); // 5 dakikada 10 deneme
  if (!allowed) {
    const minutes = Math.ceil(remainingMs / 60000);
    return NextResponse.json(
      { error: `Çok fazla giriş denemesi yapıldı. Lütfen ${minutes} dakika sonra tekrar deneyin.` },
      { status: 429 }
    );
  }

  const body = await req.json().catch(() => null);
  const username = body?.username?.trim();
  const password = body?.password;

  if (!username || !password) {
    return NextResponse.json(
      { error: "Kullanıcı adı ve şifre gerekli." },
      { status: 400 }
    );
  }

  const user = await findUserByUsername(username);
  if (!user || user.status === "disabled") {
    return NextResponse.json(
      { error: "Kullanıcı adı veya şifre hatalı." },
      { status: 401 }
    );
  }

  if (isLocked(user)) {
    const seconds = lockRemainingSeconds(user);
    const minutes = Math.ceil(seconds / 60);
    return NextResponse.json(
      { error: `Çok fazla başarısız giriş denemesi. Lütfen ${minutes} dakika sonra tekrar deneyin.` },
      { status: 429 }
    );
  }

  const valid = await bcrypt.compare(password, user.password_hash);
  if (!valid) {
    await recordFailedLogin(user.id);
    return NextResponse.json(
      { error: "Kullanıcı adı veya şifre hatalı." },
      { status: 401 }
    );
  }

  await resetFailedLogins(user.id);

  const token = await createSessionToken({
    userId: user.id,
    username: user.username,
    role: user.role,
    displayName: user.display_name,
  });
  await setSessionCookie(token);

  return NextResponse.json({
    ok: true,
    role: user.role,
    redirect: user.role === "admin" ? "/admin" : "/acente",
  });
}

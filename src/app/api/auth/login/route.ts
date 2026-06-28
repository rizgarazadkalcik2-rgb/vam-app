import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { findUserByUsername } from "@/lib/users";
import { createSessionToken, setSessionCookie } from "@/lib/session";

export async function POST(req: NextRequest) {
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

  const valid = await bcrypt.compare(password, user.password_hash);
  if (!valid) {
    return NextResponse.json(
      { error: "Kullanıcı adı veya şifre hatalı." },
      { status: 401 }
    );
  }

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

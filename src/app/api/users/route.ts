import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/session";
import { listAllUsers, createUser, usernameExists } from "@/lib/users";

export async function GET() {
  const session = await getSession();
  if (!session || session.role !== "admin") {
    return NextResponse.json({ error: "Yetkiniz yok." }, { status: 403 });
  }

  const users = await listAllUsers();
  // Şifre hash'ini asla client'a gönderme
  const safeUsers = users.map(({ password_hash, ...rest }) => rest);
  return NextResponse.json({ users: safeUsers });
}

export async function POST(req: NextRequest) {
  const session = await getSession();
  if (!session || session.role !== "admin") {
    return NextResponse.json({ error: "Yetkiniz yok." }, { status: 403 });
  }

  const body = await req.json().catch(() => null);
  const username = body?.username?.trim();
  const password = body?.password;
  const displayName = body?.displayName?.trim();
  const role = body?.role === "admin" ? "admin" : "partner";

  if (!username || !password || !displayName) {
    return NextResponse.json(
      { error: "Kullanıcı adı, şifre ve görünen ad gerekli." },
      { status: 400 }
    );
  }

  if (password.length < 6) {
    return NextResponse.json(
      { error: "Şifre en az 6 karakter olmalı." },
      { status: 400 }
    );
  }

  if (await usernameExists(username)) {
    return NextResponse.json(
      { error: "Bu kullanıcı adı zaten kullanılıyor." },
      { status: 409 }
    );
  }

  const user = await createUser({ username, password, role, displayName });
  const { password_hash, ...safeUser } = user;
  return NextResponse.json({ user: safeUser }, { status: 201 });
}

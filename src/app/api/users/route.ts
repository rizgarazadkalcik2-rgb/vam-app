import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/session";
import { listAllUsers, createUser, usernameExists } from "@/lib/users";
import { isUniqueViolation } from "@/lib/pgErrors";

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
  if (body === null) {
    return NextResponse.json({ error: "Geçersiz istek gövdesi." }, { status: 400 });
  }
  if (typeof body?.username !== "string" || typeof body?.password !== "string" || typeof body?.displayName !== "string") {
    return NextResponse.json(
      { error: "Kullanıcı adı, şifre ve görünen ad gerekli." },
      { status: 400 }
    );
  }
  const username = body.username.trim();
  const password = body.password;
  const displayName = body.displayName.trim();
  const role = body?.role === "admin" ? "admin" : "partner";

  if (!username || !password || !displayName) {
    return NextResponse.json(
      { error: "Kullanıcı adı, şifre ve görünen ad gerekli." },
      { status: 400 }
    );
  }

  if (password.length < 12) {
    return NextResponse.json(
      { error: "Şifre en az 12 karakter olmalı." },
      { status: 400 }
    );
  }

  if (await usernameExists(username)) {
    return NextResponse.json(
      { error: "Bu kullanıcı adı zaten kullanılıyor." },
      { status: 409 }
    );
  }

  // ?.trim?.() — bu alanlar string olmayan bir değerle (ör. sayı) gelirse
  // ?.trim() TypeError fırlatır; ?.trim?.() bu durumda sessizce undefined
  // döner (users/[id]/route.ts'teki PATCH ile aynı desen).
  const companyEmail = body?.companyEmail?.trim?.() || null;
  const companyPhone = body?.companyPhone?.trim?.() || null;
  const companyAddress = body?.companyAddress?.trim?.() || null;
  const companyServices = body?.companyServices?.trim?.() || null;

  try {
    const user = await createUser({
      username, password, role, displayName,
      companyEmail, companyPhone, companyAddress, companyServices,
    });
    const { password_hash, ...safeUser } = user;
    return NextResponse.json({ user: safeUser }, { status: 201 });
  } catch (err) {
    // usernameExists() ön-kontrolü ile INSERT arasında (çok nadir) bir
    // zamanlama penceresinde iki admin aynı kullanıcı adını oluşturabilir —
    // DB'nin UNIQUE kısıtlaması bunu reddeder, burada dostane 409'a çeviriyoruz.
    if (isUniqueViolation(err)) {
      return NextResponse.json({ error: "Bu kullanıcı adı zaten kullanılıyor." }, { status: 409 });
    }
    console.error("[users POST]", err);
    return NextResponse.json({ error: "Kullanıcı oluşturulurken bir hata oluştu." }, { status: 500 });
  }
}

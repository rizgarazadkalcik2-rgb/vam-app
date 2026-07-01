import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/session";
import {
  updateUserPassword,
  updateUserStatus,
  updateUserDisplayName,
  deleteUser,
  findUserById,
} from "@/lib/users";

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getSession();
  if (!session || session.role !== "admin") {
    return NextResponse.json({ error: "Yetkiniz yok." }, { status: 403 });
  }

  const { id } = await params;
  const body = await req.json().catch(() => null);
  if (!body) {
    return NextResponse.json({ error: "Geçersiz veri." }, { status: 400 });
  }

  const target = await findUserById(id);
  if (!target) {
    return NextResponse.json({ error: "Kullanıcı bulunamadı." }, { status: 404 });
  }

  // Admin kendi kendini devre dışı bırakamasın (kilitli kalmasın diye)
  if (id === session.userId && body.status === "disabled") {
    return NextResponse.json(
      { error: "Kendi hesabınızı devre dışı bırakamazsınız." },
      { status: 400 }
    );
  }

  if (body.newPassword) {
    if (body.newPassword.length < 6) {
      return NextResponse.json(
        { error: "Şifre en az 6 karakter olmalı." },
        { status: 400 }
      );
    }
    await updateUserPassword(id, body.newPassword);
  }

  if (body.status) {
    await updateUserStatus(id, body.status === "disabled" ? "disabled" : "active");
  }

  if (body.displayName) {
    await updateUserDisplayName(id, body.displayName);
  }

  const updated = await findUserById(id);
  if (!updated) {
    return NextResponse.json({ error: "Kullanıcı bulunamadı." }, { status: 404 });
  }
  const { password_hash, ...safeUser } = updated;
  return NextResponse.json({ user: safeUser });
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getSession();
  if (!session || session.role !== "admin") {
    return NextResponse.json({ error: "Yetkiniz yok." }, { status: 403 });
  }

  const { id } = await params;

  if (id === session.userId) {
    return NextResponse.json(
      { error: "Kendi hesabınızı silemezsiniz." },
      { status: 400 }
    );
  }

  const deleted = await deleteUser(id);
  if (!deleted) {
    return NextResponse.json({ error: "Kullanıcı bulunamadı." }, { status: 404 });
  }

  return NextResponse.json({ ok: true });
}

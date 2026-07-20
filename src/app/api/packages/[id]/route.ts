import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/session";
import { updatePackage, deletePackage } from "@/lib/packages";

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Giriş gerekli." }, { status: 401 });
  }

  const { id } = await params;
  const packageId = Number(id);
  if (!Number.isFinite(packageId)) {
    return NextResponse.json({ error: "Geçersiz paket ID." }, { status: 400 });
  }

  const body = await req.json().catch(() => null);
  if (!body) {
    return NextResponse.json({ error: "Geçersiz veri." }, { status: 400 });
  }

  const nights = Number(body.nights) || 1;
  const priceTry = Number(body.priceTry) || 0;
  const capacity = Number(body.capacity) || 0;
  if (
    !Number.isFinite(nights) || !Number.isInteger(nights) || nights < 1 ||
    !Number.isFinite(priceTry) || priceTry < 0 ||
    !Number.isFinite(capacity) || !Number.isInteger(capacity) || capacity < 0
  ) {
    return NextResponse.json(
      { error: "Gece sayısı en az 1 tam sayı olmalı, fiyat ve kontenjan negatif olmayan bir sayı olmalı." },
      { status: 400 }
    );
  }

  try {
    const updated = await updatePackage(
      packageId,
      session.userId,
      session.role === "admin",
      {
        title: body.title,
        destination: body.destination,
        nights,
        priceTry,
        capacity,
        description: body.description || "",
        status: body.status || "active",
        imageUrl: body.imageUrl,
        newPartnerId: body.newPartnerId,
        newPartnerName: body.newPartnerName,
      }
    );

    if (!updated) {
      return NextResponse.json(
        { error: "Paket bulunamadı veya yetkiniz yok." },
        { status: 404 }
      );
    }

    return NextResponse.json({ package: updated });
  } catch (err) {
    console.error("[packages PATCH]", err);
    return NextResponse.json({ error: "Paket güncellenirken bir hata oluştu." }, { status: 500 });
  }
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Giriş gerekli." }, { status: 401 });
  }

  const { id } = await params;
  const packageId = Number(id);
  if (!Number.isFinite(packageId)) {
    return NextResponse.json({ error: "Geçersiz paket ID." }, { status: 400 });
  }

  const result = await deletePackage(
    packageId,
    session.userId,
    session.role === "admin"
  );

  if (!result.ok) {
    if (result.reservationCount) {
      return NextResponse.json(
        {
          error: `Bu pakete ait ${result.reservationCount} rezervasyon kaydı var, bu yüzden silinemez. Önce paketi "pasif" yapabilir veya rezervasyonları başka bir pakete taşıyabilirsiniz.`,
        },
        { status: 409 }
      );
    }
    return NextResponse.json(
      { error: "Paket bulunamadı veya yetkiniz yok." },
      { status: 404 }
    );
  }

  return NextResponse.json({ ok: true });
}

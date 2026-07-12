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
  const body = await req.json().catch(() => null);
  if (!body) {
    return NextResponse.json({ error: "Geçersiz veri." }, { status: 400 });
  }

  const updated = await updatePackage(
    Number(id),
    session.userId,
    session.role === "admin",
    {
      title: body.title,
      destination: body.destination,
      nights: Number(body.nights) || 1,
      priceTry: Number(body.priceTry) || 0,
      capacity: Number(body.capacity) || 0,
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
  const result = await deletePackage(
    Number(id),
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

import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/session";
import { createReservation, listAllReservations, listReservationsByPartner } from "@/lib/reservations";
import { getPackageById } from "@/lib/packages";
import { getBundleById } from "@/lib/bundles";
import { rateLimit, getClientIp } from "@/lib/rateLimit";

// Basit ama sağlam bir e-posta format kontrolü (RFC'nin tamamını değil, yaygın hataları yakalar).
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Bundle rezervasyonları belirli bir acenteye değil, doğrudan VAM'a bağlıdır.
const VAM_DIRECT_PARTNER_ID = "vam-direct";
const VAM_DIRECT_PARTNER_NAME = "VAM Doğrudan";

export async function GET() {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Giriş gerekli." }, { status: 401 });
  }

  const reservations =
    session.role === "admin"
      ? await listAllReservations()
      : await listReservationsByPartner(session.userId);

  return NextResponse.json({ reservations });
}

// Müşteri rezervasyon oluşturuyor — giriş gerektirmez, herkes erişebilir.
export async function POST(req: NextRequest) {
  // --- Hız sınırlama: aynı IP'den kısa sürede aşırı istek gelmesini engeller ---
  const ip = getClientIp(req);
  const { allowed, remainingMs } = rateLimit(`reservation:${ip}`, 8, 10 * 60 * 1000); // 10 dakikada 8 deneme
  if (!allowed) {
    const minutes = Math.ceil(remainingMs / 60000);
    return NextResponse.json(
      { error: `Çok fazla rezervasyon denemesi yapıldı. Lütfen ${minutes} dakika sonra tekrar deneyin.` },
      { status: 429 }
    );
  }

  const body = await req.json().catch(() => null);

  const packageId = body?.packageId ? Number(body.packageId) : null;
  const bundleId = body?.bundleId ? Number(body.bundleId) : null;
  const customerName = body?.customerName?.trim();
  const customerEmail = body?.customerEmail?.trim();
  const customerPhone = body?.customerPhone?.trim() || "";
  const travelDate = body?.travelDate || null;
  const guestCount = Number(body?.guestCount) || 1;
  const notes = body?.notes?.trim() || "";

  if ((!packageId && !bundleId) || (packageId && bundleId)) {
    return NextResponse.json(
      { error: "Bir paket ya da bir rota (bundle) belirtilmeli, ikisi birden değil." },
      { status: 400 }
    );
  }

  if (!customerName || !customerEmail) {
    return NextResponse.json(
      { error: "Ad ve e-posta gerekli." },
      { status: 400 }
    );
  }

  // --- E-posta format doğrulaması ---
  if (!EMAIL_REGEX.test(customerEmail)) {
    return NextResponse.json(
      { error: "Geçerli bir e-posta adresi girin." },
      { status: 400 }
    );
  }

  if (guestCount < 1 || guestCount > 50) {
    return NextResponse.json(
      { error: "Kişi sayısı geçersiz." },
      { status: 400 }
    );
  }

  let reservation;

  if (packageId) {
    const pkg = await getPackageById(packageId);
    if (!pkg) {
      return NextResponse.json({ error: "Paket bulunamadı." }, { status: 404 });
    }
    if (pkg.status !== "active") {
      return NextResponse.json(
        { error: "Bu paket şu anda rezervasyona açık değil." },
        { status: 400 }
      );
    }

    const totalPrice = Number(pkg.price_try) * guestCount;

    reservation = await createReservation({
      packageId: pkg.id,
      bundleId: null,
      partnerId: pkg.partner_id,
      partnerName: pkg.partner_name,
      packageTitle: pkg.title,
      customerName,
      customerEmail,
      customerPhone,
      travelDate,
      guestCount,
      notes,
      totalPrice,
    });
  } else {
    const bundle = await getBundleById(bundleId as number);
    if (!bundle) {
      return NextResponse.json({ error: "Rota (bundle) bulunamadı." }, { status: 404 });
    }
    if (bundle.status !== "active") {
      return NextResponse.json(
        { error: "Bu rota şu anda rezervasyona açık değil." },
        { status: 400 }
      );
    }

    const totalPrice = Number(bundle.price) * guestCount;

    reservation = await createReservation({
      packageId: null,
      bundleId: bundle.id,
      partnerId: VAM_DIRECT_PARTNER_ID,
      partnerName: VAM_DIRECT_PARTNER_NAME,
      packageTitle: bundle.title,
      customerName,
      customerEmail,
      customerPhone,
      travelDate,
      guestCount,
      notes,
      totalPrice,
    });
  }

  // NOT: Ödeme entegrasyonu (iyzico) henüz bağlı değil.
  // Rezervasyon "payment_status: pending" olarak kaydediliyor.
  // İyzico entegre edildiğinde, burada ödeme başlatma adımı eklenecek.

  return NextResponse.json({ reservation }, { status: 201 });
}

import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/session";
import { createReservation, listAllReservations, listReservationsByPartner, getReservedGuestCountForPackage } from "@/lib/reservations";
import { getPackageById } from "@/lib/packages";
import { getBundleById } from "@/lib/bundles";
import { rateLimit, getClientIp } from "@/lib/rateLimit";
import { getLang } from "@/lib/i18n";
import { t } from "@/lib/dictionary";

// Basit ama sağlam bir e-posta format kontrolü (RFC'nin tamamını değil, yaygın hataları yakalar).
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// <input type="date"> her zaman YYYY-MM-DD formatında gönderir.
const DATE_REGEX = /^\d{4}-\d{2}-\d{2}$/;

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
// Bu formu her dilde (TR/DE/EN/KU/CKB) dolduran gerçek ziyaretçiler var —
// hata mesajları vam_lang çerezine göre yerelleştiriliyor (bkz. dictionary.ts
// "res_err_*" anahtarları). Aşağıdaki GET handler'ı ise sadece admin/acente
// panelinden çağrılıyor (o panel zaten tamamen Türkçe), o yüzden dokunulmadı.
export async function POST(req: NextRequest) {
  const lang = await getLang();

  // --- Hız sınırlama: aynı IP'den kısa sürede aşırı istek gelmesini engeller ---
  const ip = getClientIp(req);
  const { allowed, remainingMs } = await rateLimit(`reservation:${ip}`, 8, 10 * 60 * 1000); // 10 dakikada 8 deneme
  if (!allowed) {
    const minutes = Math.ceil(remainingMs / 60000);
    return NextResponse.json(
      { error: t("res_err_ratelimit", lang).replace("{minutes}", String(minutes)) },
      { status: 429 }
    );
  }

  const body = await req.json().catch(() => null);
  if (body === null) {
    return NextResponse.json({ error: t("res_err_invalid_body", lang) }, { status: 400 });
  }

  const packageId = body?.packageId ? Number(body.packageId) : null;
  const bundleId = body?.bundleId ? Number(body.bundleId) : null;
  const customerName = body?.customerName?.trim();
  const customerEmail = body?.customerEmail?.trim();
  const customerPhone = body?.customerPhone?.trim() || "";
  const travelDateRaw = body?.travelDate || null;
  const guestCount = Number(body?.guestCount) || 1;
  const notes = body?.notes?.trim() || "";

  if ((!packageId && !bundleId) || (packageId && bundleId)) {
    return NextResponse.json(
      { error: t("res_err_pkg_or_bundle", lang) },
      { status: 400 }
    );
  }

  if (!customerName || !customerEmail) {
    return NextResponse.json(
      { error: t("res_err_name_email_required", lang) },
      { status: 400 }
    );
  }

  // --- Uzunluk sınırları: bu endpoint girişsiz/herkese açık, sınır olmadan
  // çok büyük (MB boyutunda) değerler DB'yi şişirebilir. ---
  if (
    customerName.length > 200 ||
    customerEmail.length > 254 ||
    customerPhone.length > 40 ||
    notes.length > 2000
  ) {
    return NextResponse.json(
      { error: t("res_err_field_too_long", lang) },
      { status: 400 }
    );
  }

  // --- E-posta format doğrulaması ---
  if (!EMAIL_REGEX.test(customerEmail)) {
    return NextResponse.json(
      { error: t("res_err_invalid_email", lang) },
      { status: 400 }
    );
  }

  if (guestCount < 1 || guestCount > 50) {
    return NextResponse.json(
      { error: t("res_err_guest_count", lang) },
      { status: 400 }
    );
  }

  // --- Seyahat tarihi doğrulaması (opsiyonel alan, ama girildiyse geçerli olmalı) ---
  let travelDate: string | null = null;
  if (travelDateRaw) {
    if (
      typeof travelDateRaw !== "string" ||
      !DATE_REGEX.test(travelDateRaw) ||
      Number.isNaN(new Date(travelDateRaw).getTime())
    ) {
      return NextResponse.json({ error: t("res_err_invalid_date", lang) }, { status: 400 });
    }
    // ISO (YYYY-MM-DD) string karşılaştırması saat dilimi hesaplaması gerektirmez.
    const todayStr = new Date().toISOString().slice(0, 10);
    if (travelDateRaw < todayStr) {
      return NextResponse.json({ error: t("res_err_past_date", lang) }, { status: 400 });
    }
    travelDate = travelDateRaw;
  }

  let reservation;

  if (packageId) {
    const pkg = await getPackageById(packageId);
    if (!pkg) {
      return NextResponse.json({ error: t("res_err_package_not_found", lang) }, { status: 404 });
    }
    if (pkg.status !== "active") {
      return NextResponse.json(
        { error: t("res_err_package_inactive", lang) },
        { status: 400 }
      );
    }

    const alreadyReserved = await getReservedGuestCountForPackage(pkg.id);
    if (alreadyReserved + guestCount > pkg.capacity) {
      return NextResponse.json(
        { error: t("res_err_package_full", lang) },
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
      return NextResponse.json({ error: t("res_err_bundle_not_found", lang) }, { status: 404 });
    }
    if (bundle.status !== "active") {
      return NextResponse.json(
        { error: t("res_err_bundle_inactive", lang) },
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

"use client";

import { useState } from "react";
import Link from "next/link";
import type { Lang } from "@/lib/dictionary";
import { t } from "@/lib/dictionary";
import { formatPrice, type Currency } from "@/lib/currency";
import SmartImage from "@/app/components/SmartImage";

/** Normalized shape so the same form serves both packages and bundles. */
export type ReservationItem = {
  kind: "package" | "bundle";
  id: number;
  title: string;
  imageUrl: string | null;
  subtitle: string;
  unitPrice: number;
};

export default function ReservationForm({ item, lang, currency }: { item: ReservationItem; lang: Lang; currency: Currency }) {
  const [customerName, setCustomerName] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [travelDate, setTravelDate] = useState("");
  const [guestCount, setGuestCount] = useState(1);
  const [notes, setNotes] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const totalPrice = item.unitPrice * guestCount;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setError("");

    try {
      const res = await fetch("/api/reservations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          packageId: item.kind === "package" ? item.id : undefined,
          bundleId: item.kind === "bundle" ? item.id : undefined,
          customerName,
          customerEmail,
          customerPhone,
          travelDate: travelDate || null,
          guestCount,
          notes,
        }),
      });

      // Yanıt gövdesi geçerli JSON olmayabilir (örn. bir ağ geçidi/proxy
      // hata sayfası) — res.json() bu durumda fırlatır, .catch(() => null)
      // ile yakalayıp aşağıda hata dalına düşürüyoruz.
      const data = await res.json().catch(() => null);

      if (!res.ok || !data) {
        setError(data?.error || t("rez_error_generic", lang));
        return;
      }

      setSuccess(true);
    } catch {
      // fetch() ağ hatası (bağlantı koptu, zaman aşımı, vb.) fırlatır —
      // yakalanmazsa buton sonsuza kadar "Gönderiliyor…" durumunda kalırdı.
      setError(t("rez_error_generic", lang));
    } finally {
      setSubmitting(false);
    }
  }

  if (success) {
    return (
      <div style={pageStyle}>
        <div style={cardStyle}>
          <div style={{ textAlign: "center", padding: "20px 0" }}>
            <div style={{ fontSize: 48, marginBottom: 16 }}>✓</div>
            <div style={{ fontFamily: "Georgia, serif", fontSize: 22, fontWeight: 700, marginBottom: 12 }}>
              {t("rez_success_title", lang)}
            </div>
            <p style={{ fontSize: 14, color: "#6f6558", lineHeight: 1.7, marginBottom: 24 }}>
              <strong>{item.title}</strong> {t("rez_success_body_1", lang)}{" "}
              {t("rez_success_body_2", lang)}
            </p>
            <Link
              href="/"
              prefetch={false}
              style={{
                display: "inline-block",
                padding: "10px 24px",
                background: "#c4522a",
                color: "#fff",
                borderRadius: 4,
                fontSize: 13,
                fontWeight: 600,
                textDecoration: "none",
              }}
            >
              {t("rez_back_home", lang)}
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={pageStyle}>
      <div style={cardStyle}>
        {item.imageUrl && (
          <div
            style={{
              position: "relative",
              width: "100%",
              height: 200,
              background: "#f6f0e4",
              borderRadius: 8,
              marginBottom: 20,
              overflow: "hidden",
            }}
          >
            <SmartImage
              src={item.imageUrl}
              alt={item.title}
              fill
              sizes="(max-width: 480px) 100vw, 480px"
              style={{ objectFit: "contain" }}
            />
          </div>
        )}
        <div style={{ marginBottom: 20 }}>
          <div style={{ fontSize: 11, letterSpacing: "0.15em", color: "#c4522a", textTransform: "uppercase", marginBottom: 8 }}>
            {t("rez_eyebrow", lang)}
          </div>
          <div style={{ fontFamily: "Georgia, serif", fontSize: 24, fontWeight: 700, marginBottom: 6 }}>
            {item.title}
          </div>
          <div style={{ fontSize: 13, color: "#6f6558" }}>{item.subtitle}</div>
        </div>

        <form onSubmit={handleSubmit}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 12 }}>
            <label style={labelWrap}>
              <span style={labelText}>{t("rez_name", lang)}</span>
              <input
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                required
                autoComplete="name"
                style={inputStyle}
              />
            </label>
            <label style={labelWrap}>
              <span style={labelText}>{t("rez_email", lang)}</span>
              <input
                type="email"
                value={customerEmail}
                onChange={(e) => setCustomerEmail(e.target.value)}
                required
                autoComplete="email"
                style={inputStyle}
              />
            </label>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 12 }}>
            <label style={labelWrap}>
              <span style={labelText}>{t("rez_phone", lang)}</span>
              <input
                type="tel"
                value={customerPhone}
                onChange={(e) => setCustomerPhone(e.target.value)}
                autoComplete="tel"
                style={inputStyle}
              />
            </label>
            <label style={labelWrap}>
              <span style={labelText}>{t("rez_travel_date", lang)}</span>
              <input
                type="date"
                value={travelDate}
                onChange={(e) => setTravelDate(e.target.value)}
                style={inputStyle}
              />
            </label>
          </div>

          <label style={{ ...labelWrap, marginBottom: 12 }}>
            <span style={labelText}>{t("rez_guests", lang)}</span>
            <input
              type="number"
              min={1}
              value={guestCount}
              onChange={(e) => {
                // Alan boşaltıldığında veya geçici olarak geçersiz bir
                // sayı içerdiğinde Number(...) NaN dönebilir — bu da fiyat
                // özetinde "NaN ₺" gösterilmesine yol açardı. Her zaman
                // geçerli, en az 1 olan bir tam sayıya sabitliyoruz.
                const n = Math.floor(Number(e.target.value));
                setGuestCount(Number.isFinite(n) ? Math.max(1, n) : 1);
              }}
              style={inputStyle}
            />
          </label>

          <label style={{ ...labelWrap, marginBottom: 20 }}>
            <span style={labelText}>{t("rez_notes", lang)}</span>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={3}
              style={{ ...inputStyle, resize: "vertical" }}
            />
          </label>

          <div
            style={{
              background: "#f6f0e4",
              borderRadius: 6,
              padding: 16,
              marginBottom: 20,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <span style={{ fontSize: 13, color: "#6f6558" }}>{t("rez_total", lang)}</span>
            <span style={{ fontFamily: "Georgia, serif", fontSize: 20, fontWeight: 700, color: "#c4522a" }}>
              {formatPrice(totalPrice, currency)}
            </span>
          </div>

          <div style={{ fontSize: 11.5, color: "#a27450", marginBottom: 16, lineHeight: 1.6 }}>
            {t("rez_no_payment", lang)}
          </div>

          {error && (
            <div role="alert" aria-live="assertive" style={{ color: "#a64022", fontSize: 12.5, marginBottom: 16 }}>{error}</div>
          )}

          <button
            type="submit"
            disabled={submitting}
            style={{
              width: "100%",
              padding: "13px 0",
              background: "#c4522a",
              color: "#fff",
              border: "none",
              borderRadius: 4,
              fontSize: 14,
              fontWeight: 700,
              cursor: submitting ? "default" : "pointer",
            }}
          >
            {submitting ? t("rez_submitting", lang) : t("rez_submit", lang)}
          </button>
        </form>
      </div>
    </div>
  );
}

const pageStyle: React.CSSProperties = {
  minHeight: "100vh",
  background: "#f6f0e4",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "40px 20px",
};

const cardStyle: React.CSSProperties = {
  background: "#fff",
  borderRadius: 10,
  padding: 32,
  width: "100%",
  maxWidth: 480,
  boxShadow: "0 4px 16px rgba(28,20,16,0.08)",
};

const labelWrap: React.CSSProperties = { display: "block" };

const labelText: React.CSSProperties = {
  display: "block",
  fontSize: 11.5,
  color: "#6f6558",
  marginBottom: 5,
};

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "9px 12px",
  border: "1px solid #e5d6bc",
  borderRadius: 4,
  fontSize: 13.5,
  outline: "none",
  fontFamily: "inherit",
};

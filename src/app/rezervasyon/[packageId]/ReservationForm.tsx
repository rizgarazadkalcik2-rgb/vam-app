"use client";

import { useState } from "react";
import Link from "next/link";
import type { VamPackage } from "@/lib/packages";

export default function ReservationForm({ pkg }: { pkg: VamPackage }) {
  const [customerName, setCustomerName] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [travelDate, setTravelDate] = useState("");
  const [guestCount, setGuestCount] = useState(1);
  const [notes, setNotes] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const totalPrice = Number(pkg.price_try) * guestCount;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setError("");

    const res = await fetch("/api/reservations", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        packageId: pkg.id,
        customerName,
        customerEmail,
        customerPhone,
        travelDate: travelDate || null,
        guestCount,
        notes,
      }),
    });

    const data = await res.json();
    setSubmitting(false);

    if (!res.ok) {
      setError(data.error || "Bir hata oluştu.");
      return;
    }

    setSuccess(true);
  }

  if (success) {
    return (
      <div style={pageStyle}>
        <div style={cardStyle}>
          <div style={{ textAlign: "center", padding: "20px 0" }}>
            <div style={{ fontSize: 48, marginBottom: 16 }}>✓</div>
            <div style={{ fontFamily: "Georgia, serif", fontSize: 22, fontWeight: 700, marginBottom: 12 }}>
              Talebiniz alındı
            </div>
            <p style={{ fontSize: 14, color: "#6f6558", lineHeight: 1.7, marginBottom: 24 }}>
              <strong>{pkg.title}</strong> paketi için rezervasyon talebiniz kaydedildi.
              Ödeme adımı için ekibimiz sizinle e-posta üzerinden iletişime geçecek.
            </p>
            <Link
              href="/platform"
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
              Ana Sayfaya Dön
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={pageStyle}>
      <div style={cardStyle}>
        {pkg.image_url && (
          <img
            src={pkg.image_url}
            alt={pkg.title}
            style={{
              width: "100%",
              height: 160,
              objectFit: "cover",
              borderRadius: 8,
              marginBottom: 20,
              display: "block",
            }}
          />
        )}
        <div style={{ marginBottom: 20 }}>
          <div style={{ fontSize: 11, letterSpacing: "0.15em", color: "#c4522a", textTransform: "uppercase", marginBottom: 8 }}>
            Rezervasyon
          </div>
          <div style={{ fontFamily: "Georgia, serif", fontSize: 24, fontWeight: 700, marginBottom: 6 }}>
            {pkg.title}
          </div>
          <div style={{ fontSize: 13, color: "#6f6558" }}>
            {pkg.destination} · {pkg.nights} gece · {pkg.partner_name}
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 12 }}>
            <label style={labelWrap}>
              <span style={labelText}>Ad Soyad</span>
              <input
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                required
                style={inputStyle}
              />
            </label>
            <label style={labelWrap}>
              <span style={labelText}>E-posta</span>
              <input
                type="email"
                value={customerEmail}
                onChange={(e) => setCustomerEmail(e.target.value)}
                required
                style={inputStyle}
              />
            </label>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 12 }}>
            <label style={labelWrap}>
              <span style={labelText}>Telefon</span>
              <input
                type="tel"
                value={customerPhone}
                onChange={(e) => setCustomerPhone(e.target.value)}
                style={inputStyle}
              />
            </label>
            <label style={labelWrap}>
              <span style={labelText}>Seyahat Tarihi</span>
              <input
                type="date"
                value={travelDate}
                onChange={(e) => setTravelDate(e.target.value)}
                style={inputStyle}
              />
            </label>
          </div>

          <label style={{ ...labelWrap, marginBottom: 12 }}>
            <span style={labelText}>Kişi Sayısı</span>
            <input
              type="number"
              min={1}
              value={guestCount}
              onChange={(e) => setGuestCount(Math.max(1, Number(e.target.value)))}
              style={inputStyle}
            />
          </label>

          <label style={{ ...labelWrap, marginBottom: 20 }}>
            <span style={labelText}>Notunuz (opsiyonel)</span>
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
            <span style={{ fontSize: 13, color: "#6f6558" }}>Toplam Tutar</span>
            <span style={{ fontFamily: "Georgia, serif", fontSize: 20, fontWeight: 700, color: "#c4522a" }}>
              ₺{totalPrice.toLocaleString("tr-TR")}
            </span>
          </div>

          <div style={{ fontSize: 11.5, color: "#a27450", marginBottom: 16, lineHeight: 1.6 }}>
            Bu adımda ödeme alınmamaktadır. Talebiniz kaydedildikten sonra ödeme bağlantısı
            e-posta adresinize gönderilecektir.
          </div>

          {error && (
            <div style={{ color: "#a64022", fontSize: 12.5, marginBottom: 16 }}>{error}</div>
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
            {submitting ? "Gönderiliyor..." : "Rezervasyon Talebi Gönder"}
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

"use client";

import { useState } from "react";
import type { VamPackage } from "@/lib/packages";
import type { VamReservation } from "@/lib/reservations";
import type { SessionPayload } from "@/lib/session";
import AdminShell from "@/app/admin/AdminShell";
import type { MatchEvent } from "@/lib/matchEvents";

const emptyForm = {
  title: "",
  destination: "",
  nights: 1,
  priceTry: 0,
  capacity: 0,
  description: "",
  imageUrl: "",
};

const TEAM_NAMES: Record<string, string> = {
  amedspor: "Amedspor",
  vanspor: "Vanspor FK",
  batman: "Batman Petrol Spor",
  mardin1969: "Mardin 1969 Spor",
  igdir: "Iğdır FK",
};

export default function PartnerPanel({
  session,
  initialPackages,
  initialReservations,
  upcomingMatches = [],
}: {
  session: SessionPayload;
  initialPackages: VamPackage[];
  initialReservations: VamReservation[];
  upcomingMatches?: MatchEvent[];
}) {
  const [packages, setPackages] = useState(initialPackages);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [uploading, setUploading] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [passwordSuccess, setPasswordSuccess] = useState(false);
  const [passwordSubmitting, setPasswordSubmitting] = useState(false);

  async function handleChangePassword(e: React.FormEvent) {
    e.preventDefault();
    setPasswordError("");
    setPasswordSuccess(false);
    setPasswordSubmitting(true);

    const res = await fetch("/api/auth/change-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ currentPassword, newPassword }),
    });
    const data = await res.json();
    setPasswordSubmitting(false);

    if (!res.ok) {
      setPasswordError(data.error || "Bir hata oluştu.");
      return;
    }

    setPasswordSuccess(true);
    setCurrentPassword("");
    setNewPassword("");
  }

  async function refresh() {
    const res = await fetch("/api/packages");
    const data = await res.json();
    if (res.ok) setPackages(data.packages);
  }


  async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setError("");

    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });
    const data = await res.json();
    setUploading(false);

    if (!res.ok) {
      setError(data.error || "Görsel yüklenirken bir hata oluştu.");
      return;
    }

    setForm((f) => ({ ...f, imageUrl: data.url }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setError("");

    const url = editingId ? `/api/packages/${editingId}` : "/api/packages";
    const method = editingId ? "PATCH" : "POST";

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, status: "active" }),
    });

    if (!res.ok) {
      const data = await res.json();
      setError(data.error || "Bir hata oluştu.");
      setSubmitting(false);
      return;
    }

    setForm(emptyForm);
    setEditingId(null);
    setSubmitting(false);
    await refresh();
  }

  function startEdit(pkg: VamPackage) {
    setEditingId(pkg.id);
    setForm({
      title: pkg.title,
      destination: pkg.destination,
      nights: pkg.nights,
      priceTry: Number(pkg.price_try),
      capacity: pkg.capacity,
      description: pkg.description || "",
      imageUrl: pkg.image_url || "",
    });
  }

  function cancelEdit() {
    setEditingId(null);
    setForm(emptyForm);
  }

  async function handleDelete(id: number) {
    if (!confirm("Bu paketi silmek istediğinize emin misiniz?")) return;
    const res = await fetch(`/api/packages/${id}`, { method: "DELETE" });
    if (res.ok) {
      await refresh();
    } else {
      const data = await res.json().catch(() => null);
      alert(data?.error || "Bir hata oluştu.");
    }
  }

  return (
    <AdminShell
      title="Acente Paneli"
      subtitle="Paketleriniz ve gelen rezervasyonlarınız"
      displayName={session.displayName}
      role="partner"
      actions={
        <button className="adm-btn adm-btn-ghost" onClick={() => setShowPasswordModal(true)}>
          Şifremi Değiştir
        </button>
      }
    >
      {upcomingMatches.length > 0 && (
        <div
          style={{
            background: "linear-gradient(135deg, #1b1712, #241c13)",
            color: "#efe8da",
            borderRadius: 10,
            padding: "18px 22px",
            marginBottom: 24,
          }}
        >
          <div style={{ fontSize: 11, letterSpacing: "0.14em", textTransform: "uppercase", color: "#e8bc44", marginBottom: 8 }}>
            Yaklaşan Maç Haftaları
          </div>
          <div style={{ fontSize: 12.5, color: "rgba(239,232,218,0.7)", marginBottom: 12 }}>
            Bu tarihlere özel tur veya paket oluşturabilirsiniz — Match Weekends sayfasında fikstür yayında.
          </div>
          <div style={{ display: "grid", gap: 6 }}>
            {upcomingMatches.slice(0, 6).map((m) => (
              <div key={m.id} style={{ fontSize: 13, display: "flex", gap: 10, flexWrap: "wrap" }}>
                <span style={{ color: "#e8bc44", fontWeight: 700, minWidth: 92 }}>
                  {new Date(m.event_date as string).toLocaleDateString("tr-TR", { day: "numeric", month: "short", year: "numeric" })}
                </span>
                <span style={{ fontWeight: 600 }}>{TEAM_NAMES[m.team] || m.team} — {m.title}</span>
                {m.competition && <span style={{ color: "rgba(239,232,218,0.55)" }}>{m.competition}</span>}
              </div>
            ))}
          </div>
        </div>
      )}


        <form
          onSubmit={handleSubmit}
          style={{
            background: "#fff",
            borderRadius: 8,
            padding: 24,
            marginBottom: 28,
            boxShadow: "0 1px 3px rgba(28,20,16,0.08)",
          }}
        >
          <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 16 }}>
            {editingId ? "Paketi Düzenle" : "Yeni Paket Ekle"}
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 12 }}>
            <input
              placeholder="Paket başlığı"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              required
              style={inputStyle}
            />
            <input
              placeholder="Destinasyon"
              value={form.destination}
              onChange={(e) => setForm({ ...form, destination: e.target.value })}
              required
              style={inputStyle}
            />
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12, marginBottom: 12 }}>
            <input
              type="number"
              placeholder="Gece sayısı"
              value={form.nights}
              onChange={(e) => setForm({ ...form, nights: Number(e.target.value) })}
              style={inputStyle}
            />
            <input
              type="number"
              placeholder="Fiyat (TRY)"
              value={form.priceTry}
              onChange={(e) => setForm({ ...form, priceTry: Number(e.target.value) })}
              style={inputStyle}
            />
            <input
              type="number"
              placeholder="Kontenjan"
              value={form.capacity}
              onChange={(e) => setForm({ ...form, capacity: Number(e.target.value) })}
              style={inputStyle}
            />
          </div>

          <textarea
            placeholder="Açıklama"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            rows={3}
            style={{ ...inputStyle, width: "100%", marginBottom: 12, resize: "vertical" }}
          />

          <div style={{ marginBottom: 12 }}>
            <label
              style={{
                display: "block",
                fontSize: 11.5,
                color: "#6f6558",
                marginBottom: 6,
              }}
            >
              Paket Görseli
            </label>
            <input
              value={form.imageUrl}
              onChange={(e) => setForm({ ...form, imageUrl: e.target.value })}
              placeholder="https://... (URL yapıştır ya da aşağıdan yükle)"
              style={{ ...inputStyle, width: "100%", marginBottom: 8 }}
            />
            {form.imageUrl && (
              <img
                src={form.imageUrl}
                alt="Önizleme"
                style={{
                  width: "100%",
                  maxHeight: 160,
                  objectFit: "cover",
                  borderRadius: 4,
                  marginBottom: 8,
                  display: "block",
                }}
              />
            )}
            <input
              type="file"
              accept="image/jpeg,image/png,image/webp"
              onChange={handleImageUpload}
              disabled={uploading}
              style={{ fontSize: 12.5 }}
            />
            {uploading && (
              <div style={{ fontSize: 12, color: "#835d3e", marginTop: 4 }}>
                Yükleniyor...
              </div>
            )}
          </div>

          {error && (
            <div style={{ color: "#a64022", fontSize: 12.5, marginBottom: 12 }}>{error}</div>
          )}

          <div style={{ display: "flex", gap: 10 }}>
            <button
              type="submit"
              disabled={submitting}
              style={{
                padding: "9px 20px",
                background: "#c4522a",
                color: "#fff",
                border: "none",
                borderRadius: 4,
                fontSize: 13,
                fontWeight: 600,
                cursor: "pointer",
              }}
            >
              {submitting ? "Kaydediliyor..." : editingId ? "Güncelle" : "Ekle"}
            </button>
            {editingId && (
              <button
                type="button"
                onClick={cancelEdit}
                style={{
                  padding: "9px 20px",
                  background: "transparent",
                  border: "1px solid #ccc",
                  borderRadius: 4,
                  fontSize: 13,
                  cursor: "pointer",
                }}
              >
                Vazgeç
              </button>
            )}
          </div>
        </form>

        <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 12 }}>
          Paketlerim ({packages.length})
        </div>

        <div style={{ display: "grid", gap: 10 }}>
          {packages.length === 0 && (
            <div style={{ color: "#8c8275", fontSize: 13 }}>Henüz paket eklenmedi.</div>
          )}
          {packages.map((pkg) => (
            <div
              key={pkg.id}
              style={{
                background: "#fff",
                borderRadius: 6,
                padding: 16,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                gap: 12,
                boxShadow: "0 1px 3px rgba(28,20,16,0.06)",
              }}
            >
              {pkg.image_url && (
                <img
                  src={pkg.image_url}
                  alt={pkg.title}
                  style={{
                    width: 64,
                    height: 64,
                    objectFit: "cover",
                    borderRadius: 4,
                    flexShrink: 0,
                  }}
                />
              )}
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 600, fontSize: 14 }}>
                  <span style={{ color: "#a27450", fontWeight: 400, fontSize: 12 }}>#{pkg.id}</span> {pkg.title}
                </div>
                <div style={{ fontSize: 12.5, color: "#6f6558", marginTop: 2 }}>
                  {pkg.destination} · {pkg.nights} gece · ₺{Number(pkg.price_try).toLocaleString("tr-TR")} ·{" "}
                  Kontenjan: {pkg.capacity}
                </div>
                <div style={{ fontSize: 11, color: "#2f5fa0", marginTop: 4 }}>
                  Rezervasyon linki: /rezervasyon/{pkg.id}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <button
                  onClick={() => startEdit(pkg)}
                  style={{
                    padding: "6px 14px",
                    background: "transparent",
                    border: "1px solid #2f5fa0",
                    color: "#2f5fa0",
                    borderRadius: 4,
                    fontSize: 12,
                    cursor: "pointer",
                  }}
                >
                  Düzenle
                </button>
                <button
                  onClick={() => handleDelete(pkg.id)}
                  style={{
                    padding: "6px 14px",
                    background: "transparent",
                    border: "1px solid #a64022",
                    color: "#a64022",
                    borderRadius: 4,
                    fontSize: 12,
                    cursor: "pointer",
                  }}
                >
                  Sil
                </button>
              </div>
            </div>
          ))}
        </div>

        <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 12, marginTop: 32 }}>
          Gelen Rezervasyonlar ({initialReservations.length})
        </div>

        <div style={{ display: "grid", gap: 10 }}>
          {initialReservations.length === 0 && (
            <div style={{ color: "#8c8275", fontSize: 13 }}>Henüz rezervasyon yok.</div>
          )}
          {initialReservations.map((r) => (
            <div
              key={r.id}
              style={{
                background: "#fff",
                borderRadius: 6,
                padding: 16,
                boxShadow: "0 1px 3px rgba(28,20,16,0.06)",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 8, marginBottom: 8 }}>
                <div style={{ fontWeight: 600, fontSize: 13.5 }}>{r.package_title}</div>
                <div style={{ display: "flex", gap: 6 }}>
                  <span
                    style={{
                      fontSize: 10.5,
                      fontWeight: 700,
                      padding: "3px 8px",
                      borderRadius: 4,
                      border:
                        r.reservation_status === "confirmed"
                          ? "1px solid #2a7a50"
                          : r.reservation_status === "cancelled"
                          ? "1px solid #a64022"
                          : "1px solid #2f5fa0",
                      color:
                        r.reservation_status === "confirmed"
                          ? "#2a7a50"
                          : r.reservation_status === "cancelled"
                          ? "#a64022"
                          : "#2f5fa0",
                    }}
                  >
                    {r.reservation_status === "confirmed"
                      ? "Onaylandı"
                      : r.reservation_status === "cancelled"
                      ? "İptal Edildi"
                      : "Yeni"}
                  </span>
                  <span
                    style={{
                      fontSize: 10.5,
                      fontWeight: 700,
                      padding: "3px 8px",
                      borderRadius: 4,
                      border: r.payment_status === "paid" ? "1px solid #2a7a50" : "1px solid #835d3e",
                      color: r.payment_status === "paid" ? "#2a7a50" : "#835d3e",
                    }}
                  >
                    {r.payment_status === "paid" ? "Ödendi" : "Ödeme Bekliyor"}
                  </span>
                </div>
              </div>
              <div style={{ fontSize: 12.5, color: "#6f6558", lineHeight: 1.7 }}>
                {r.customer_name} · {r.customer_email}
                {r.customer_phone ? ` · ${r.customer_phone}` : ""}
                <br />
                {r.travel_date ? new Date(r.travel_date).toLocaleDateString("tr-TR") : "Tarih belirtilmedi"} ·{" "}
                {r.guest_count} kişi · ₺{Number(r.total_price).toLocaleString("tr-TR")}
              </div>
            </div>
          ))}
        </div>

        {showPasswordModal && (
          <div
            style={{
              position: "fixed",
              inset: 0,
              background: "rgba(13,9,6,0.55)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: 20,
              zIndex: 100,
            }}
            onClick={() => {
              setShowPasswordModal(false);
              setPasswordError("");
              setPasswordSuccess(false);
              setCurrentPassword("");
              setNewPassword("");
            }}
          >
            <form
              onClick={(e) => e.stopPropagation()}
              onSubmit={handleChangePassword}
              style={{
                background: "#fff",
                borderRadius: 8,
                padding: 24,
                width: "100%",
                maxWidth: 360,
              }}
            >
              <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 16 }}>
                Şifremi Değiştir
              </div>

              <label style={{ display: "block", marginBottom: 12 }}>
                <span style={{ display: "block", fontSize: 11.5, color: "#6f6558", marginBottom: 5 }}>
                  Mevcut Şifre
                </span>
                <input
                  type="password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  required
                  autoFocus
                  style={{ ...inputStyle, width: "100%" }}
                />
              </label>

              <label style={{ display: "block", marginBottom: 12 }}>
                <span style={{ display: "block", fontSize: 11.5, color: "#6f6558", marginBottom: 5 }}>
                  Yeni Şifre (en az 12 karakter)
                </span>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                  minLength={12}
                  style={{ ...inputStyle, width: "100%" }}
                />
              </label>

              {passwordError && (
                <div style={{ color: "#a64022", fontSize: 12.5, marginBottom: 12 }}>
                  {passwordError}
                </div>
              )}
              {passwordSuccess && (
                <div style={{ color: "#2a7a50", fontSize: 12.5, marginBottom: 12 }}>
                  Şifreniz başarıyla değiştirildi.
                </div>
              )}

              <div style={{ display: "flex", gap: 10 }}>
                <button
                  type="submit"
                  disabled={passwordSubmitting}
                  style={{
                    padding: "9px 20px",
                    background: "#c4522a",
                    color: "#fff",
                    border: "none",
                    borderRadius: 4,
                    fontSize: 13,
                    fontWeight: 600,
                    cursor: "pointer",
                  }}
                >
                  {passwordSubmitting ? "Değiştiriliyor..." : "Şifreyi Değiştir"}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowPasswordModal(false);
                    setPasswordError("");
                    setPasswordSuccess(false);
                    setCurrentPassword("");
                    setNewPassword("");
                  }}
                  style={{
                    padding: "9px 20px",
                    background: "transparent",
                    border: "1px solid #ccc",
                    borderRadius: 4,
                    fontSize: 13,
                    cursor: "pointer",
                  }}
                >
                  Kapat
                </button>
              </div>
            </form>
          </div>
        )}
    </AdminShell>
  );
}

const inputStyle: React.CSSProperties = {
  padding: "9px 12px",
  border: "1px solid #e5d6bc",
  borderRadius: 4,
  fontSize: 13.5,
  outline: "none",
};

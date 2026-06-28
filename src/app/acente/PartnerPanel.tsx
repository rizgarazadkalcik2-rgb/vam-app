"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { VamPackage } from "@/lib/packages";
import type { SessionPayload } from "@/lib/session";

const emptyForm = {
  title: "",
  destination: "",
  nights: 1,
  priceTry: 0,
  capacity: 0,
  description: "",
};

export default function PartnerPanel({
  session,
  initialPackages,
}: {
  session: SessionPayload;
  initialPackages: VamPackage[];
}) {
  const router = useRouter();
  const [packages, setPackages] = useState(initialPackages);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
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

  async function handleLogout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/giris");
    router.refresh();
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
    });
  }

  function cancelEdit() {
    setEditingId(null);
    setForm(emptyForm);
  }

  async function handleDelete(id: number) {
    if (!confirm("Bu paketi silmek istediğinize emin misiniz?")) return;
    const res = await fetch(`/api/packages/${id}`, { method: "DELETE" });
    if (res.ok) await refresh();
  }

  return (
    <div style={{ minHeight: "100vh", background: "#f6f0e4", padding: "32px 20px" }}>
      <div style={{ maxWidth: 880, margin: "0 auto" }}>
        <header
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 28,
          }}
        >
          <div>
            <div style={{ fontFamily: "Georgia, serif", fontSize: 22, fontWeight: 700 }}>
              Acente Paneli
            </div>
            <div style={{ fontSize: 13, color: "#6f6558" }}>{session.displayName}</div>
          </div>
          <div style={{ display: "flex", gap: 10 }}>
            <button
              onClick={() => setShowPasswordModal(true)}
              style={{
                padding: "8px 16px",
                background: "transparent",
                border: "1px solid #835d3e",
                color: "#835d3e",
                borderRadius: 4,
                fontSize: 12.5,
                cursor: "pointer",
              }}
            >
              Şifremi Değiştir
            </button>
            <button
              onClick={handleLogout}
              style={{
                padding: "8px 16px",
                background: "transparent",
                border: "1px solid #c4522a",
                color: "#c4522a",
                borderRadius: 4,
                fontSize: 12.5,
                cursor: "pointer",
              }}
            >
              Çıkış Yap
            </button>
          </div>
        </header>

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
                boxShadow: "0 1px 3px rgba(28,20,16,0.06)",
              }}
            >
              <div>
                <div style={{ fontWeight: 600, fontSize: 14 }}>{pkg.title}</div>
                <div style={{ fontSize: 12.5, color: "#6f6558", marginTop: 2 }}>
                  {pkg.destination} · {pkg.nights} gece · ₺{Number(pkg.price_try).toLocaleString("tr-TR")} ·{" "}
                  Kontenjan: {pkg.capacity}
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
                  Yeni Şifre (en az 6 karakter)
                </span>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                  minLength={6}
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
      </div>
    </div>
  );
}

const inputStyle: React.CSSProperties = {
  padding: "9px 12px",
  border: "1px solid #e5d6bc",
  borderRadius: 4,
  fontSize: 13.5,
  outline: "none",
};

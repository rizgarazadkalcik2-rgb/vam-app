"use client";

import { useState } from "react";
import type { SafeUser } from "@/lib/users";
import type { SessionPayload } from "@/lib/session";
import AdminShell from "../AdminShell";

const emptyForm = { username: "", password: "", displayName: "", role: "partner" as "partner" | "admin" };

export default function AcentelerPanel({
  session,
  initialUsers,
}: {
  session: SessionPayload;
  initialUsers: SafeUser[];
}) {
  const [users, setUsers] = useState(initialUsers);
  const [form, setForm] = useState(emptyForm);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [resetTarget, setResetTarget] = useState<SafeUser | null>(null);
  const [resetPassword, setResetPassword] = useState("");
  const [resetError, setResetError] = useState("");

  async function refresh() {
    const res = await fetch("/api/users");
    const data = await res.json();
    if (res.ok) setUsers(data.users);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setError("");

    const res = await fetch("/api/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    if (!res.ok) {
      const data = await res.json();
      setError(data.error || "Bir hata oluştu.");
      setSubmitting(false);
      return;
    }

    setForm(emptyForm);
    setSubmitting(false);
    await refresh();
  }

  async function toggleStatus(user: SafeUser) {
    const newStatus = user.status === "active" ? "disabled" : "active";
    const res = await fetch(`/api/users/${user.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: newStatus }),
    });
    const data = await res.json();
    if (res.ok) {
      await refresh();
    } else {
      alert(data.error || "Bir hata oluştu.");
    }
  }

  async function handleDelete(user: SafeUser) {
    if (!confirm(`${user.display_name} kullanıcısını silmek istediğinize emin misiniz?`)) return;
    const res = await fetch(`/api/users/${user.id}`, { method: "DELETE" });
    const data = await res.json();
    if (res.ok) {
      await refresh();
    } else {
      alert(data.error || "Bir hata oluştu.");
    }
  }

  async function handleResetPassword(e: React.FormEvent) {
    e.preventDefault();
    if (!resetTarget) return;
    setResetError("");

    if (resetPassword.length < 6) {
      setResetError("Şifre en az 6 karakter olmalı.");
      return;
    }

    const res = await fetch(`/api/users/${resetTarget.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ newPassword: resetPassword }),
    });
    const data = await res.json();
    if (res.ok) {
      setResetTarget(null);
      setResetPassword("");
    } else {
      setResetError(data.error || "Bir hata oluştu.");
    }
  }

  return (
    <AdminShell
      title="Acenteler"
      subtitle="Partner acente hesaplarını yönetin"
      displayName={session.displayName}
      role="admin"
    >

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
            Yeni Kullanıcı Ekle
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 12 }}>
            <input
              placeholder="Kullanıcı adı"
              value={form.username}
              onChange={(e) => setForm({ ...form, username: e.target.value })}
              required
              style={inputStyle}
            />
            <input
              placeholder="Görünen ad (örn. Mardin Tur A.Ş.)"
              value={form.displayName}
              onChange={(e) => setForm({ ...form, displayName: e.target.value })}
              required
              style={inputStyle}
            />
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 12 }}>
            <input
              type="password"
              placeholder="Şifre (en az 6 karakter)"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              required
              minLength={6}
              style={inputStyle}
            />
            <select
              value={form.role}
              onChange={(e) => setForm({ ...form, role: e.target.value as "partner" | "admin" })}
              style={inputStyle}
            >
              <option value="partner">Acente</option>
              <option value="admin">Yönetici</option>
            </select>
          </div>

          {error && (
            <div style={{ color: "#a64022", fontSize: 12.5, marginBottom: 12 }}>{error}</div>
          )}

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
            {submitting ? "Ekleniyor..." : "Kullanıcı Ekle"}
          </button>
        </form>

        <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 12 }}>
          Tüm Kullanıcılar ({users.length})
        </div>

        <div style={{ display: "grid", gap: 10 }}>
          {users.map((user) => (
            <div
              key={user.id}
              style={{
                background: "#fff",
                borderRadius: 6,
                padding: 14,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                flexWrap: "wrap",
                gap: 10,
                boxShadow: "0 1px 3px rgba(28,20,16,0.06)",
                opacity: user.status === "active" ? 1 : 0.55,
              }}
            >
              <div>
                <div style={{ fontWeight: 600, fontSize: 13.5 }}>
                  {user.display_name}{" "}
                  <span
                    style={{
                      fontSize: 10.5,
                      fontWeight: 700,
                      color: user.role === "admin" ? "#2f5fa0" : "#835d3e",
                      marginLeft: 6,
                    }}
                  >
                    {user.role === "admin" ? "YÖNETİCİ" : "ACENTE"}
                  </span>
                  {user.status !== "active" && (
                    <span style={{ fontSize: 10.5, fontWeight: 700, color: "#a64022", marginLeft: 6 }}>
                      DEVRE DIŞI
                    </span>
                  )}
                  {user.id === session.userId && (
                    <span style={{ fontSize: 10.5, color: "#8c8275", marginLeft: 6 }}>(siz)</span>
                  )}
                </div>
                <div style={{ fontSize: 12, color: "#6f6558", marginTop: 2 }}>
                  Kullanıcı adı: {user.username}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                <button
                  onClick={() => setResetTarget(user)}
                  style={{
                    padding: "6px 14px",
                    background: "transparent",
                    border: "1px solid #835d3e",
                    color: "#835d3e",
                    borderRadius: 4,
                    fontSize: 12,
                    cursor: "pointer",
                  }}
                >
                  Şifre Sıfırla
                </button>
                {user.id !== session.userId && (
                  <>
                    <button
                      onClick={() => toggleStatus(user)}
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
                      {user.status === "active" ? "Devre Dışı Bırak" : "Aktifleştir"}
                    </button>
                    <button
                      onClick={() => handleDelete(user)}
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
                  </>
                )}
              </div>
            </div>
          ))}
        </div>

        {resetTarget && (
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
            onClick={() => setResetTarget(null)}
          >
            <form
              onClick={(e) => e.stopPropagation()}
              onSubmit={handleResetPassword}
              style={{
                background: "#fff",
                borderRadius: 8,
                padding: 24,
                width: "100%",
                maxWidth: 360,
              }}
            >
              <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 6 }}>
                Şifre Sıfırla
              </div>
              <div style={{ fontSize: 12.5, color: "#6f6558", marginBottom: 16 }}>
                {resetTarget.display_name} ({resetTarget.username})
              </div>
              <input
                type="password"
                placeholder="Yeni şifre (en az 6 karakter)"
                value={resetPassword}
                onChange={(e) => setResetPassword(e.target.value)}
                autoFocus
                style={{ ...inputStyle, width: "100%", marginBottom: 12 }}
              />
              {resetError && (
                <div style={{ color: "#a64022", fontSize: 12.5, marginBottom: 12 }}>
                  {resetError}
                </div>
              )}
              <div style={{ display: "flex", gap: 10 }}>
                <button
                  type="submit"
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
                  Şifreyi Değiştir
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setResetTarget(null);
                    setResetPassword("");
                    setResetError("");
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
                  Vazgeç
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

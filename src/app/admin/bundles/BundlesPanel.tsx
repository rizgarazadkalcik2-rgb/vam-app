"use client";

import { useState } from "react";
import type { VamBundle } from "@/lib/bundles";
import type { SessionPayload } from "@/lib/session";
import AdminNav from "../AdminNav";

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "8px 10px",
  border: "1px solid #e5d6bc",
  borderRadius: 4,
  fontSize: 13,
  fontFamily: "inherit",
  background: "#fff",
};

const labelStyle: React.CSSProperties = {
  fontSize: 11.5,
  fontWeight: 600,
  color: "#6f6558",
  marginBottom: 4,
  display: "block",
};

function emptyForm() {
  return {
    slug: "",
    title: "",
    imageUrl: "",
    description: "",
    nights: "",
    destinationsCsv: "",
    price: "",
    originalPrice: "",
    includesCsv: "",
    badge: "",
    status: "active" as "active" | "inactive",
  };
}

type FormState = ReturnType<typeof emptyForm>;

function bundleToForm(b: VamBundle): FormState {
  return {
    slug: b.slug,
    title: b.title,
    imageUrl: b.image_url || "",
    description: b.description,
    nights: String(b.nights),
    destinationsCsv: (b.destinations || []).join(", "),
    price: String(b.price),
    originalPrice: b.original_price != null ? String(b.original_price) : "",
    includesCsv: (b.includes || []).join(", "),
    badge: b.badge || "",
    status: b.status === "active" ? "active" : "inactive",
  };
}

function formToPayload(f: FormState) {
  return {
    slug: f.slug.trim(),
    title: f.title.trim(),
    imageUrl: f.imageUrl.trim() || null,
    description: f.description.trim(),
    nights: Number(f.nights),
    destinations: f.destinationsCsv.split(",").map((s) => s.trim()).filter(Boolean),
    price: Number(f.price),
    originalPrice: f.originalPrice ? Number(f.originalPrice) : null,
    includes: f.includesCsv.split(",").map((s) => s.trim()).filter(Boolean),
    badge: f.badge.trim() || null,
    status: f.status,
  };
}

export default function BundlesPanel({
  session,
  initialBundles,
}: {
  session: SessionPayload;
  initialBundles: VamBundle[];
}) {
  const [bundles, setBundles] = useState(initialBundles);
  const [form, setForm] = useState<FormState>(emptyForm());
  const [editingId, setEditingId] = useState<number | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [showForm, setShowForm] = useState(false);

  async function refresh() {
    const res = await fetch("/api/bundles");
    const data = await res.json();
    if (res.ok) setBundles(data.bundles);
  }

  function startCreate() {
    setForm(emptyForm());
    setEditingId(null);
    setShowForm(true);
    setError("");
  }

  function startEdit(b: VamBundle) {
    setForm(bundleToForm(b));
    setEditingId(b.id);
    setShowForm(true);
    setError("");
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setError("");

    const payload = formToPayload(form);
    const url = editingId ? `/api/bundles/${editingId}` : "/api/bundles";
    const method = editingId ? "PATCH" : "POST";

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const data = await res.json();
      setError(data.error || "Bir hata oluştu.");
      setSubmitting(false);
      return;
    }

    setSubmitting(false);
    setShowForm(false);
    await refresh();
  }

  async function handleDelete(b: VamBundle) {
    if (!confirm(`"${b.title}" paketini silmek istediğinize emin misiniz?`)) return;
    const res = await fetch(`/api/bundles/${b.id}`, { method: "DELETE" });
    const data = await res.json();
    if (res.ok) {
      await refresh();
    } else {
      alert(data.error || "Bir hata oluştu.");
    }
  }

  async function toggleStatus(b: VamBundle) {
    const newStatus: "active" | "inactive" = b.status === "active" ? "inactive" : "active";
    const payload = { ...bundleToForm(b), status: newStatus };
    const res = await fetch(`/api/bundles/${b.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formToPayload(payload)),
    });
    if (res.ok) {
      await refresh();
    } else {
      const data = await res.json();
      alert(data.error || "Bir hata oluştu.");
    }
  }

  return (
    <div style={{ minHeight: "100vh", background: "#f6f0e4", padding: "32px 20px" }}>
      <div style={{ maxWidth: 980, margin: "0 auto" }}>
        <AdminNav displayName={session.displayName} />

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 18,
          }}
        >
          <div style={{ fontSize: 14, fontWeight: 700 }}>Bundle Paketleri ({bundles.length})</div>
          {!showForm && (
            <button
              onClick={startCreate}
              style={{
                padding: "9px 18px",
                background: "#c4522a",
                color: "#fff",
                border: "none",
                borderRadius: 4,
                fontSize: 13,
                fontWeight: 600,
                cursor: "pointer",
              }}
            >
              + Yeni Bundle
            </button>
          )}
        </div>

        {showForm && (
          <form
            onSubmit={handleSubmit}
            style={{
              background: "#fff",
              borderRadius: 8,
              padding: 20,
              marginBottom: 24,
              boxShadow: "0 1px 3px rgba(28,20,16,0.06)",
            }}
          >
            <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 14 }}>
              {editingId ? "Bundle'ı Düzenle" : "Yeni Bundle Ekle"}
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 12 }}>
              <div>
                <label style={labelStyle}>Slug (URL — küçük harf, tire ile)</label>
                <input
                  required
                  value={form.slug}
                  onChange={(e) => setForm({ ...form, slug: e.target.value })}
                  placeholder="orn-kapadokya-turu"
                  style={inputStyle}
                />
              </div>
              <div>
                <label style={labelStyle}>Başlık</label>
                <input
                  required
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  style={inputStyle}
                />
              </div>
              <div>
                <label style={labelStyle}>Görsel URL</label>
                <input
                  value={form.imageUrl}
                  onChange={(e) => setForm({ ...form, imageUrl: e.target.value })}
                  placeholder="/images/destinations/... veya boş bırak"
                  style={inputStyle}
                />
              </div>
              <div>
                <label style={labelStyle}>Rozet (opsiyonel)</label>
                <input
                  value={form.badge}
                  onChange={(e) => setForm({ ...form, badge: e.target.value })}
                  placeholder="örn. Çok Satan, Yeni"
                  style={inputStyle}
                />
              </div>
              <div>
                <label style={labelStyle}>Gece Sayısı</label>
                <input
                  required
                  type="number"
                  min={1}
                  value={form.nights}
                  onChange={(e) => setForm({ ...form, nights: e.target.value })}
                  style={inputStyle}
                />
              </div>
              <div>
                <label style={labelStyle}>Fiyat (₺, kişi başı)</label>
                <input
                  required
                  type="number"
                  min={0}
                  value={form.price}
                  onChange={(e) => setForm({ ...form, price: e.target.value })}
                  style={inputStyle}
                />
              </div>
              <div>
                <label style={labelStyle}>Eski Fiyat (opsiyonel, indirim göstermek için)</label>
                <input
                  type="number"
                  min={0}
                  value={form.originalPrice}
                  onChange={(e) => setForm({ ...form, originalPrice: e.target.value })}
                  style={inputStyle}
                />
              </div>
              <div>
                <label style={labelStyle}>Durum</label>
                <select
                  value={form.status}
                  onChange={(e) => setForm({ ...form, status: e.target.value as "active" | "inactive" })}
                  style={inputStyle}
                >
                  <option value="active">Aktif (sitede görünür)</option>
                  <option value="inactive">Pasif (gizli)</option>
                </select>
              </div>
            </div>

            <div style={{ marginBottom: 12 }}>
              <label style={labelStyle}>Açıklama</label>
              <textarea
                required
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                rows={2}
                style={{ ...inputStyle, fontFamily: "inherit", resize: "vertical" }}
              />
            </div>

            <div style={{ marginBottom: 12 }}>
              <label style={labelStyle}>Güzergahtaki Destinasyonlar (virgülle ayrılmış)</label>
              <input
                value={form.destinationsCsv}
                onChange={(e) => setForm({ ...form, destinationsCsv: e.target.value })}
                placeholder="Göbeklitepe, Harran, Mardin"
                style={inputStyle}
              />
            </div>

            <div style={{ marginBottom: 14 }}>
              <label style={labelStyle}>Pakete Dahil Olanlar (virgülle ayrılmış)</label>
              <input
                value={form.includesCsv}
                onChange={(e) => setForm({ ...form, includesCsv: e.target.value })}
                placeholder="4★ Otel, Transfer, Rehber, Kahvaltı"
                style={inputStyle}
              />
            </div>

            {error && <div style={{ color: "#a64022", fontSize: 12.5, marginBottom: 12 }}>{error}</div>}

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
              <button
                type="button"
                onClick={() => setShowForm(false)}
                style={{
                  padding: "9px 20px",
                  background: "transparent",
                  border: "1px solid #d2b793",
                  borderRadius: 4,
                  fontSize: 13,
                  cursor: "pointer",
                }}
              >
                Vazgeç
              </button>
            </div>
          </form>
        )}

        <div style={{ display: "grid", gap: 10 }}>
          {bundles.map((b) => (
            <div
              key={b.id}
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
                opacity: b.status === "active" ? 1 : 0.55,
              }}
            >
              <div>
                <div style={{ fontWeight: 600, fontSize: 13.5 }}>
                  {b.title}{" "}
                  <span style={{ fontSize: 10.5, color: "#8c8275", marginLeft: 6 }}>/{b.slug}</span>
                  {b.badge && (
                    <span style={{ fontSize: 10, fontWeight: 700, color: "#9b620b", marginLeft: 6 }}>
                      {b.badge.toUpperCase()}
                    </span>
                  )}
                  {b.status !== "active" && (
                    <span style={{ fontSize: 10.5, fontWeight: 700, color: "#a64022", marginLeft: 6 }}>
                      PASİF
                    </span>
                  )}
                </div>
                <div style={{ fontSize: 12, color: "#6f6558", marginTop: 2 }}>
                  {b.nights} gece · ₺{Number(b.price).toLocaleString("tr-TR")}
                  {b.original_price ? ` (eski: ₺${Number(b.original_price).toLocaleString("tr-TR")})` : ""}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                <button onClick={() => startEdit(b)} style={smallBtnStyle("#664932", "#d2b793")}>
                  Düzenle
                </button>
                <button onClick={() => toggleStatus(b)} style={smallBtnStyle("#664932", "#d2b793")}>
                  {b.status === "active" ? "Pasifleştir" : "Aktifleştir"}
                </button>
                <button onClick={() => handleDelete(b)} style={smallBtnStyle("#a64022", "#a64022")}>
                  Sil
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function smallBtnStyle(color: string, border: string): React.CSSProperties {
  return {
    padding: "7px 14px",
    background: "transparent",
    border: `1px solid ${border}`,
    color,
    borderRadius: 4,
    fontSize: 12,
    cursor: "pointer",
  };
}

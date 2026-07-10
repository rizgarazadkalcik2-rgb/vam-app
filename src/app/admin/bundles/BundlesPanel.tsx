"use client";

import { useState } from "react";
import type { VamBundle, BundleTranslations } from "@/lib/bundles";
import type { SessionPayload } from "@/lib/session";
import AdminShell from "../AdminShell";

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

const TABS = ["TR", "DE", "EN", "KU", "CKB"] as const;
type Tab = (typeof TABS)[number];

function emptyTranslationForm() {
  return { title: "", description: "", includesCsv: "", badge: "" };
}

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
    translations: {
      DE: emptyTranslationForm(),
      EN: emptyTranslationForm(),
      KU: emptyTranslationForm(),
      CKB: emptyTranslationForm(),
    },
  };
}

type FormState = ReturnType<typeof emptyForm>;

function bundleToForm(b: VamBundle): FormState {
  const trans = b.translations || {};
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
    translations: {
      DE: {
        title: trans.DE?.title || "",
        description: trans.DE?.description || "",
        includesCsv: (trans.DE?.includes || []).join(", "),
        badge: trans.DE?.badge || "",
      },
      EN: {
        title: trans.EN?.title || "",
        description: trans.EN?.description || "",
        includesCsv: (trans.EN?.includes || []).join(", "),
        badge: trans.EN?.badge || "",
      },
      KU: {
        title: trans.KU?.title || "",
        description: trans.KU?.description || "",
        includesCsv: (trans.KU?.includes || []).join(", "),
        badge: trans.KU?.badge || "",
      },
      CKB: {
        title: trans.CKB?.title || "",
        description: trans.CKB?.description || "",
        includesCsv: (trans.CKB?.includes || []).join(", "),
        badge: trans.CKB?.badge || "",
      },
    },
  };
}

function buildTranslations(f: FormState): BundleTranslations {
  const out: BundleTranslations = {};
  for (const lang of ["DE", "EN", "KU", "CKB"] as const) {
    const t = f.translations[lang];
    const includes = t.includesCsv.split(",").map((s) => s.trim()).filter(Boolean);
    const entry: Record<string, unknown> = {};
    if (t.title.trim()) entry.title = t.title.trim();
    if (t.description.trim()) entry.description = t.description.trim();
    if (includes.length > 0) entry.includes = includes;
    if (t.badge.trim()) entry.badge = t.badge.trim();
    if (Object.keys(entry).length > 0) out[lang] = entry;
  }
  return out;
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
    translations: buildTranslations(f),
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
  const [activeTab, setActiveTab] = useState<Tab>("TR");

  async function refresh() {
    const res = await fetch("/api/bundles");
    const data = await res.json();
    if (res.ok) setBundles(data.bundles);
  }

  function startCreate() {
    setForm(emptyForm());
    setEditingId(null);
    setShowForm(true);
    setActiveTab("TR");
    setError("");
  }

  function startEdit(b: VamBundle) {
    setForm(bundleToForm(b));
    setEditingId(b.id);
    setShowForm(true);
    setActiveTab("TR");
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
    <AdminShell
      title="Bundle Rotalar"
      subtitle="Çok şehirli rota paketlerini yönetin"
      displayName={session.displayName}
      role="admin"
    >

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

            <div style={{ display: "flex", gap: 6, marginBottom: 16, borderBottom: "1px solid #e5d6bc" }}>
              {TABS.map((tab) => (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setActiveTab(tab)}
                  style={{
                    padding: "7px 16px",
                    background: activeTab === tab ? "#c4522a" : "transparent",
                    color: activeTab === tab ? "#fff" : "#6f6558",
                    border: "none",
                    borderRadius: "4px 4px 0 0",
                    fontSize: 12.5,
                    fontWeight: 700,
                    cursor: "pointer",
                  }}
                >
                  {tab}
                  {tab !== "TR" && (form.translations[tab].title || form.translations[tab].description) ? " ✓" : ""}
                </button>
              ))}
            </div>

            {activeTab === "TR" ? (
              <>
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
                    <label style={labelStyle}>Başlık (TR)</label>
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
                    <label style={labelStyle}>Rozet (TR, opsiyonel)</label>
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
                  <label style={labelStyle}>Açıklama (TR)</label>
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
                  <label style={labelStyle}>Pakete Dahil Olanlar (TR, virgülle ayrılmış)</label>
                  <input
                    value={form.includesCsv}
                    onChange={(e) => setForm({ ...form, includesCsv: e.target.value })}
                    placeholder="4★ Otel, Transfer, Rehber, Kahvaltı"
                    style={inputStyle}
                  />
                </div>
              </>
            ) : (
              <>
                <div style={{ fontSize: 11.5, color: "#8c8275", marginBottom: 12 }}>
                  Boş bırakılan alanlar otomatik olarak Türkçe içeriğe düşer.
                </div>
                <div style={{ marginBottom: 12 }}>
                  <label style={labelStyle}>Başlık ({activeTab})</label>
                  <input
                    value={form.translations[activeTab].title}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        translations: {
                          ...form.translations,
                          [activeTab]: { ...form.translations[activeTab], title: e.target.value },
                        },
                      })
                    }
                    dir={activeTab === "CKB" ? "rtl" : "ltr"}
                    style={inputStyle}
                  />
                </div>
                <div style={{ marginBottom: 12 }}>
                  <label style={labelStyle}>Açıklama ({activeTab})</label>
                  <textarea
                    value={form.translations[activeTab].description}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        translations: {
                          ...form.translations,
                          [activeTab]: { ...form.translations[activeTab], description: e.target.value },
                        },
                      })
                    }
                    rows={2}
                    dir={activeTab === "CKB" ? "rtl" : "ltr"}
                    style={{ ...inputStyle, fontFamily: "inherit", resize: "vertical" }}
                  />
                </div>
                <div style={{ marginBottom: 12 }}>
                  <label style={labelStyle}>Pakete Dahil Olanlar ({activeTab}, virgülle ayrılmış)</label>
                  <input
                    value={form.translations[activeTab].includesCsv}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        translations: {
                          ...form.translations,
                          [activeTab]: { ...form.translations[activeTab], includesCsv: e.target.value },
                        },
                      })
                    }
                    dir={activeTab === "CKB" ? "rtl" : "ltr"}
                    style={inputStyle}
                  />
                </div>
                <div style={{ marginBottom: 14 }}>
                  <label style={labelStyle}>Rozet ({activeTab})</label>
                  <input
                    value={form.translations[activeTab].badge}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        translations: {
                          ...form.translations,
                          [activeTab]: { ...form.translations[activeTab], badge: e.target.value },
                        },
                      })
                    }
                    dir={activeTab === "CKB" ? "rtl" : "ltr"}
                    style={inputStyle}
                  />
                </div>
              </>
            )}

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
    </AdminShell>
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

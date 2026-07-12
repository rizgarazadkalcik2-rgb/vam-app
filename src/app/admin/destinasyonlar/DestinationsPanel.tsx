"use client";

import { useState } from "react";
import type { VamDestination, DestinationTranslations } from "@/lib/destinations";
import type { SessionPayload } from "@/lib/session";
import AdminShell from "../AdminShell";
import TranslationBadges from "../TranslationBadges";

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
  return {
    name: "",
    region: "",
    eraDisplay: "",
    eraCaption: "",
    historyText: "",
    featuresText: "",
    visitLocation: "",
    visitNearestCity: "",
    visitDuration: "",
    visitBestTime: "",
  };
}

function emptyForm() {
  return {
    slug: "",
    name: "",
    region: "",
    era: "",
    eraDisplay: "",
    eraCaption: "",
    unesco: false,
    tagsCsv: "",
    imageUrl: "",
    rating: "",
    reviews: "",
    historyText: "",
    featuresText: "",
    visitLocation: "",
    visitNearestCity: "",
    visitDuration: "",
    visitBestTime: "",
    latitude: "",
    longitude: "",
    relatedCsv: "",
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

function destinationToForm(d: VamDestination): FormState {
  const trans = d.translations || {};
  return {
    slug: d.slug,
    name: d.name,
    region: d.region,
    era: d.era || "",
    eraDisplay: d.era_display || "",
    eraCaption: d.era_caption || "",
    unesco: d.unesco,
    tagsCsv: (d.tags || []).join(", "),
    imageUrl: d.image_url || "",
    rating: d.rating != null ? String(d.rating) : "",
    reviews: d.reviews != null ? String(d.reviews) : "",
    historyText: (d.history || []).join("\n\n"),
    featuresText: (d.features || []).map((f) => `${f.title}|${f.body}`).join("\n"),
    visitLocation: d.visit_location || "",
    visitNearestCity: d.visit_nearest_city || "",
    visitDuration: d.visit_duration || "",
    visitBestTime: d.visit_best_time || "",
    latitude: d.latitude != null ? String(d.latitude) : "",
    longitude: d.longitude != null ? String(d.longitude) : "",
    relatedCsv: (d.related || []).join(", "),
    status: d.status === "active" ? "active" : "inactive",
    translations: {
      DE: {
        name: trans.DE?.name || "",
        region: trans.DE?.region || "",
        eraDisplay: trans.DE?.eraDisplay || "",
        eraCaption: trans.DE?.eraCaption || "",
        historyText: (trans.DE?.history || []).join("\n\n"),
        featuresText: (trans.DE?.features || []).map((f) => `${f.title}|${f.body}`).join("\n"),
        visitLocation: trans.DE?.visitLocation || "",
        visitNearestCity: trans.DE?.visitNearestCity || "",
        visitDuration: trans.DE?.visitDuration || "",
        visitBestTime: trans.DE?.visitBestTime || "",
      },
      EN: {
        name: trans.EN?.name || "",
        region: trans.EN?.region || "",
        eraDisplay: trans.EN?.eraDisplay || "",
        eraCaption: trans.EN?.eraCaption || "",
        historyText: (trans.EN?.history || []).join("\n\n"),
        featuresText: (trans.EN?.features || []).map((f) => `${f.title}|${f.body}`).join("\n"),
        visitLocation: trans.EN?.visitLocation || "",
        visitNearestCity: trans.EN?.visitNearestCity || "",
        visitDuration: trans.EN?.visitDuration || "",
        visitBestTime: trans.EN?.visitBestTime || "",
      },
      KU: {
        name: trans.KU?.name || "",
        region: trans.KU?.region || "",
        eraDisplay: trans.KU?.eraDisplay || "",
        eraCaption: trans.KU?.eraCaption || "",
        historyText: (trans.KU?.history || []).join("\n\n"),
        featuresText: (trans.KU?.features || []).map((f) => `${f.title}|${f.body}`).join("\n"),
        visitLocation: trans.KU?.visitLocation || "",
        visitNearestCity: trans.KU?.visitNearestCity || "",
        visitDuration: trans.KU?.visitDuration || "",
        visitBestTime: trans.KU?.visitBestTime || "",
      },
      CKB: {
        name: trans.CKB?.name || "",
        region: trans.CKB?.region || "",
        eraDisplay: trans.CKB?.eraDisplay || "",
        eraCaption: trans.CKB?.eraCaption || "",
        historyText: (trans.CKB?.history || []).join("\n\n"),
        featuresText: (trans.CKB?.features || []).map((f) => `${f.title}|${f.body}`).join("\n"),
        visitLocation: trans.CKB?.visitLocation || "",
        visitNearestCity: trans.CKB?.visitNearestCity || "",
        visitDuration: trans.CKB?.visitDuration || "",
        visitBestTime: trans.CKB?.visitBestTime || "",
      },
    },
  };
}

function buildTranslations(f: FormState): DestinationTranslations {
  const out: DestinationTranslations = {};
  for (const lang of ["DE", "EN", "KU", "CKB"] as const) {
    const t = f.translations[lang];
    const entry: {
      name?: string;
      region?: string;
      eraDisplay?: string;
      eraCaption?: string;
      history?: string[];
      features?: { title: string; body: string }[];
      visitLocation?: string;
      visitNearestCity?: string;
      visitDuration?: string;
      visitBestTime?: string;
    } = {};
    if (t.name.trim()) entry.name = t.name.trim();
    if (t.region.trim()) entry.region = t.region.trim();
    if (t.eraDisplay.trim()) entry.eraDisplay = t.eraDisplay.trim();
    if (t.eraCaption.trim()) entry.eraCaption = t.eraCaption.trim();
    if (t.visitLocation.trim()) entry.visitLocation = t.visitLocation.trim();
    if (t.visitNearestCity.trim()) entry.visitNearestCity = t.visitNearestCity.trim();
    if (t.visitDuration.trim()) entry.visitDuration = t.visitDuration.trim();
    if (t.visitBestTime.trim()) entry.visitBestTime = t.visitBestTime.trim();
    const history = t.historyText.split(/\n\s*\n/).map((s) => s.trim()).filter(Boolean);
    if (history.length > 0) entry.history = history;
    const features = t.featuresText
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean)
      .map((line) => {
        const [title, ...rest] = line.split("|");
        return { title: (title || "").trim(), body: rest.join("|").trim() };
      })
      .filter((ft) => ft.title);
    if (features.length > 0) entry.features = features;
    if (Object.keys(entry).length > 0) out[lang] = entry;
  }
  return out;
}

function formToPayload(f: FormState) {
  return {
    slug: f.slug.trim(),
    name: f.name.trim(),
    region: f.region.trim(),
    era: f.era.trim() || null,
    eraDisplay: f.eraDisplay.trim() || null,
    eraCaption: f.eraCaption.trim() || null,
    unesco: f.unesco,
    tags: f.tagsCsv.split(",").map((s) => s.trim()).filter(Boolean),
    imageUrl: f.imageUrl.trim() || null,
    rating: f.rating ? Number(f.rating) : null,
    reviews: f.reviews ? Number(f.reviews) : null,
    history: f.historyText.split(/\n\s*\n/).map((s) => s.trim()).filter(Boolean),
    features: f.featuresText
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean)
      .map((line) => {
        const [title, ...rest] = line.split("|");
        return { title: (title || "").trim(), body: rest.join("|").trim() };
      })
      .filter((f) => f.title),
    visitLocation: f.visitLocation.trim() || null,
    visitNearestCity: f.visitNearestCity.trim() || null,
    visitDuration: f.visitDuration.trim() || null,
    visitBestTime: f.visitBestTime.trim() || null,
    latitude: f.latitude.trim() ? Number(f.latitude) : null,
    longitude: f.longitude.trim() ? Number(f.longitude) : null,
    related: f.relatedCsv.split(",").map((s) => s.trim()).filter(Boolean),
    status: f.status,
    translations: buildTranslations(f),
  };
}

export default function DestinationsPanel({
  session,
  initialDestinations,
}: {
  session: SessionPayload;
  initialDestinations: VamDestination[];
}) {
  const [destinations, setDestinations] = useState(initialDestinations);
  const [form, setForm] = useState<FormState>(emptyForm());
  const [editingId, setEditingId] = useState<number | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [activeTab, setActiveTab] = useState<Tab>("TR");
  const [uploading, setUploading] = useState(false);

  async function refresh() {
    const res = await fetch("/api/destinations");
    const data = await res.json();
    if (res.ok) setDestinations(data.destinations);
  }

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    setError("");
    const formData = new FormData();
    formData.append("file", file);
    const res = await fetch("/api/upload", { method: "POST", body: formData });
    const data = await res.json();
    setUploading(false);
    if (!res.ok) {
      setError(data.error || "Görsel yüklenirken bir hata oluştu.");
      return;
    }
    setForm((f) => ({ ...f, imageUrl: data.url }));
  }

  function startCreate() {
    setForm(emptyForm());
    setEditingId(null);
    setShowForm(true);
    setActiveTab("TR");
    setError("");
  }

  function startEdit(d: VamDestination) {
    setForm(destinationToForm(d));
    setEditingId(d.id);
    setShowForm(true);
    setActiveTab("TR");
    setError("");
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setError("");

    const payload = formToPayload(form);
    const url = editingId ? `/api/destinations/${editingId}` : "/api/destinations";
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

  async function handleDelete(d: VamDestination) {
    const typed = prompt(`Bu destinasyonu kalıcı olarak silmek için adını aynen yazın:\n"${d.name}"`);
    if (typed === null) return;
    if (typed !== d.name) {
      alert("Girilen ad eşleşmedi, silme işlemi iptal edildi.");
      return;
    }
    const res = await fetch(`/api/destinations/${d.id}`, { method: "DELETE" });
    const data = await res.json();
    if (res.ok) {
      await refresh();
    } else {
      alert(data.error || "Bir hata oluştu.");
    }
  }

  async function toggleStatus(d: VamDestination) {
    const newStatus: "active" | "inactive" = d.status === "active" ? "inactive" : "active";
    const payload = { ...destinationToForm(d), status: newStatus };
    const res = await fetch(`/api/destinations/${d.id}`, {
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
      title="Destinasyonlar"
      subtitle="Sitede görünen destinasyon kartlarını ve detaylarını yönetin"
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
          <div style={{ fontSize: 14, fontWeight: 700 }}>
            Destinasyonlar ({destinations.length})
          </div>
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
              + Yeni Destinasyon
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
              {editingId ? "Destinasyonu Düzenle" : "Yeni Destinasyon Ekle"}
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
                  {tab !== "TR" && (form.translations[tab].name || form.translations[tab].region) ? " ✓" : ""}
                </button>
              ))}
            </div>

            {activeTab !== "TR" && (
              <>
                <div style={{ fontSize: 11.5, color: "#8c8275", marginBottom: 12 }}>
                  Boş bırakılan alanlar otomatik olarak Türkçe içeriğe düşer.
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 12, marginBottom: 14 }}>
                  <div>
                    <label style={labelStyle}>İsim ({activeTab})</label>
                    <input
                      value={form.translations[activeTab].name}
                      onChange={(e) =>
                        setForm({
                          ...form,
                          translations: {
                            ...form.translations,
                            [activeTab]: { ...form.translations[activeTab], name: e.target.value },
                          },
                        })
                      }
                      style={inputStyle}
                    />
                  </div>
                  <div>
                    <label style={labelStyle}>Bölge ({activeTab})</label>
                    <input
                      value={form.translations[activeTab].region}
                      onChange={(e) =>
                        setForm({
                          ...form,
                          translations: {
                            ...form.translations,
                            [activeTab]: { ...form.translations[activeTab], region: e.target.value },
                          },
                        })
                      }
                      style={inputStyle}
                    />
                  </div>
                  <div>
                    <label style={labelStyle}>Dönem Görünümü ({activeTab})</label>
                    <input
                      value={form.translations[activeTab].eraDisplay}
                      onChange={(e) =>
                        setForm({
                          ...form,
                          translations: {
                            ...form.translations,
                            [activeTab]: { ...form.translations[activeTab], eraDisplay: e.target.value },
                          },
                        })
                      }
                      style={inputStyle}
                    />
                  </div>
                  <div>
                    <label style={labelStyle}>Dönem Açıklaması ({activeTab})</label>
                    <input
                      value={form.translations[activeTab].eraCaption}
                      onChange={(e) =>
                        setForm({
                          ...form,
                          translations: {
                            ...form.translations,
                            [activeTab]: { ...form.translations[activeTab], eraCaption: e.target.value },
                          },
                        })
                      }
                      style={inputStyle}
                    />
                  </div>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 12, marginBottom: 12 }}>
                  <div>
                    <label style={labelStyle}>Konum ({activeTab})</label>
                    <input
                      value={form.translations[activeTab].visitLocation}
                      onChange={(e) =>
                        setForm({
                          ...form,
                          translations: {
                            ...form.translations,
                            [activeTab]: { ...form.translations[activeTab], visitLocation: e.target.value },
                          },
                        })
                      }
                      dir={activeTab === "CKB" ? "rtl" : "ltr"}
                      style={inputStyle}
                    />
                  </div>
                  <div>
                    <label style={labelStyle}>En Yakın Şehir ({activeTab})</label>
                    <input
                      value={form.translations[activeTab].visitNearestCity}
                      onChange={(e) =>
                        setForm({
                          ...form,
                          translations: {
                            ...form.translations,
                            [activeTab]: { ...form.translations[activeTab], visitNearestCity: e.target.value },
                          },
                        })
                      }
                      dir={activeTab === "CKB" ? "rtl" : "ltr"}
                      style={inputStyle}
                    />
                  </div>
                  <div>
                    <label style={labelStyle}>Önerilen Süre ({activeTab})</label>
                    <input
                      value={form.translations[activeTab].visitDuration}
                      onChange={(e) =>
                        setForm({
                          ...form,
                          translations: {
                            ...form.translations,
                            [activeTab]: { ...form.translations[activeTab], visitDuration: e.target.value },
                          },
                        })
                      }
                      dir={activeTab === "CKB" ? "rtl" : "ltr"}
                      style={inputStyle}
                    />
                  </div>
                  <div>
                    <label style={labelStyle}>En İyi Zaman ({activeTab})</label>
                    <input
                      value={form.translations[activeTab].visitBestTime}
                      onChange={(e) =>
                        setForm({
                          ...form,
                          translations: {
                            ...form.translations,
                            [activeTab]: { ...form.translations[activeTab], visitBestTime: e.target.value },
                          },
                        })
                      }
                      dir={activeTab === "CKB" ? "rtl" : "ltr"}
                      style={inputStyle}
                    />
                  </div>
                </div>

                <div style={{ marginBottom: 12 }}>
                  <label style={labelStyle}>
                    Tarihçe ({activeTab}) — her paragraf arasında BOŞ SATIR bırakın
                  </label>
                  <textarea
                    value={form.translations[activeTab].historyText}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        translations: {
                          ...form.translations,
                          [activeTab]: { ...form.translations[activeTab], historyText: e.target.value },
                        },
                      })
                    }
                    rows={6}
                    dir={activeTab === "CKB" ? "rtl" : "ltr"}
                    style={{ ...inputStyle, fontFamily: "inherit", resize: "vertical" }}
                  />
                </div>

                <div style={{ marginBottom: 12 }}>
                  <label style={labelStyle}>
                    Öne Çıkan Özellikler ({activeTab}) — her satır <code>Başlık|Açıklama</code> formatında
                  </label>
                  <textarea
                    value={form.translations[activeTab].featuresText}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        translations: {
                          ...form.translations,
                          [activeTab]: { ...form.translations[activeTab], featuresText: e.target.value },
                        },
                      })
                    }
                    rows={4}
                    dir={activeTab === "CKB" ? "rtl" : "ltr"}
                    style={{ ...inputStyle, fontFamily: "inherit", resize: "vertical" }}
                  />
                </div>
              </>
            )}

            {activeTab === "TR" && (
            <>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 12, marginBottom: 12 }}>
              <div>
                <label style={labelStyle}>Slug (URL — küçük harf, tire ile)</label>
                <input
                  required
                  value={form.slug}
                  onChange={(e) => setForm({ ...form, slug: e.target.value })}
                  placeholder="orn-gobeklitepe"
                  style={inputStyle}
                />
              </div>
              <div>
                <label style={labelStyle}>İsim</label>
                <input
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  style={inputStyle}
                />
              </div>
              <div>
                <label style={labelStyle}>Bölge</label>
                <input
                  required
                  value={form.region}
                  onChange={(e) => setForm({ ...form, region: e.target.value })}
                  placeholder="örn. Şanlıurfa"
                  style={inputStyle}
                />
              </div>
              <div>
                <label style={labelStyle}>Dönem (kısa, örn. M.Ö. 10.000)</label>
                <input
                  value={form.era}
                  onChange={(e) => setForm({ ...form, era: e.target.value })}
                  style={inputStyle}
                />
              </div>
              <div>
                <label style={labelStyle}>Dönem Görünümü (hero'da büyük yazı)</label>
                <input
                  value={form.eraDisplay}
                  onChange={(e) => setForm({ ...form, eraDisplay: e.target.value })}
                  placeholder="örn. 12.000+ Yıl"
                  style={inputStyle}
                />
              </div>
              <div>
                <label style={labelStyle}>Dönem Açıklaması</label>
                <input
                  value={form.eraCaption}
                  onChange={(e) => setForm({ ...form, eraCaption: e.target.value })}
                  placeholder="örn. Neolitik Dönem"
                  style={inputStyle}
                />
              </div>
              <div>
                <label style={labelStyle}>Etiketler (virgülle ayrılmış)</label>
                <input
                  value={form.tagsCsv}
                  onChange={(e) => setForm({ ...form, tagsCsv: e.target.value })}
                  placeholder="Arkeoloji, Tarih"
                  style={inputStyle}
                />
              </div>
              <div>
                <label style={labelStyle}>Puan (1-5, opsiyonel)</label>
                <input
                  value={form.rating}
                  onChange={(e) => setForm({ ...form, rating: e.target.value })}
                  placeholder="4.9"
                  style={inputStyle}
                />
              </div>
              <div>
                <label style={labelStyle}>Değerlendirme Sayısı (opsiyonel)</label>
                <input
                  value={form.reviews}
                  onChange={(e) => setForm({ ...form, reviews: e.target.value })}
                  placeholder="312"
                  style={inputStyle}
                />
              </div>
            </div>

            <div style={{ marginBottom: 14 }}>
              <label style={labelStyle}>Görsel</label>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
                <input
                  value={form.imageUrl}
                  onChange={(e) => setForm({ ...form, imageUrl: e.target.value })}
                  placeholder="https://... veya /images/destinations/... (URL yapıştır ya da yükle)"
                  style={{ ...inputStyle, flex: 1 }}
                />
                <label className="adm-btn adm-btn-ghost" style={{ cursor: "pointer", flexShrink: 0, padding: "8px 14px", fontSize: 12.5, border: "1px solid #e5d6bc", borderRadius: 4, color: "#664932" }}>
                  {uploading ? "Yükleniyor..." : "Yükle"}
                  <input type="file" accept="image/jpeg,image/png,image/webp" onChange={handleUpload} disabled={uploading} style={{ display: "none" }} />
                </label>
              </div>
              {form.imageUrl && (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={form.imageUrl} alt="" style={{ height: 60, borderRadius: 6, display: "block", objectFit: "cover" }} />
              )}
            </div>

            <label style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 14, fontSize: 13 }}>
              <input
                type="checkbox"
                checked={form.unesco}
                onChange={(e) => setForm({ ...form, unesco: e.target.checked })}
              />
              UNESCO Dünya Mirası
            </label>

            <div style={{ marginBottom: 12 }}>
              <label style={labelStyle}>
                Tarihçe (her paragraf arasında BOŞ SATIR bırakın — ilk paragraf sayfada büyük puntoyla gösterilir)
              </label>
              <textarea
                value={form.historyText}
                onChange={(e) => setForm({ ...form, historyText: e.target.value })}
                rows={6}
                style={{ ...inputStyle, fontFamily: "inherit", resize: "vertical" }}
              />
            </div>

            <div style={{ marginBottom: 12 }}>
              <label style={labelStyle}>
                Öne Çıkan Özellikler — her satır <code>Başlık|Açıklama</code> formatında
              </label>
              <textarea
                value={form.featuresText}
                onChange={(e) => setForm({ ...form, featuresText: e.target.value })}
                rows={4}
                placeholder={"Mimari|Devasa T şeklindeki taş dikmeler\nKazı Alanı|Halen aktif arkeolojik kazı sahası"}
                style={{ ...inputStyle, fontFamily: "inherit", resize: "vertical" }}
              />
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 12, marginBottom: 12 }}>
              <div>
                <label style={labelStyle}>Konum</label>
                <input
                  value={form.visitLocation}
                  onChange={(e) => setForm({ ...form, visitLocation: e.target.value })}
                  style={inputStyle}
                />
              </div>
              <div>
                <label style={labelStyle}>En Yakın Şehir</label>
                <input
                  value={form.visitNearestCity}
                  onChange={(e) => setForm({ ...form, visitNearestCity: e.target.value })}
                  style={inputStyle}
                />
              </div>
              <div>
                <label style={labelStyle}>Önerilen Süre</label>
                <input
                  value={form.visitDuration}
                  onChange={(e) => setForm({ ...form, visitDuration: e.target.value })}
                  placeholder="örn. 2-3 saat"
                  style={inputStyle}
                />
              </div>
              <div>
                <label style={labelStyle}>En İyi Zaman</label>
                <input
                  value={form.visitBestTime}
                  onChange={(e) => setForm({ ...form, visitBestTime: e.target.value })}
                  placeholder="örn. Nisan-Haziran"
                  style={inputStyle}
                />
              </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 12, marginBottom: 12 }}>
              <div>
                <label style={labelStyle}>Enlem (latitude) — opsiyonel, Google haritası için</label>
                <input
                  type="number"
                  step="any"
                  value={form.latitude}
                  onChange={(e) => setForm({ ...form, latitude: e.target.value })}
                  placeholder="örn. 37.2231"
                  style={inputStyle}
                />
              </div>
              <div>
                <label style={labelStyle}>Boylam (longitude) — opsiyonel, Google haritası için</label>
                <input
                  type="number"
                  step="any"
                  value={form.longitude}
                  onChange={(e) => setForm({ ...form, longitude: e.target.value })}
                  placeholder="örn. 38.9226"
                  style={inputStyle}
                />
              </div>
            </div>

            <div style={{ marginBottom: 14 }}>
              <label style={labelStyle}>İlgili Destinasyonlar (slug, virgülle ayrılmış)</label>
              <input
                value={form.relatedCsv}
                onChange={(e) => setForm({ ...form, relatedCsv: e.target.value })}
                placeholder="van-kalesi, tatvan"
                style={inputStyle}
              />
            </div>

            <div style={{ marginBottom: 14 }}>
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
          {destinations.map((d) => (
            <div
              key={d.id}
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
                opacity: d.status === "active" ? 1 : 0.55,
              }}
            >
              <div>
                <div style={{ fontWeight: 600, fontSize: 13.5 }}>
                  {d.name}{" "}
                  <span style={{ fontSize: 10.5, color: "#8c8275", marginLeft: 6 }}>/{d.slug}</span>
                  {d.unesco && (
                    <span style={{ fontSize: 10, fontWeight: 700, color: "#9b620b", marginLeft: 6 }}>
                      UNESCO
                    </span>
                  )}
                  {d.status !== "active" && (
                    <span style={{ fontSize: 10.5, fontWeight: 700, color: "#a64022", marginLeft: 6 }}>
                      PASİF
                    </span>
                  )}
                </div>
                <div style={{ fontSize: 12, color: "#6f6558", marginTop: 2 }}>
                  {d.region} {d.era_display ? `· ${d.era_display}` : ""}
                </div>
                <div style={{ marginTop: 6 }}>
                  <TranslationBadges
                    translated={{
                      DE: !!d.translations?.DE?.name,
                      EN: !!d.translations?.EN?.name,
                      KU: !!d.translations?.KU?.name,
                      CKB: !!d.translations?.CKB?.name,
                    }}
                  />
                </div>
              </div>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                <button onClick={() => startEdit(d)} style={smallBtnStyle("#664932", "#d2b793")}>
                  Düzenle
                </button>
                <button onClick={() => toggleStatus(d)} style={smallBtnStyle("#664932", "#d2b793")}>
                  {d.status === "active" ? "Pasifleştir" : "Aktifleştir"}
                </button>
                <button onClick={() => handleDelete(d)} style={smallBtnStyle("#a64022", "#a64022")}>
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

"use client";

import { useState } from "react";
import type { VamDestination } from "@/lib/destinations";
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
    relatedCsv: "",
    status: "active" as "active" | "inactive",
  };
}

type FormState = ReturnType<typeof emptyForm>;

function destinationToForm(d: VamDestination): FormState {
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
    relatedCsv: (d.related || []).join(", "),
    status: d.status === "active" ? "active" : "inactive",
  };
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
    related: f.relatedCsv.split(",").map((s) => s.trim()).filter(Boolean),
    status: f.status,
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

  async function refresh() {
    const res = await fetch("/api/destinations");
    const data = await res.json();
    if (res.ok) setDestinations(data.destinations);
  }

  function startCreate() {
    setForm(emptyForm());
    setEditingId(null);
    setShowForm(true);
    setError("");
  }

  function startEdit(d: VamDestination) {
    setForm(destinationToForm(d));
    setEditingId(d.id);
    setShowForm(true);
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
    if (!confirm(`"${d.name}" destinasyonunu silmek istediğinize emin misiniz?`)) return;
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

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 12 }}>
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
                <label style={labelStyle}>Görsel URL</label>
                <input
                  value={form.imageUrl}
                  onChange={(e) => setForm({ ...form, imageUrl: e.target.value })}
                  placeholder="/images/destinations/... veya boş bırak"
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

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 12 }}>
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

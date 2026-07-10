"use client";

import { useState } from "react";
import type { MatchEvent, MatchEventTranslations } from "@/lib/matchEvents";
import type { SessionPayload } from "@/lib/session";
import AdminShell from "../AdminShell";

export const TEAM_LABELS: Record<string, string> = {
  amedspor: "Amedspor (Diyarbakır)",
  vanspor: "Vanspor FK (Van)",
  batman: "Batman Petrol Spor (Batman)",
  mardin1969: "Mardin 1969 Spor (Mardin)",
  igdir: "Iğdır FK (Iğdır)",
};

const TABS = ["TR", "DE", "EN", "KU", "CKB"] as const;
type Tab = (typeof TABS)[number];

function emptyTranslationForm() {
  return { title: "", competition: "", body: "" };
}

const emptyForm = {
  team: "amedspor",
  kind: "match" as "match" | "news",
  title: "",
  eventDate: "",
  eventTime: "",
  competition: "",
  venue: "",
  imageUrl: "",
  body: "",
  translations: {
    DE: emptyTranslationForm(),
    EN: emptyTranslationForm(),
    KU: emptyTranslationForm(),
    CKB: emptyTranslationForm(),
  },
};

function buildTranslations(translations: typeof emptyForm.translations): MatchEventTranslations {
  const out: MatchEventTranslations = {};
  for (const lang of ["DE", "EN", "KU", "CKB"] as const) {
    const t = translations[lang];
    const entry: { title?: string; competition?: string; body?: string } = {};
    if (t.title.trim()) entry.title = t.title.trim();
    if (t.competition.trim()) entry.competition = t.competition.trim();
    if (t.body.trim()) entry.body = t.body.trim();
    if (Object.keys(entry).length > 0) out[lang] = entry;
  }
  return out;
}

export default function MatchWeekendsPanel({
  session,
  initialEvents,
}: {
  session: SessionPayload;
  initialEvents: MatchEvent[];
}) {
  const [events, setEvents] = useState(initialEvents);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const [teamFilter, setTeamFilter] = useState("all");
  const [activeTab, setActiveTab] = useState<Tab>("TR");

  async function refresh() {
    const res = await fetch("/api/match-events");
    const data = await res.json();
    if (res.ok) setEvents(data.events);
  }

  function startCreate(kind: "match" | "news") {
    setEditingId(null);
    setForm({ ...emptyForm, kind, team: teamFilter !== "all" ? teamFilter : "amedspor" });
    setShowForm(true);
    setActiveTab("TR");
    setError("");
  }

  function startEdit(ev: MatchEvent) {
    setEditingId(ev.id);
    const trans = ev.translations || {};
    setForm({
      team: ev.team,
      kind: ev.kind,
      title: ev.title,
      eventDate: ev.event_date ? String(ev.event_date).slice(0, 10) : "",
      eventTime: ev.event_time || "",
      competition: ev.competition || "",
      venue: ev.venue || "",
      imageUrl: ev.image_url || "",
      body: ev.body || "",
      translations: {
        DE: { title: trans.DE?.title || "", competition: trans.DE?.competition || "", body: trans.DE?.body || "" },
        EN: { title: trans.EN?.title || "", competition: trans.EN?.competition || "", body: trans.EN?.body || "" },
        KU: { title: trans.KU?.title || "", competition: trans.KU?.competition || "", body: trans.KU?.body || "" },
        CKB: { title: trans.CKB?.title || "", competition: trans.CKB?.competition || "", body: trans.CKB?.body || "" },
      },
    });
    setShowForm(true);
    setActiveTab("TR");
    setError("");
  }

  function cancelForm() {
    setShowForm(false);
    setEditingId(null);
    setForm(emptyForm);
    setActiveTab("TR");
    setError("");
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

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setError("");

    const url = editingId ? `/api/match-events/${editingId}` : "/api/match-events";
    const method = editingId ? "PATCH" : "POST";
    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, translations: buildTranslations(form.translations) }),
    });
    const data = await res.json();
    setSubmitting(false);

    if (!res.ok) {
      setError(data.error || "Bir hata oluştu.");
      return;
    }
    cancelForm();
    await refresh();
  }

  async function toggleStatus(ev: MatchEvent) {
    const res = await fetch(`/api/match-events/${ev.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        team: ev.team,
        kind: ev.kind,
        title: ev.title,
        eventDate: ev.event_date ? String(ev.event_date).slice(0, 10) : null,
        eventTime: ev.event_time,
        competition: ev.competition,
        venue: ev.venue,
        imageUrl: ev.image_url,
        body: ev.body,
        status: ev.status === "active" ? "inactive" : "active",
        translations: ev.translations || {},
      }),
    });
    if (res.ok) await refresh();
  }

  async function handleDelete(ev: MatchEvent) {
    if (!confirm(`"${ev.title}" kaydını silmek istediğinize emin misiniz?`)) return;
    const res = await fetch(`/api/match-events/${ev.id}`, { method: "DELETE" });
    if (res.ok) await refresh();
  }

  const filtered = teamFilter === "all" ? events : events.filter((e) => e.team === teamFilter);
  const matches = filtered.filter((e) => e.kind === "match");
  const news = filtered.filter((e) => e.kind === "news");

  return (
    <AdminShell
      title="Match Weekends"
      subtitle="Maç fikstürünü ve haber/kutlama kartlarını yönetin — sitede anında görünür"
      displayName={session.displayName}
      role="admin"
    >
      <div style={{ display: "flex", gap: 10, alignItems: "center", flexWrap: "wrap", marginBottom: 20 }}>
        <select value={teamFilter} onChange={(e) => setTeamFilter(e.target.value)} style={inputStyle}>
          <option value="all">Tüm takımlar</option>
          {Object.entries(TEAM_LABELS).map(([slug, label]) => (
            <option key={slug} value={slug}>{label}</option>
          ))}
        </select>
        <button className="adm-btn adm-btn-primary" onClick={() => startCreate("match")}>
          + Maç Ekle
        </button>
        <button className="adm-btn adm-btn-ghost" onClick={() => startCreate("news")}>
          + Haber / Kutlama Ekle
        </button>
      </div>

      {showForm && (
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
            {editingId ? "Kaydı Düzenle" : form.kind === "match" ? "Yeni Maç Ekle" : "Yeni Haber / Kutlama Ekle"}
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
                {tab !== "TR" && (form.translations[tab].title || form.translations[tab].body) ? " ✓" : ""}
              </button>
            ))}
          </div>

          {activeTab !== "TR" && (
            <>
              <div style={{ fontSize: 11.5, color: "#8c8275", marginBottom: 12 }}>
                Boş bırakılan alanlar otomatik olarak Türkçe içeriğe düşer. Maçlarda rakip takım adı (title) genelde
                özel isimdir, çevirmeye gerek yoktur.
              </div>
              <div style={{ marginBottom: 12 }}>
                <input
                  placeholder={form.kind === "match" ? `Rakip takım (${activeTab}, opsiyonel)` : `Başlık (${activeTab})`}
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
                  style={{ ...inputStyle, width: "100%" }}
                />
              </div>
              <div style={{ marginBottom: 12 }}>
                <input
                  placeholder={`Lig / Kupa (${activeTab}, opsiyonel)`}
                  value={form.translations[activeTab].competition}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      translations: {
                        ...form.translations,
                        [activeTab]: { ...form.translations[activeTab], competition: e.target.value },
                      },
                    })
                  }
                  dir={activeTab === "CKB" ? "rtl" : "ltr"}
                  style={{ ...inputStyle, width: "100%" }}
                />
              </div>
              <div style={{ marginBottom: 12 }}>
                <textarea
                  placeholder={`Not / açıklama metni (${activeTab})`}
                  value={form.translations[activeTab].body}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      translations: {
                        ...form.translations,
                        [activeTab]: { ...form.translations[activeTab], body: e.target.value },
                      },
                    })
                  }
                  rows={3}
                  dir={activeTab === "CKB" ? "rtl" : "ltr"}
                  style={{ ...inputStyle, width: "100%", resize: "vertical" }}
                />
              </div>
            </>
          )}

          {activeTab === "TR" && (
            <>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 12 }}>
            <select
              value={form.team}
              onChange={(e) => setForm({ ...form, team: e.target.value })}
              style={inputStyle}
            >
              {Object.entries(TEAM_LABELS).map(([slug, label]) => (
                <option key={slug} value={slug}>{label}</option>
              ))}
            </select>
            <select
              value={form.kind}
              onChange={(e) => setForm({ ...form, kind: e.target.value as "match" | "news" })}
              style={inputStyle}
            >
              <option value="match">Maç (fikstür)</option>
              <option value="news">Haber / Kutlama</option>
            </select>
          </div>

          <div style={{ marginBottom: 12 }}>
            <input
              placeholder={form.kind === "match" ? "Rakip takım (örn. Galatasaray)" : "Başlık (örn. Süper Lig'e yükselme kutlaması)"}
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              required
              style={{ ...inputStyle, width: "100%" }}
            />
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12, marginBottom: 12 }}>
            <input
              type="date"
              value={form.eventDate}
              onChange={(e) => setForm({ ...form, eventDate: e.target.value })}
              required={form.kind === "match"}
              style={inputStyle}
            />
            <input
              placeholder="Saat (örn. 19.00)"
              value={form.eventTime}
              onChange={(e) => setForm({ ...form, eventTime: e.target.value })}
              style={inputStyle}
            />
            <input
              placeholder="Lig / Kupa (örn. 1. Lig)"
              value={form.competition}
              onChange={(e) => setForm({ ...form, competition: e.target.value })}
              style={inputStyle}
            />
          </div>

          {form.kind === "match" && (
            <div style={{ marginBottom: 12 }}>
              <select
                value={form.venue}
                onChange={(e) => setForm({ ...form, venue: e.target.value })}
                style={inputStyle}
              >
                <option value="">Saha seçin (opsiyonel)</option>
                <option value="İç saha">İç saha</option>
                <option value="Deplasman">Deplasman</option>
              </select>
            </div>
          )}

          <div style={{ marginBottom: 12 }}>
            <textarea
              placeholder={form.kind === "match" ? "Not (opsiyonel — örn. sezonun derbisi)" : "Açıklama metni"}
              value={form.body}
              onChange={(e) => setForm({ ...form, body: e.target.value })}
              rows={3}
              style={{ ...inputStyle, width: "100%", resize: "vertical" }}
            />
          </div>
            </>
          )}

          <div style={{ marginBottom: 16 }}>
            <label style={{ fontSize: 11.5, fontWeight: 600, color: "#6f6558", marginBottom: 4, display: "block" }}>
              Görsel
            </label>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8, flexWrap: "wrap" }}>
              <input
                value={form.imageUrl}
                onChange={(e) => setForm({ ...form, imageUrl: e.target.value })}
                placeholder="https://... (URL yapıştır ya da yükle)"
                style={{ ...inputStyle, flex: 1, minWidth: 200 }}
              />
              <label className="adm-btn adm-btn-ghost" style={{ cursor: "pointer" }}>
                {uploading ? "Yükleniyor..." : "Fotoğraf Yükle"}
                <input type="file" accept="image/jpeg,image/png,image/webp" onChange={handleUpload} style={{ display: "none" }} />
              </label>
            </div>
            {form.imageUrl && (
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={form.imageUrl} alt="" style={{ height: 44, borderRadius: 6, display: "block" }} />
                <button
                  type="button"
                  onClick={() => setForm({ ...form, imageUrl: "" })}
                  style={{ background: "none", border: "none", color: "#a64022", fontSize: 12, cursor: "pointer" }}
                >
                  Görseli kaldır
                </button>
              </div>
            )}
          </div>

          {error && <div style={{ color: "#a64022", fontSize: 12.5, marginBottom: 12 }}>{error}</div>}

          <div style={{ display: "flex", gap: 10 }}>
            <button type="submit" disabled={submitting || uploading} className="adm-btn adm-btn-primary">
              {submitting ? "Kaydediliyor..." : editingId ? "Değişiklikleri Kaydet" : "Ekle"}
            </button>
            <button type="button" onClick={cancelForm} className="adm-btn adm-btn-ghost">
              Vazgeç
            </button>
          </div>
        </form>
      )}

      <Section title={`Maç Fikstürü (${matches.length})`}>
        {matches.length === 0 && <Empty text="Henüz maç eklenmedi. Fikstür sitede takım seçildiğinde görünür." />}
        {matches.map((ev) => (
          <EventRow key={ev.id} ev={ev} onEdit={startEdit} onToggle={toggleStatus} onDelete={handleDelete} />
        ))}
      </Section>

      <Section title={`Haberler & Kutlamalar (${news.length})`}>
        {news.length === 0 && <Empty text="Henüz haber/kutlama kartı eklenmedi." />}
        {news.map((ev) => (
          <EventRow key={ev.id} ev={ev} onEdit={startEdit} onToggle={toggleStatus} onDelete={handleDelete} />
        ))}
      </Section>
    </AdminShell>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: 28 }}>
      <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 12 }}>{title}</div>
      <div style={{ display: "grid", gap: 10 }}>{children}</div>
    </div>
  );
}

function Empty({ text }: { text: string }) {
  return (
    <div style={{ background: "#fff", borderRadius: 6, padding: 16, fontSize: 13, color: "#8a7d68" }}>
      {text}
    </div>
  );
}

function EventRow({
  ev,
  onEdit,
  onToggle,
  onDelete,
}: {
  ev: MatchEvent;
  onEdit: (e: MatchEvent) => void;
  onToggle: (e: MatchEvent) => void;
  onDelete: (e: MatchEvent) => void;
}) {
  const dateStr = ev.event_date
    ? new Date(ev.event_date).toLocaleDateString("tr-TR", { day: "numeric", month: "long", year: "numeric" })
    : null;

  return (
    <div
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
        opacity: ev.status === "active" ? 1 : 0.55,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 12, minWidth: 0 }}>
        {ev.image_url ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={ev.image_url} alt="" style={{ width: 52, height: 52, borderRadius: 6, objectFit: "cover", flexShrink: 0 }} />
        ) : null}
        <div style={{ minWidth: 0 }}>
          <div style={{ fontWeight: 600, fontSize: 13.5 }}>
            {ev.kind === "match" ? `${TEAM_LABELS[ev.team]?.split(" (")[0] || ev.team} — ${ev.title}` : ev.title}
            {ev.status !== "active" && (
              <span style={{ fontSize: 10.5, fontWeight: 700, color: "#a64022", marginLeft: 8 }}>GİZLİ</span>
            )}
          </div>
          <div style={{ fontSize: 12, color: "#6f6558", marginTop: 2 }}>
            {TEAM_LABELS[ev.team] || ev.team}
            {dateStr && <> · {dateStr}</>}
            {ev.event_time && <> · {ev.event_time}</>}
            {ev.competition && <> · {ev.competition}</>}
            {ev.venue && <> · {ev.venue}</>}
          </div>
        </div>
      </div>
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
        <button className="adm-btn adm-btn-ghost" onClick={() => onEdit(ev)}>Düzenle</button>
        <button className="adm-btn adm-btn-ghost" onClick={() => onToggle(ev)}>
          {ev.status === "active" ? "Gizle" : "Yayınla"}
        </button>
        <button
          className="adm-btn"
          style={{ border: "1px solid #a64022", color: "#a64022", background: "#fff" }}
          onClick={() => onDelete(ev)}
        >
          Sil
        </button>
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
  fontFamily: "inherit",
  background: "#fff",
};

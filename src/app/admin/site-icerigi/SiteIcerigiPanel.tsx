"use client";

import { useState } from "react";
import type { PlatformStat } from "@/lib/siteStats";
import type { PageSection } from "@/lib/pageSections";
import type { Announcement } from "@/lib/announcement";
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

const cardStyle: React.CSSProperties = {
  background: "#fff",
  border: "1px solid #e5d6bc",
  borderRadius: 10,
  padding: "20px 22px",
  marginBottom: 22,
};

const sectionTitleStyle: React.CSSProperties = {
  fontSize: 15,
  fontWeight: 700,
  marginBottom: 4,
};

const sectionSubStyle: React.CSSProperties = {
  fontSize: 12.5,
  color: "#6f6558",
  marginBottom: 16,
};

const saveBtnStyle = (disabled: boolean): React.CSSProperties => ({
  background: "#c4522a",
  color: "#fff",
  border: "none",
  borderRadius: 6,
  padding: "9px 18px",
  fontSize: 13,
  fontWeight: 600,
  cursor: disabled ? "default" : "pointer",
  opacity: disabled ? 0.7 : 1,
});

function Notice({ text, tone }: { text: string; tone: "error" | "success" }) {
  const styles =
    tone === "error"
      ? { background: "#fdecea", border: "1px solid #f3b7ae", color: "#a33" }
      : { background: "#eaf7ec", border: "1px solid #b7dfc0", color: "#2c6b3a" };
  return (
    <div style={{ ...styles, borderRadius: 6, padding: "8px 12px", fontSize: 13, marginBottom: 14 }}>
      {text}
    </div>
  );
}

// ───────────────────────────────────────────────────────────
// İstatistik şeridi
// ───────────────────────────────────────────────────────────

interface StatRow {
  key: string;
  num: string;
  labelTr: string;
  labelDe: string;
  labelEn: string;
  labelKu: string;
  labelCkb: string;
}

function statsToRows(stats: PlatformStat[]): StatRow[] {
  return stats.map((s) => ({
    key: `${s.id}-${Math.random()}`,
    num: s.num,
    labelTr: s.label_tr,
    labelDe: s.label_de,
    labelEn: s.label_en || "",
    labelKu: s.label_ku || "",
    labelCkb: s.label_ckb || "",
  }));
}

function StatsEditor({ initialStats }: { initialStats: PlatformStat[] }) {
  const [rows, setRows] = useState<StatRow[]>(statsToRows(initialStats));
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [saved, setSaved] = useState(false);
  const [dragIndex, setDragIndex] = useState<number | null>(null);

  function updateRow(i: number, patch: Partial<StatRow>) {
    setRows((prev) => prev.map((r, idx) => (idx === i ? { ...r, ...patch } : r)));
  }
  function addRow() {
    setRows((prev) => [
      ...prev,
      { key: `new-${Date.now()}`, num: "", labelTr: "", labelDe: "", labelEn: "", labelKu: "", labelCkb: "" },
    ]);
  }
  function removeRow(i: number) {
    if (!confirm("Bu istatistiği kaldırmak istediğinize emin misiniz?")) return;
    setRows((prev) => prev.filter((_, idx) => idx !== i));
  }
  function onDragOver(e: React.DragEvent, i: number) {
    e.preventDefault();
    if (dragIndex === null || dragIndex === i) return;
    setRows((prev) => {
      const next = [...prev];
      const [moved] = next.splice(dragIndex, 1);
      next.splice(i, 0, moved);
      return next;
    });
    setDragIndex(i);
  }

  async function handleSave() {
    setSaving(true);
    setError("");
    setSaved(false);
    const payload = {
      stats: rows.map((r) => ({
        num: r.num.trim(),
        labelTr: r.labelTr.trim(),
        labelDe: r.labelDe.trim(),
        labelEn: r.labelEn.trim(),
        labelKu: r.labelKu.trim(),
        labelCkb: r.labelCkb.trim(),
      })),
    };
    try {
      const res = await fetch("/api/site-stats", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json().catch(() => null);
      if (!res.ok) {
        setError(data?.error || "Bir hata oluştu.");
        return;
      }
      setRows(statsToRows(data.stats));
      setSaved(true);
      setTimeout(() => setSaved(false), 2500);
    } catch {
      setError("Bir hata oluştu. Bağlantınızı kontrol edip tekrar deneyin.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div style={cardStyle}>
      <div style={sectionTitleStyle}>İstatistik Şeridi</div>
      <div style={sectionSubStyle}>Ana sayfada hero'nun altındaki sayı şeridi. Sürükleyerek sıralayın.</div>

      {error && <Notice text={error} tone="error" />}
      {saved && <Notice text="Kaydedildi, canlı sitede güncellendi." tone="success" />}

      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {rows.map((r, i) => (
          <div
            key={r.key}
            draggable
            onDragStart={() => setDragIndex(i)}
            onDragOver={(e) => onDragOver(e, i)}
            onDragEnd={() => setDragIndex(null)}
            style={{
              display: "flex",
              alignItems: "flex-start",
              gap: 12,
              background: "#fdfaf3",
              border: "1px solid #e5d6bc",
              borderRadius: 8,
              padding: "12px 14px",
              opacity: dragIndex === i ? 0.5 : 1,
              cursor: "grab",
            }}
          >
            <div style={{ fontSize: 16, color: "#c9b98f", paddingTop: 22 }} title="Sürükleyerek sırala">
              ⠿
            </div>
            <div style={{ width: 90, flexShrink: 0 }}>
              <label style={labelStyle}>Sayı</label>
              <input style={inputStyle} value={r.num} onChange={(e) => updateRow(i, { num: e.target.value })} placeholder="12.000" />
            </div>
            <div style={{ flex: 1, display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: 10 }}>
              <div>
                <label style={labelStyle}>Türkçe etiket</label>
                <input style={inputStyle} value={r.labelTr} onChange={(e) => updateRow(i, { labelTr: e.target.value })} placeholder="Yıllık Tarih" />
              </div>
              <div>
                <label style={labelStyle}>Almanca etiket</label>
                <input style={inputStyle} value={r.labelDe} onChange={(e) => updateRow(i, { labelDe: e.target.value })} placeholder="Jahre Geschichte" />
              </div>
              <div>
                <label style={labelStyle}>İngilizce etiket</label>
                <input style={inputStyle} value={r.labelEn} onChange={(e) => updateRow(i, { labelEn: e.target.value })} placeholder="Years of History" />
              </div>
              <div>
                <label style={labelStyle}>Kurmancî etiket</label>
                <input style={inputStyle} value={r.labelKu} onChange={(e) => updateRow(i, { labelKu: e.target.value })} placeholder="Salên Dîrokê" />
              </div>
              <div>
                <label style={labelStyle}>Soranî etiket</label>
                <input style={{ ...inputStyle, direction: "rtl" }} value={r.labelCkb} onChange={(e) => updateRow(i, { labelCkb: e.target.value })} placeholder="ساڵانی مێژوو" />
              </div>
            </div>
            <button
              onClick={() => removeRow(i)}
              title="Kaldır"
              style={{ marginTop: 20, background: "none", border: "1px solid #e5d6bc", color: "#a33", borderRadius: 4, width: 30, height: 30, cursor: "pointer", fontSize: 15, flexShrink: 0 }}
            >
              ✕
            </button>
          </div>
        ))}
      </div>

      <div style={{ display: "flex", gap: 10, marginTop: 14 }}>
        <button onClick={addRow} style={{ background: "none", border: "1px dashed #c9b98f", color: "#6f6558", borderRadius: 6, padding: "9px 16px", fontSize: 13, cursor: "pointer" }}>
          + Yeni İstatistik Ekle
        </button>
        <button onClick={handleSave} disabled={saving} style={saveBtnStyle(saving)}>
          {saving ? "Kaydediliyor…" : "Kaydet ve Yayınla"}
        </button>
      </div>
    </div>
  );
}

// ───────────────────────────────────────────────────────────
// Sayfa bölümleri (sıra + göster/gizle)
// ───────────────────────────────────────────────────────────

const SECTION_LABELS: Record<string, string> = {
  stats: "İstatistik Şeridi",
  dest_strip: "Destinasyon Fotoğraf Şeridi",
  experiences: "Öne Çıkan Deneyimler",
  bundles: "Paket Koleksiyonu (Bundle Rotalar)",
  why_vam: "Neden VAM",
  cta: "Alt Çağrı Bandı (CTA)",
  lang_strip: "Dil Şeridi",
};

interface SectionRow {
  key: string;
  sectionKey: string;
  enabled: boolean;
}

function sectionsToRows(sections: PageSection[]): SectionRow[] {
  return sections.map((s) => ({ key: `${s.section_key}-${Math.random()}`, sectionKey: s.section_key, enabled: s.enabled }));
}

function SectionsEditor({ initialSections }: { initialSections: PageSection[] }) {
  const [rows, setRows] = useState<SectionRow[]>(sectionsToRows(initialSections));
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [saved, setSaved] = useState(false);
  const [dragIndex, setDragIndex] = useState<number | null>(null);

  function toggle(i: number) {
    setRows((prev) => prev.map((r, idx) => (idx === i ? { ...r, enabled: !r.enabled } : r)));
  }
  function onDragOver(e: React.DragEvent, i: number) {
    e.preventDefault();
    if (dragIndex === null || dragIndex === i) return;
    setRows((prev) => {
      const next = [...prev];
      const [moved] = next.splice(dragIndex, 1);
      next.splice(i, 0, moved);
      return next;
    });
    setDragIndex(i);
  }

  async function handleSave() {
    setSaving(true);
    setError("");
    setSaved(false);
    const payload = {
      page: "platform",
      sections: rows.map((r) => ({ sectionKey: r.sectionKey, enabled: r.enabled })),
    };
    try {
      const res = await fetch("/api/page-sections", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json().catch(() => null);
      if (!res.ok) {
        setError(data?.error || "Bir hata oluştu.");
        return;
      }
      setRows(sectionsToRows(data.sections));
      setSaved(true);
      setTimeout(() => setSaved(false), 2500);
    } catch {
      setError("Bir hata oluştu. Bağlantınızı kontrol edip tekrar deneyin.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div style={cardStyle}>
      <div style={sectionTitleStyle}>Ana Sayfa Bölüm Sırası</div>
      <div style={sectionSubStyle}>
        Hero ve footer sabittir. Aradaki bölümleri sürükleyerek sıralayın, kapatmak için sağdaki anahtarı kullanın.
      </div>

      {error && <Notice text={error} tone="error" />}
      {saved && <Notice text="Kaydedildi, canlı sitede güncellendi." tone="success" />}

      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        <div style={{ fontSize: 11.5, color: "#a89a86", padding: "4px 4px" }}>↑ Hero (sabit)</div>
        {rows.map((r, i) => (
          <div
            key={r.key}
            draggable
            onDragStart={() => setDragIndex(i)}
            onDragOver={(e) => onDragOver(e, i)}
            onDragEnd={() => setDragIndex(null)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              background: r.enabled ? "#fdfaf3" : "#f3f0e9",
              border: "1px solid #e5d6bc",
              borderRadius: 8,
              padding: "10px 14px",
              opacity: dragIndex === i ? 0.5 : r.enabled ? 1 : 0.55,
              cursor: "grab",
            }}
          >
            <span style={{ fontSize: 16, color: "#c9b98f" }} title="Sürükleyerek sırala">⠿</span>
            <span style={{ flex: 1, fontSize: 13.5, fontWeight: 600 }}>
              {SECTION_LABELS[r.sectionKey] || r.sectionKey}
            </span>
            <label style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, color: "#6f6558", cursor: "pointer" }}>
              <input type="checkbox" checked={r.enabled} onChange={() => toggle(i)} />
              {r.enabled ? "Görünür" : "Gizli"}
            </label>
          </div>
        ))}
        <div style={{ fontSize: 11.5, color: "#a89a86", padding: "4px 4px" }}>↓ Footer (sabit)</div>
      </div>

      <button onClick={handleSave} disabled={saving} style={{ ...saveBtnStyle(saving), marginTop: 14 }}>
        {saving ? "Kaydediliyor…" : "Kaydet ve Yayınla"}
      </button>
    </div>
  );
}

// ───────────────────────────────────────────────────────────
// Haftalık duyuru / özel etkinlik
// ───────────────────────────────────────────────────────────

function AnnouncementEditor({ initial }: { initial: Announcement }) {
  const [active, setActive] = useState(initial.active);
  const [bodyTr, setBodyTr] = useState(initial.body_tr || "");
  const [bodyDe, setBodyDe] = useState(initial.body_de || "");
  const [bodyEn, setBodyEn] = useState(initial.body_en || "");
  const [bodyKu, setBodyKu] = useState(initial.body_ku || "");
  const [bodyCkb, setBodyCkb] = useState(initial.body_ckb || "");
  const [linkUrl, setLinkUrl] = useState(initial.link_url || "");
  const [linkLabelTr, setLinkLabelTr] = useState(initial.link_label_tr || "");
  const [linkLabelDe, setLinkLabelDe] = useState(initial.link_label_de || "");
  const [linkLabelEn, setLinkLabelEn] = useState(initial.link_label_en || "");
  const [linkLabelKu, setLinkLabelKu] = useState(initial.link_label_ku || "");
  const [linkLabelCkb, setLinkLabelCkb] = useState(initial.link_label_ckb || "");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [saved, setSaved] = useState(false);

  async function handleSave() {
    setSaving(true);
    setError("");
    setSaved(false);
    try {
      const res = await fetch("/api/announcement", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          active,
          bodyTr,
          bodyDe,
          bodyEn,
          bodyKu,
          bodyCkb,
          linkUrl,
          linkLabelTr,
          linkLabelDe,
          linkLabelEn,
          linkLabelKu,
          linkLabelCkb,
        }),
      });
      const data = await res.json().catch(() => null);
      if (!res.ok) {
        setError(data?.error || "Bir hata oluştu.");
        return;
      }
      setSaved(true);
      setTimeout(() => setSaved(false), 2500);
    } catch {
      setError("Bir hata oluştu. Bağlantınızı kontrol edip tekrar deneyin.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div style={cardStyle}>
      <div style={sectionTitleStyle}>Haftalık Duyuru / Özel Etkinlik</div>
      <div style={sectionSubStyle}>
        Nav'ın hemen altında, sitenin en üstünde çıkan ince bir bant. "Bu hafta: Amedspor deplasmanı" gibi
        zamana bağlı duyurular için.
      </div>

      {error && <Notice text={error} tone="error" />}
      {saved && <Notice text="Kaydedildi, canlı sitede güncellendi." tone="success" />}

      <label style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, fontWeight: 600, marginBottom: 16, cursor: "pointer" }}>
        <input type="checkbox" checked={active} onChange={(e) => setActive(e.target.checked)} />
        Duyuru şeridi sitede görünsün
      </label>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: 14, marginBottom: 14 }}>
        <div>
          <label style={labelStyle}>Türkçe metin</label>
          <input style={inputStyle} value={bodyTr} onChange={(e) => setBodyTr(e.target.value)} placeholder="Bu hafta: Amedspor deplasmanı" />
        </div>
        <div>
          <label style={labelStyle}>Almanca metin</label>
          <input style={inputStyle} value={bodyDe} onChange={(e) => setBodyDe(e.target.value)} placeholder="Diese Woche: Amedspor Auswärtsspiel" />
        </div>
        <div>
          <label style={labelStyle}>İngilizce metin</label>
          <input style={inputStyle} value={bodyEn} onChange={(e) => setBodyEn(e.target.value)} placeholder="This week: Amedspor away game" />
        </div>
        <div>
          <label style={labelStyle}>Kurmancî metin</label>
          <input style={inputStyle} value={bodyKu} onChange={(e) => setBodyKu(e.target.value)} placeholder="Vê hefteyê: Yariya derveyî ya Amedsporê" />
        </div>
        <div>
          <label style={labelStyle}>Soranî metin</label>
          <input style={{ ...inputStyle, direction: "rtl" }} value={bodyCkb} onChange={(e) => setBodyCkb(e.target.value)} placeholder="ئەم هەفتەیە..." />
        </div>
      </div>

      <div style={{ marginBottom: 14 }}>
        <label style={labelStyle}>Bağlantı (opsiyonel)</label>
        <input style={inputStyle} value={linkUrl} onChange={(e) => setLinkUrl(e.target.value)} placeholder="/match-weekends" />
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: 14 }}>
        <div>
          <label style={labelStyle}>Buton metni (TR)</label>
          <input style={inputStyle} value={linkLabelTr} onChange={(e) => setLinkLabelTr(e.target.value)} placeholder="Detaylar" />
        </div>
        <div>
          <label style={labelStyle}>Buton metni (DE)</label>
          <input style={inputStyle} value={linkLabelDe} onChange={(e) => setLinkLabelDe(e.target.value)} placeholder="Mehr erfahren" />
        </div>
        <div>
          <label style={labelStyle}>Buton metni (EN)</label>
          <input style={inputStyle} value={linkLabelEn} onChange={(e) => setLinkLabelEn(e.target.value)} placeholder="Details" />
        </div>
        <div>
          <label style={labelStyle}>Buton metni (KU)</label>
          <input style={inputStyle} value={linkLabelKu} onChange={(e) => setLinkLabelKu(e.target.value)} placeholder="Hûrgilî" />
        </div>
        <div>
          <label style={labelStyle}>Buton metni (CKB)</label>
          <input style={{ ...inputStyle, direction: "rtl" }} value={linkLabelCkb} onChange={(e) => setLinkLabelCkb(e.target.value)} placeholder="وردەکارییەکان" />
        </div>
      </div>

      <button onClick={handleSave} disabled={saving} style={{ ...saveBtnStyle(saving), marginTop: 16 }}>
        {saving ? "Kaydediliyor…" : "Kaydet ve Yayınla"}
      </button>
    </div>
  );
}

// ───────────────────────────────────────────────────────────
// Ana panel
// ───────────────────────────────────────────────────────────

export default function SiteIcerigiPanel({
  session,
  initialStats,
  initialSections,
  initialAnnouncement,
}: {
  session: SessionPayload;
  initialStats: PlatformStat[];
  initialSections: PageSection[];
  initialAnnouncement: Announcement;
}) {
  return (
    <AdminShell
      title="Site İçeriği"
      subtitle="Ana sayfa istatistiklerini, bölüm sırasını ve haftalık duyuruyu buradan yönetin"
      displayName={session.displayName}
      role={session.role}
    >
      <div style={{ maxWidth: 780 }}>
        <div
          style={{
            background: "#fdf6ea",
            border: "1px solid #e5d6bc",
            borderRadius: 8,
            padding: "10px 14px",
            fontSize: 12.5,
            color: "#6f6558",
            marginBottom: 20,
          }}
        >
          Her kartın kendi "Kaydet ve Yayınla" butonu var — birini kaydetmek diğerlerini etkilemez, hemen
          canlıya yansır.
        </div>

        <AnnouncementEditor initial={initialAnnouncement} />
        <SectionsEditor initialSections={initialSections} />
        <StatsEditor initialStats={initialStats} />
      </div>
    </AdminShell>
  );
}

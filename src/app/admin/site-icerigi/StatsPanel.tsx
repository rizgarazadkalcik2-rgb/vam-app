"use client";

import { useState } from "react";
import type { PlatformStat } from "@/lib/siteStats";
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

interface Row {
  key: string; // sadece React listesi için, DB'ye gitmiyor
  num: string;
  labelTr: string;
  labelDe: string;
}

function statsToRows(stats: PlatformStat[]): Row[] {
  return stats.map((s) => ({
    key: `${s.id}-${Math.random()}`,
    num: s.num,
    labelTr: s.label_tr,
    labelDe: s.label_de,
  }));
}

export default function StatsPanel({
  session,
  initialStats,
}: {
  session: SessionPayload;
  initialStats: PlatformStat[];
}) {
  const [rows, setRows] = useState<Row[]>(statsToRows(initialStats));
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [savedNotice, setSavedNotice] = useState(false);
  const [dragIndex, setDragIndex] = useState<number | null>(null);

  function updateRow(i: number, patch: Partial<Row>) {
    setRows((prev) => prev.map((r, idx) => (idx === i ? { ...r, ...patch } : r)));
  }

  function addRow() {
    setRows((prev) => [...prev, { key: `new-${Date.now()}`, num: "", labelTr: "", labelDe: "" }]);
  }

  function removeRow(i: number) {
    if (!confirm("Bu istatistiği kaldırmak istediğinize emin misiniz?")) return;
    setRows((prev) => prev.filter((_, idx) => idx !== i));
  }

  function handleDragStart(i: number) {
    setDragIndex(i);
  }

  function handleDragOver(e: React.DragEvent, i: number) {
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

  function handleDragEnd() {
    setDragIndex(null);
  }

  async function handleSave() {
    setSaving(true);
    setError("");
    setSavedNotice(false);

    const payload = {
      stats: rows.map((r) => ({ num: r.num.trim(), labelTr: r.labelTr.trim(), labelDe: r.labelDe.trim() })),
    };

    const res = await fetch("/api/site-stats", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = await res.json();
    setSaving(false);

    if (!res.ok) {
      setError(data.error || "Bir hata oluştu.");
      return;
    }

    setRows(statsToRows(data.stats));
    setSavedNotice(true);
    setTimeout(() => setSavedNotice(false), 2500);
  }

  return (
    <AdminShell
      title="Site İçeriği"
      subtitle="Ana sayfadaki istatistik şeridini düzenleyin — sürükleyerek sıralayın"
      displayName={session.displayName}
      role={session.role}
      actions={
        <button
          onClick={handleSave}
          disabled={saving}
          style={{
            background: "#c4522a",
            color: "#fff",
            border: "none",
            borderRadius: 6,
            padding: "9px 18px",
            fontSize: 13,
            fontWeight: 600,
            cursor: saving ? "default" : "pointer",
            opacity: saving ? 0.7 : 1,
          }}
        >
          {saving ? "Kaydediliyor…" : "Kaydet ve Yayınla"}
        </button>
      }
    >
      <div style={{ maxWidth: 760 }}>
        <div
          style={{
            background: "#fdf6ea",
            border: "1px solid #e5d6bc",
            borderRadius: 8,
            padding: "10px 14px",
            fontSize: 12.5,
            color: "#6f6558",
            marginBottom: 16,
          }}
        >
          Buradaki değişiklikler "Kaydet ve Yayınla" butonuna bastığınızda hemen canlıya yansır — ayrı bir
          taslak/önizleme adımı yok. Ana sayfadaki hero bölümünün altındaki şeritte, soldan sağa bu sırayla
          görünür.
        </div>

        {error && (
          <div
            style={{
              background: "#fdecea",
              border: "1px solid #f3b7ae",
              color: "#a33",
              borderRadius: 6,
              padding: "8px 12px",
              fontSize: 13,
              marginBottom: 14,
            }}
          >
            {error}
          </div>
        )}

        {savedNotice && (
          <div
            style={{
              background: "#eaf7ec",
              border: "1px solid #b7dfc0",
              color: "#2c6b3a",
              borderRadius: 6,
              padding: "8px 12px",
              fontSize: 13,
              marginBottom: 14,
            }}
          >
            Kaydedildi, canlı sitede güncellendi.
          </div>
        )}

        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {rows.map((r, i) => (
            <div
              key={r.key}
              draggable
              onDragStart={() => handleDragStart(i)}
              onDragOver={(e) => handleDragOver(e, i)}
              onDragEnd={handleDragEnd}
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: 12,
                background: "#fff",
                border: "1px solid #e5d6bc",
                borderRadius: 8,
                padding: "12px 14px",
                opacity: dragIndex === i ? 0.5 : 1,
                cursor: "grab",
              }}
            >
              <div
                style={{
                  fontSize: 16,
                  color: "#c9b98f",
                  paddingTop: 22,
                  userSelect: "none",
                  cursor: "grab",
                }}
                title="Sürükleyerek sırala"
              >
                ⠿
              </div>

              <div style={{ width: 90 }}>
                <label style={labelStyle}>Sayı</label>
                <input
                  style={inputStyle}
                  value={r.num}
                  onChange={(e) => updateRow(i, { num: e.target.value })}
                  placeholder="12.000"
                />
              </div>

              <div style={{ flex: 1 }}>
                <label style={labelStyle}>Türkçe etiket</label>
                <input
                  style={inputStyle}
                  value={r.labelTr}
                  onChange={(e) => updateRow(i, { labelTr: e.target.value })}
                  placeholder="Yıllık Tarih"
                />
              </div>

              <div style={{ flex: 1 }}>
                <label style={labelStyle}>Almanca etiket</label>
                <input
                  style={inputStyle}
                  value={r.labelDe}
                  onChange={(e) => updateRow(i, { labelDe: e.target.value })}
                  placeholder="Jahre Geschichte"
                />
              </div>

              <button
                onClick={() => removeRow(i)}
                title="Kaldır"
                style={{
                  marginTop: 20,
                  background: "none",
                  border: "1px solid #e5d6bc",
                  color: "#a33",
                  borderRadius: 4,
                  width: 30,
                  height: 30,
                  cursor: "pointer",
                  fontSize: 15,
                }}
              >
                ✕
              </button>
            </div>
          ))}
        </div>

        <button
          onClick={addRow}
          style={{
            marginTop: 14,
            background: "none",
            border: "1px dashed #c9b98f",
            color: "#6f6558",
            borderRadius: 6,
            padding: "9px 16px",
            fontSize: 13,
            cursor: "pointer",
          }}
        >
          + Yeni İstatistik Ekle
        </button>
      </div>
    </AdminShell>
  );
}

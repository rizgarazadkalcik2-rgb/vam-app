"use client";

import { useState } from "react";
import type { VamPackage } from "@/lib/packages";
import type { SessionPayload } from "@/lib/session";
import AdminShell from "./AdminShell";

interface Partner {
  id: string;
  display_name: string;
}

const emptyForm = {
  title: "",
  destination: "",
  nights: 1,
  priceTry: 0,
  capacity: 0,
  description: "",
  partnerId: "",
  imageUrl: "",
};

export default function AdminPanel({
  session,
  initialPackages,
  partners,
}: {
  session: SessionPayload;
  initialPackages: VamPackage[];
  partners: Partner[];
}) {
  const [packages, setPackages] = useState(initialPackages);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [uploading, setUploading] = useState(false);
  const [showForm, setShowForm] = useState(false);

  async function refresh() {
    const res = await fetch("/api/packages");
    const data = await res.json();
    if (res.ok) setPackages(data.packages);
  }

  async function handleDelete(id: number, title: string) {
    const typed = prompt(`Bu paketi kalıcı olarak silmek için adını aynen yazın:\n"${title}"`);
    if (typed === null) return;
    if (typed !== title) {
      alert("Girilen ad eşleşmedi, silme işlemi iptal edildi.");
      return;
    }
    const res = await fetch(`/api/packages/${id}`, { method: "DELETE" });
    if (res.ok) {
      await refresh();
    } else {
      const data = await res.json().catch(() => null);
      alert(data?.error || "Bir hata oluştu.");
    }
  }

  async function toggleStatus(pkg: VamPackage) {
    const newStatus = pkg.status === "active" ? "inactive" : "active";
    const res = await fetch(`/api/packages/${pkg.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: pkg.title,
        destination: pkg.destination,
        nights: pkg.nights,
        priceTry: Number(pkg.price_try),
        capacity: pkg.capacity,
        description: pkg.description,
        status: newStatus,
      }),
    });
    if (res.ok) await refresh();
  }

  function startCreate() {
    setEditingId(null);
    setForm({ ...emptyForm, partnerId: partners[0]?.id || "" });
    setShowForm(true);
    setError("");
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
      partnerId: pkg.partner_id,
      imageUrl: pkg.image_url || "",
    });
    setShowForm(true);
    setError("");
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

  function cancelForm() {
    setShowForm(false);
    setEditingId(null);
    setForm(emptyForm);
    setError("");
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setError("");

    const selectedPartner = partners.find((p) => p.id === form.partnerId);
    if (!selectedPartner) {
      setError("Lütfen bir acente seçin.");
      setSubmitting(false);
      return;
    }

    const url = editingId ? `/api/packages/${editingId}` : "/api/packages";
    const method = editingId ? "PATCH" : "POST";

    const payload: Record<string, unknown> = {
      title: form.title,
      destination: form.destination,
      nights: form.nights,
      priceTry: form.priceTry,
      capacity: form.capacity,
      description: form.description,
      status: "active",
      imageUrl: form.imageUrl,
    };

    if (editingId) {
      payload.newPartnerId = selectedPartner.id;
      payload.newPartnerName = selectedPartner.display_name;
    } else {
      payload.partnerId = selectedPartner.id;
      payload.partnerName = selectedPartner.display_name;
    }

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

    cancelForm();
    setSubmitting(false);
    await refresh();
  }

  const partnerGroups = packages.reduce<Record<string, VamPackage[]>>((acc, p) => {
    (acc[p.partner_name] ||= []).push(p);
    return acc;
  }, {});

  return (
    <AdminShell
      title="Paketler"
      subtitle="Acente paketlerini oluşturun, düzenleyin ve yayına alın"
      displayName={session.displayName}
      role="admin"
    >

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
            gap: 12,
            marginBottom: 20,
          }}
        >
          <StatCard label="Toplam Paket" value={packages.length} />
          <StatCard label="Aktif Paket" value={packages.filter((p) => p.status === "active").length} />
          <StatCard label="Acente Sayısı" value={Object.keys(partnerGroups).length} />
        </div>

        {!showForm && (
          <button
            onClick={startCreate}
            disabled={partners.length === 0}
            style={{
              padding: "10px 20px",
              background: partners.length === 0 ? "#ccc" : "#c4522a",
              color: "#fff",
              border: "none",
              borderRadius: 4,
              fontSize: 13,
              fontWeight: 600,
              cursor: partners.length === 0 ? "not-allowed" : "pointer",
              marginBottom: 20,
            }}
          >
            + Yeni Paket Ekle
          </button>
        )}

        {partners.length === 0 && !showForm && (
          <div style={{ color: "#a64022", fontSize: 12.5, marginBottom: 20 }}>
            Paket eklemeden önce en az bir aktif acente olmalı. Önce{" "}
            <a href="/admin/acenteler" style={{ color: "#a64022", textDecoration: "underline" }}>
              Acenteler
            </a>{" "}
            sayfasından bir acente ekleyin.
          </div>
        )}

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
              {editingId ? "Paketi Düzenle" : "Yeni Paket Ekle"}
            </div>

            <label style={{ display: "block", marginBottom: 12 }}>
              <span style={{ display: "block", fontSize: 11.5, color: "#6f6558", marginBottom: 5 }}>
                Acente
              </span>
              <select
                value={form.partnerId}
                onChange={(e) => setForm({ ...form, partnerId: e.target.value })}
                required
                style={{ ...inputStyle, width: "100%" }}
              >
                <option value="" disabled>
                  Acente seçin
                </option>
                {partners.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.display_name}
                  </option>
                ))}
              </select>
            </label>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 12, marginBottom: 12 }}>
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

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: 12, marginBottom: 12 }}>
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
              <button
                type="button"
                onClick={cancelForm}
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
        )}

        {Object.entries(partnerGroups).length === 0 && (
          <div style={{ color: "#8c8275", fontSize: 13 }}>Henüz hiç paket eklenmedi.</div>
        )}

        {Object.entries(partnerGroups).map(([partnerName, pkgs]) => (
          <div key={partnerName} style={{ marginBottom: 24 }}>
            <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 10 }}>
              {partnerName} <span style={{ color: "#a27450", fontWeight: 400 }}>({pkgs.length} paket)</span>
            </div>
            <div style={{ display: "grid", gap: 8 }}>
              {pkgs.map((pkg) => (
                <div
                  key={pkg.id}
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
                    opacity: pkg.status === "active" ? 1 : 0.55,
                  }}
                >
                  {pkg.image_url && (
                    <img
                      src={pkg.image_url}
                      alt={pkg.title}
                      style={{
                        width: 56,
                        height: 56,
                        objectFit: "cover",
                        borderRadius: 4,
                        flexShrink: 0,
                      }}
                    />
                  )}
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 600, fontSize: 13.5 }}>
                      <span style={{ color: "#a27450", fontWeight: 400 }}>#{pkg.id}</span> {pkg.title}{" "}
                      <span
                        style={{
                          fontSize: 10.5,
                          fontWeight: 700,
                          color: pkg.status === "active" ? "#2a7a50" : "#8c8275",
                          marginLeft: 6,
                        }}
                      >
                        {pkg.status === "active" ? "AKTİF" : "PASİF"}
                      </span>
                    </div>
                    <div style={{ fontSize: 12, color: "#6f6558", marginTop: 2 }}>
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
                        padding: "6px 12px",
                        background: "transparent",
                        border: "1px solid #2f5fa0",
                        color: "#2f5fa0",
                        borderRadius: 4,
                        fontSize: 11.5,
                        cursor: "pointer",
                      }}
                    >
                      Düzenle
                    </button>
                    <button
                      onClick={() => toggleStatus(pkg)}
                      style={{
                        padding: "6px 12px",
                        background: "transparent",
                        border: "1px solid #835d3e",
                        color: "#835d3e",
                        borderRadius: 4,
                        fontSize: 11.5,
                        cursor: "pointer",
                      }}
                    >
                      {pkg.status === "active" ? "Pasifleştir" : "Aktifleştir"}
                    </button>
                    <button
                      onClick={() => handleDelete(pkg.id, pkg.title)}
                      style={{
                        padding: "6px 12px",
                        background: "transparent",
                        border: "1px solid #a64022",
                        color: "#a64022",
                        borderRadius: 4,
                        fontSize: 11.5,
                        cursor: "pointer",
                      }}
                    >
                      Sil
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
    </AdminShell>
  );
}

function StatCard({ label, value }: { label: string; value: number }) {
  return (
    <div
      style={{
        background: "#fff",
        borderRadius: 8,
        padding: 18,
        textAlign: "center",
        boxShadow: "0 1px 3px rgba(28,20,16,0.06)",
      }}
    >
      <div style={{ fontSize: 26, fontWeight: 700, fontFamily: "Georgia, serif" }}>{value}</div>
      <div style={{ fontSize: 11.5, color: "#8c8275", marginTop: 4, letterSpacing: "0.04em" }}>
        {label.toUpperCase()}
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

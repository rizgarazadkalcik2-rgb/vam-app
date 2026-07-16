"use client";

import { useState } from "react";
import type { VamReservation } from "@/lib/reservations";
import type { SessionPayload } from "@/lib/session";
import AdminShell from "../AdminShell";

const RESERVATION_STATUS_LABELS: Record<string, { label: string; color: string }> = {
  new: { label: "Yeni", color: "#2f5fa0" },
  confirmed: { label: "Onaylandı", color: "#2a7a50" },
  cancelled: { label: "İptal Edildi", color: "#a64022" },
};

const PAYMENT_STATUS_LABELS: Record<string, { label: string; color: string }> = {
  pending: { label: "Ödeme Bekliyor", color: "#835d3e" },
  paid: { label: "Ödendi", color: "#2a7a50" },
  refunded: { label: "İade Edildi", color: "#a64022" },
};

export default function ReservationsPanel({
  session,
  initialReservations,
}: {
  session: SessionPayload;
  initialReservations: VamReservation[];
}) {
  const [reservations, setReservations] = useState(initialReservations);
  const [filter, setFilter] = useState<string>("all");

  async function refresh() {
    const res = await fetch("/api/reservations");
    const data = await res.json();
    if (res.ok) setReservations(data.reservations);
  }

  async function updateStatus(id: number, field: "reservationStatus" | "paymentStatus", value: string) {
    try {
      const res = await fetch(`/api/reservations/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ [field]: value }),
      });
      if (res.ok) {
        await refresh();
      } else {
        const data = await res.json().catch(() => null);
        alert(data?.error || "Durum güncellenemedi.");
      }
    } catch {
      alert("Durum güncellenemedi. Bağlantınızı kontrol edip tekrar deneyin.");
    }
  }

  const filtered =
    filter === "all"
      ? reservations
      : reservations.filter((r) => r.reservation_status === filter);

  const counts = {
    all: reservations.length,
    new: reservations.filter((r) => r.reservation_status === "new").length,
    confirmed: reservations.filter((r) => r.reservation_status === "confirmed").length,
    cancelled: reservations.filter((r) => r.reservation_status === "cancelled").length,
  };

  return (
    <AdminShell
      title="Rezervasyonlar"
      subtitle="Gelen rezervasyon taleplerini takip edin ve durumlarını güncelleyin"
      displayName={session.displayName}
      role="admin"
    >

        <div style={{ display: "flex", gap: 8, marginBottom: 20, flexWrap: "wrap" }}>
          <FilterChip label={`Tümü (${counts.all})`} active={filter === "all"} onClick={() => setFilter("all")} />
          <FilterChip label={`Yeni (${counts.new})`} active={filter === "new"} onClick={() => setFilter("new")} />
          <FilterChip
            label={`Onaylandı (${counts.confirmed})`}
            active={filter === "confirmed"}
            onClick={() => setFilter("confirmed")}
          />
          <FilterChip
            label={`İptal (${counts.cancelled})`}
            active={filter === "cancelled"}
            onClick={() => setFilter("cancelled")}
          />
        </div>

        {filtered.length === 0 && (
          <div style={{ color: "#8c8275", fontSize: 13 }}>Bu filtrede rezervasyon yok.</div>
        )}

        <div style={{ display: "grid", gap: 10 }}>
          {filtered.map((r) => {
            const resStatus = RESERVATION_STATUS_LABELS[r.reservation_status] || RESERVATION_STATUS_LABELS.new;
            const payStatus = PAYMENT_STATUS_LABELS[r.payment_status] || PAYMENT_STATUS_LABELS.pending;
            return (
              <div
                key={r.id}
                style={{
                  background: "#fff",
                  borderRadius: 8,
                  padding: 18,
                  boxShadow: "0 1px 3px rgba(28,20,16,0.06)",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    flexWrap: "wrap",
                    gap: 10,
                    marginBottom: 10,
                  }}
                >
                  <div>
                    <div style={{ fontWeight: 700, fontSize: 14 }}>{r.package_title}</div>
                    <div style={{ fontSize: 12, color: "#6f6558", marginTop: 2 }}>
                      {r.partner_name} · {new Date(r.created_at).toLocaleDateString("tr-TR")}
                    </div>
                  </div>
                  <div style={{ display: "flex", gap: 6 }}>
                    <Badge label={resStatus.label} color={resStatus.color} />
                    <Badge label={payStatus.label} color={payStatus.color} />
                  </div>
                </div>

                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
                    gap: 10,
                    fontSize: 12.5,
                    color: "#433d33",
                    marginBottom: 14,
                    paddingTop: 10,
                    borderTop: "1px solid #f0e8d8",
                  }}
                >
                  <div>
                    <div style={{ color: "#a27450", fontSize: 10.5, marginBottom: 2 }}>MÜŞTERİ</div>
                    {r.customer_name}
                  </div>
                  <div>
                    <div style={{ color: "#a27450", fontSize: 10.5, marginBottom: 2 }}>E-POSTA</div>
                    {r.customer_email}
                  </div>
                  <div>
                    <div style={{ color: "#a27450", fontSize: 10.5, marginBottom: 2 }}>TELEFON</div>
                    {r.customer_phone || "—"}
                  </div>
                  <div>
                    <div style={{ color: "#a27450", fontSize: 10.5, marginBottom: 2 }}>TARİH</div>
                    {r.travel_date ? new Date(r.travel_date).toLocaleDateString("tr-TR") : "Belirtilmedi"}
                  </div>
                  <div>
                    <div style={{ color: "#a27450", fontSize: 10.5, marginBottom: 2 }}>KİŞİ</div>
                    {r.guest_count}
                  </div>
                  <div>
                    <div style={{ color: "#a27450", fontSize: 10.5, marginBottom: 2 }}>TUTAR</div>
                    ₺{Number(r.total_price).toLocaleString("tr-TR")}
                  </div>
                </div>

                {r.notes && (
                  <div
                    style={{
                      fontSize: 12.5,
                      color: "#6f6558",
                      background: "#f6f0e4",
                      padding: 10,
                      borderRadius: 4,
                      marginBottom: 14,
                    }}
                  >
                    {r.notes}
                  </div>
                )}

                <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                  {r.reservation_status !== "confirmed" && (
                    <ActionButton
                      label="Onayla"
                      color="#2a7a50"
                      onClick={() => updateStatus(r.id, "reservationStatus", "confirmed")}
                    />
                  )}
                  {r.reservation_status !== "cancelled" && (
                    <ActionButton
                      label="İptal Et"
                      color="#a64022"
                      onClick={() => updateStatus(r.id, "reservationStatus", "cancelled")}
                    />
                  )}
                  {r.payment_status !== "paid" && (
                    <ActionButton
                      label="Ödendi İşaretle"
                      color="#2f5fa0"
                      onClick={() => updateStatus(r.id, "paymentStatus", "paid")}
                    />
                  )}
                  {r.payment_status === "paid" && (
                    <ActionButton
                      label="İade Edildi İşaretle"
                      color="#835d3e"
                      onClick={() => updateStatus(r.id, "paymentStatus", "refunded")}
                    />
                  )}
                </div>
              </div>
            );
          })}
        </div>
    </AdminShell>
  );
}

function FilterChip({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      style={{
        padding: "7px 16px",
        borderRadius: 9999,
        fontSize: 12,
        fontWeight: 600,
        border: active ? "1px solid #c4522a" : "1px solid #e5d6bc",
        background: active ? "#c4522a" : "#fff",
        color: active ? "#fff" : "#664932",
        cursor: "pointer",
      }}
    >
      {label}
    </button>
  );
}

function Badge({ label, color }: { label: string; color: string }) {
  return (
    <span
      style={{
        fontSize: 10.5,
        fontWeight: 700,
        color,
        border: `1px solid ${color}`,
        borderRadius: 4,
        padding: "3px 8px",
        whiteSpace: "nowrap",
      }}
    >
      {label}
    </span>
  );
}

function ActionButton({ label, color, onClick }: { label: string; color: string; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      style={{
        padding: "6px 14px",
        background: "transparent",
        border: `1px solid ${color}`,
        color,
        borderRadius: 4,
        fontSize: 11.5,
        cursor: "pointer",
      }}
    >
      {label}
    </button>
  );
}

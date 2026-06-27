"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { VamPackage } from "@/lib/packages";
import type { SessionPayload } from "@/lib/session";

export default function AdminPanel({
  session,
  initialPackages,
}: {
  session: SessionPayload;
  initialPackages: VamPackage[];
}) {
  const router = useRouter();
  const [packages, setPackages] = useState(initialPackages);

  async function handleLogout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/giris");
    router.refresh();
  }

  async function refresh() {
    const res = await fetch("/api/packages");
    const data = await res.json();
    if (res.ok) setPackages(data.packages);
  }

  async function handleDelete(id: number) {
    if (!confirm("Bu paketi silmek istediğinize emin misiniz?")) return;
    const res = await fetch(`/api/packages/${id}`, { method: "DELETE" });
    if (res.ok) await refresh();
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

  const partnerGroups = packages.reduce<Record<string, VamPackage[]>>((acc, p) => {
    (acc[p.partner_name] ||= []).push(p);
    return acc;
  }, {});

  return (
    <div style={{ minHeight: "100vh", background: "#f6f0e4", padding: "32px 20px" }}>
      <div style={{ maxWidth: 920, margin: "0 auto" }}>
        <header
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 28,
          }}
        >
          <div>
            <div style={{ fontFamily: "Georgia, serif", fontSize: 22, fontWeight: 700 }}>
              Yönetici Paneli
            </div>
            <div style={{ fontSize: 13, color: "#6f6558" }}>{session.displayName}</div>
          </div>
          <button
            onClick={handleLogout}
            style={{
              padding: "8px 16px",
              background: "transparent",
              border: "1px solid #c4522a",
              color: "#c4522a",
              borderRadius: 4,
              fontSize: 12.5,
              cursor: "pointer",
            }}
          >
            Çıkış Yap
          </button>
        </header>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 12,
            marginBottom: 28,
          }}
        >
          <StatCard label="Toplam Paket" value={packages.length} />
          <StatCard label="Aktif Paket" value={packages.filter((p) => p.status === "active").length} />
          <StatCard label="Acente Sayısı" value={Object.keys(partnerGroups).length} />
        </div>

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
                    boxShadow: "0 1px 3px rgba(28,20,16,0.06)",
                    opacity: pkg.status === "active" ? 1 : 0.55,
                  }}
                >
                  <div>
                    <div style={{ fontWeight: 600, fontSize: 13.5 }}>
                      {pkg.title}{" "}
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
                  </div>
                  <div style={{ display: "flex", gap: 8 }}>
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
                      onClick={() => handleDelete(pkg.id)}
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
      </div>
    </div>
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

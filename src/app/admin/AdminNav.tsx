"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const TABS = [
  { href: "/admin", label: "Paketler" },
  { href: "/admin/acenteler", label: "Acenteler" },
];

export default function AdminNav({ displayName }: { displayName: string }) {
  const pathname = usePathname();
  const router = useRouter();

  async function handleLogout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/giris");
    router.refresh();
  }

  return (
    <header
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 28,
        flexWrap: "wrap",
        gap: 16,
      }}
    >
      <div>
        <div style={{ fontFamily: "Georgia, serif", fontSize: 22, fontWeight: 700 }}>
          Yönetici Paneli
        </div>
        <div style={{ fontSize: 13, color: "#6f6558" }}>{displayName}</div>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <nav style={{ display: "flex", gap: 4, background: "#fff", borderRadius: 6, padding: 4 }}>
          {TABS.map((tab) => {
            const active = pathname === tab.href;
            return (
              <Link
                key={tab.href}
                href={tab.href}
                style={{
                  padding: "8px 16px",
                  borderRadius: 4,
                  fontSize: 13,
                  fontWeight: 600,
                  textDecoration: "none",
                  color: active ? "#fff" : "#664932",
                  background: active ? "#c4522a" : "transparent",
                  transition: "background 120ms ease",
                }}
              >
                {tab.label}
              </Link>
            );
          })}
        </nav>
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
      </div>
    </header>
  );
}

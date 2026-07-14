"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function GirisPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Giriş başarısız.");
        setLoading(false);
        return;
      }
      router.push(data.redirect);
      router.refresh();
    } catch {
      setError("Bir hata oluştu. Lütfen tekrar deneyin.");
      setLoading(false);
    }
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#0d0906",
        padding: 20,
      }}
    >
      <form
        onSubmit={handleSubmit}
        style={{
          width: "100%",
          maxWidth: 380,
          background: "#1c1a16",
          border: "1px solid rgba(255,255,255,0.08)",
          borderRadius: 8,
          padding: 36,
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginBottom: 8,
          }}
        >
          <Image src="/logo/vam-logo-for-dark-bg.png" alt="VAM" width={1592} height={988} style={{ height: 56, width: "auto", display: "block" }} priority />
        </div>
        <div
          style={{
            fontSize: 12,
            color: "rgba(246,240,228,0.5)",
            textAlign: "center",
            marginBottom: 28,
            letterSpacing: "0.05em",
          }}
        >
          Yönetici / Acente Girişi
        </div>

        <label style={{ display: "block", marginBottom: 16 }}>
          <span
            style={{
              display: "block",
              fontSize: 11,
              color: "rgba(246,240,228,0.6)",
              marginBottom: 6,
              letterSpacing: "0.05em",
            }}
          >
            KULLANICI ADI
          </span>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            autoFocus
            style={{
              width: "100%",
              padding: "10px 12px",
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.12)",
              borderRadius: 4,
              color: "#fff",
              fontSize: 14,
              outline: "none",
            }}
          />
        </label>

        <label style={{ display: "block", marginBottom: 22 }}>
          <span
            style={{
              display: "block",
              fontSize: 11,
              color: "rgba(246,240,228,0.6)",
              marginBottom: 6,
              letterSpacing: "0.05em",
            }}
          >
            ŞİFRE
          </span>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{
              width: "100%",
              padding: "10px 12px",
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.12)",
              borderRadius: 4,
              color: "#fff",
              fontSize: 14,
              outline: "none",
            }}
          />
        </label>

        {error && (
          <div
            role="alert"
            aria-live="assertive"
            style={{
              background: "rgba(196,82,42,0.15)",
              border: "1px solid rgba(196,82,42,0.4)",
              color: "#e8a98c",
              fontSize: 12.5,
              borderRadius: 4,
              padding: "8px 12px",
              marginBottom: 16,
            }}
          >
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          style={{
            width: "100%",
            padding: "11px 0",
            background: loading ? "#a64022" : "#c4522a",
            color: "#fff",
            border: "none",
            borderRadius: 4,
            fontSize: 13,
            fontWeight: 700,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            cursor: loading ? "default" : "pointer",
          }}
        >
          {loading ? "Giriş yapılıyor..." : "Giriş Yap"}
        </button>
      </form>
    </div>
  );
}

"use client";

import { useEffect } from "react";

/**
 * Catches errors thrown by the ROOT layout itself (layout.tsx) — a case
 * error.tsx cannot cover, since error.tsx only wraps its layout's children.
 * Must render its own <html>/<body>: this replaces the entire root layout
 * when active, so it stays self-contained (no dictionary/cookie lookups,
 * no dependency on layout.tsx having rendered successfully).
 */
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("[global-error.tsx]", error);
  }, [error]);

  return (
    <html lang="tr">
      <body>
        <div
          style={{
            minHeight: "100vh",
            background: "#0d0c0a",
            color: "#f3ede1",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "60px 24px",
            textAlign: "center",
            fontFamily: "system-ui, sans-serif",
          }}
        >
          <div style={{ maxWidth: 480 }}>
            <div
              style={{
                fontSize: 11,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "#c4522a",
                marginBottom: 14,
              }}
            >
              VAM — Beklenmeyen Hata
            </div>
            <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 14 }}>
              Bir şeyler ters gitti
            </h1>
            <p style={{ fontSize: 14.5, lineHeight: 1.7, color: "rgba(243,237,225,0.72)", marginBottom: 30 }}>
              Beklenmedik bir sorun oluştu. Lütfen sayfayı yenileyin.
            </p>
            <button
              onClick={() => reset()}
              style={{
                padding: "11px 26px",
                background: "#c4522a",
                color: "#fff",
                border: "none",
                borderRadius: 4,
                fontSize: 13,
                fontWeight: 600,
                cursor: "pointer",
                fontFamily: "inherit",
              }}
            >
              Tekrar Dene
            </button>
          </div>
        </div>
      </body>
    </html>
  );
}

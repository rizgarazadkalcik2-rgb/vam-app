"use client";

import { useEffect, useState } from "react";
import { t, type Lang } from "@/lib/dictionary";

/**
 * Catches errors thrown by the ROOT layout itself (layout.tsx) — a case
 * error.tsx cannot cover, since error.tsx only wraps its layout's children.
 * Must render its own <html>/<body>: this replaces the entire root layout
 * when active. dictionary.ts is a plain data module (no layout.tsx
 * dependency) and the language cookie is read client-side in useEffect,
 * exactly like error.tsx — so this can still be localized safely.
 */
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const [lang, setLang] = useState<Lang>("TR");

  useEffect(() => {
    const m = document.cookie.match(/(?:^|;\s*)vam_lang=(DE|EN|KU|CKB|TR)/);
    if (m) setLang(m[1] as Lang);
    console.error("[global-error.tsx]", error);
  }, [error]);

  return (
    <html lang={lang.toLowerCase()} dir={lang === "CKB" ? "rtl" : "ltr"}>
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
            fontFamily: lang === "CKB" ? "'Vazirmatn', system-ui, sans-serif" : "system-ui, sans-serif",
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
              VAM — {t("err_eyebrow", lang)}
            </div>
            <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 14 }}>
              {t("err_title", lang)}
            </h1>
            <p style={{ fontSize: 14.5, lineHeight: 1.7, color: "rgba(243,237,225,0.72)", marginBottom: 30 }}>
              {t("err_body", lang)}
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
              {t("err_retry", lang)}
            </button>
          </div>
        </div>
      </body>
    </html>
  );
}

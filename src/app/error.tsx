"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { t, type Lang } from "@/lib/dictionary";

/**
 * Branded error page (replaces Next.js's default unbranded error screen)
 * for any unhandled exception thrown by a page or nested layout — e.g. a
 * temporary DB outage. Client component: error boundaries always are, so
 * we read the vam_lang cookie in the browser instead of via next/headers.
 */
export default function ErrorPage({
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
    console.error("[error.tsx]", error);
  }, [error]);

  return (
    <div
      dir={lang === "CKB" ? "rtl" : "ltr"}
      style={{
        minHeight: "100vh",
        background:
          "radial-gradient(1200px 500px at 50% -10%, rgba(232,188,68,0.10), transparent 60%), #0d0c0a",
        color: "#f3ede1",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "60px 24px",
        textAlign: "center",
        fontFamily: lang === "CKB" ? "'Vazirmatn', system-ui, sans-serif" : "'Outfit', system-ui, sans-serif",
      }}
    >
      <div style={{ maxWidth: 560 }}>
        <div
          style={{
            fontFamily: "'Cinzel', 'Cormorant Garamond', Georgia, serif",
            fontSize: 90,
            lineHeight: 1,
            fontWeight: 600,
            color: "rgba(196,82,42,0.35)",
            marginBottom: 18,
          }}
        >
          !
        </div>
        <div
          style={{
            fontSize: 11,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "#c4522a",
            marginBottom: 14,
          }}
        >
          {t("err_eyebrow", lang)}
        </div>
        <h1
          style={{
            fontFamily: lang === "CKB" ? "'Vazirmatn', Georgia, serif" : "'Cormorant Garamond', Georgia, serif",
            fontSize: 34,
            fontWeight: 700,
            lineHeight: 1.15,
            marginBottom: 14,
          }}
        >
          {t("err_title", lang)}
        </h1>
        <p
          style={{
            fontSize: 14.5,
            lineHeight: 1.7,
            color: "rgba(243,237,225,0.72)",
            marginBottom: 30,
          }}
        >
          {t("err_body", lang)}
        </p>
        <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
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
          <Link
            href="/"
            prefetch={false}
            style={{
              padding: "11px 26px",
              border: "1px solid rgba(232,188,68,0.45)",
              color: "#e8bc44",
              borderRadius: 4,
              fontSize: 13,
              fontWeight: 600,
              textDecoration: "none",
            }}
          >
            {t("err_home", lang)}
          </Link>
        </div>
      </div>
    </div>
  );
}

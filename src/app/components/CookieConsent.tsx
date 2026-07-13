"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { t } from "@/lib/dictionary";
import type { Lang } from "@/lib/dictionary";

const COOKIE_MAX_AGE = 60 * 60 * 24 * 365; // 1 yıl

export default function CookieConsent({ initialConsent, lang }: { initialConsent: string | undefined; lang: Lang }) {
  const router = useRouter();
  const [visible, setVisible] = useState(initialConsent !== "accepted" && initialConsent !== "rejected");

  function respond(choice: "accepted" | "rejected") {
    document.cookie = `vam_consent=${choice};path=/;max-age=${COOKIE_MAX_AGE};SameSite=Lax`;
    setVisible(false);
    router.refresh();
  }

  if (!visible) return null;

  return (
    <div
      role="region"
      aria-label={t("cookie_consent_text", lang)}
      style={{
        position: "fixed",
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 9999,
        background: "#0d0c0a",
        borderTop: "1px solid rgba(232,188,68,0.25)",
        padding: "16px 20px",
        display: "flex",
        flexWrap: "wrap",
        alignItems: "center",
        justifyContent: "center",
        gap: 16,
        fontFamily: "'Outfit', system-ui, sans-serif",
      }}
    >
      <p style={{ margin: 0, color: "#f3ede1", fontSize: 13, lineHeight: 1.6, maxWidth: 560, flex: "1 1 320px" }}>
        {t("cookie_consent_text", lang)}{" "}
        <a href="/gizlilik-politikasi" style={{ color: "#e8bc44", textDecoration: "underline" }}>
          {t("footer_privacy", lang)}
        </a>
      </p>
      <div style={{ display: "flex", gap: 10, flexShrink: 0 }}>
        <button
          type="button"
          onClick={() => respond("rejected")}
          style={{
            padding: "9px 18px",
            background: "transparent",
            border: "1px solid rgba(243,237,225,0.3)",
            color: "rgba(243,237,225,0.85)",
            borderRadius: 4,
            fontSize: 13,
            fontWeight: 600,
            cursor: "pointer",
          }}
        >
          {t("cookie_consent_reject", lang)}
        </button>
        <button
          type="button"
          onClick={() => respond("accepted")}
          style={{
            padding: "9px 18px",
            background: "#c4522a",
            border: "none",
            color: "#fff",
            borderRadius: 4,
            fontSize: 13,
            fontWeight: 600,
            cursor: "pointer",
          }}
        >
          {t("cookie_consent_accept", lang)}
        </button>
      </div>
    </div>
  );
}

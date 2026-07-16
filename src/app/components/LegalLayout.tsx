import Link from "next/link";
import Image from "next/image";
import { t, type Lang } from "@/lib/dictionary";

// Intl.DateTimeFormat her zaman "en yakın desteklenen locale"ye düşer, asla
// fırlatmaz — ku/ckb için de doğru ay adı ve rakamlarla biçimlendiriyor.
const LEGAL_DATE_LOCALES: Record<Lang, string> = {
  TR: "tr-TR",
  DE: "de-DE",
  EN: "en-US",
  KU: "ku",
  CKB: "ckb",
};

function formatLegalDate(isoDate: string, lang: Lang): string {
  try {
    return new Intl.DateTimeFormat(LEGAL_DATE_LOCALES[lang], {
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(new Date(isoDate));
  } catch {
    return isoDate;
  }
}

export default function LegalLayout({
  title,
  updatedDate,
  children,
  lang = "TR",
}: {
  title: string;
  /** ISO tarih (örn. "2026-06-28") — dile göre biçimlendirilir, hardcoded Türkçe tarih string'i DEĞİL. */
  updatedDate: string;
  children: React.ReactNode;
  lang?: Lang;
}) {
  const rtl = lang === "CKB";
  return (
    <div dir={rtl ? "rtl" : "ltr"} style={{ minHeight: "100vh", background: "#f6f0e4", fontFamily: rtl ? "Vazirmatn, Georgia, serif" : undefined }}>
      {/* Basit header */}
      <header
        style={{
          background: "#15110b",
          padding: "20px 24px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Link
          href="/"
          prefetch={false}
          style={{
            display: "flex",
            alignItems: "center",
            textDecoration: "none",
          }}
        >
          <Image src="/logo/vam-logo-for-dark-bg.png" alt="VAM" width={1592} height={988} style={{ height: 56, width: "auto", display: "block" }} />
        </Link>
        <Link
          href="/"
          prefetch={false}
          style={{
            fontSize: 13,
            color: "rgba(246,240,228,0.7)",
            textDecoration: "none",
          }}
        >
          {rtl ? `→ ${t("rez_back_home", lang)}` : `← ${t("rez_back_home", lang)}`}
        </Link>
      </header>

      <main
        style={{
          maxWidth: 760,
          margin: "0 auto",
          padding: "56px 24px 96px",
        }}
      >
        <h1
          style={{
            fontFamily: rtl ? "Vazirmatn, Georgia, serif" : "Georgia, serif",
            fontSize: 32,
            fontWeight: 700,
            color: "#1c1a16",
            marginBottom: 8,
          }}
        >
          {title}
        </h1>
        <p style={{ fontSize: 13, color: "#8c8275", marginBottom: 40 }}>
          {t("legal_last_updated", lang)}: {formatLegalDate(updatedDate, lang)}
        </p>

        <div
          style={{
            fontSize: 15.5,
            lineHeight: 1.75,
            color: "#3a352c",
          }}
          className="legal-content"
        >
          {children}
        </div>
      </main>

      <style>{`
        .legal-content h2 {
          font-family: Georgia, serif;
          font-size: 21px;
          font-weight: 700;
          color: #1c1a16;
          margin-top: 36px;
          margin-bottom: 12px;
        }
        .legal-content h3 {
          font-size: 16.5px;
          font-weight: 700;
          color: #1c1a16;
          margin-top: 24px;
          margin-bottom: 8px;
        }
        .legal-content p {
          margin-bottom: 14px;
        }
        .legal-content ul, .legal-content ol {
          margin-bottom: 14px;
          padding-left: 22px;
        }
        .legal-content li {
          margin-bottom: 6px;
        }
        .legal-content strong {
          color: #1c1a16;
        }
        .legal-content a {
          color: #c4522a;
        }
        .placeholder {
          background: rgba(196,82,42,0.12);
          color: #a64022;
          padding: 1px 6px;
          border-radius: 3px;
          font-size: 0.92em;
        }
        [dir="rtl"] .legal-content h2 {
          font-family: Vazirmatn, Georgia, serif;
        }
        [dir="rtl"] .legal-content ul, [dir="rtl"] .legal-content ol {
          padding-left: 0;
          padding-right: 22px;
        }
      `}</style>
    </div>
  );
}

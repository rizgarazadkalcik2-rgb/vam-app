import Link from "next/link";

export default function LegalLayout({
  title,
  updatedDate,
  children,
}: {
  title: string;
  updatedDate: string;
  children: React.ReactNode;
}) {
  return (
    <div style={{ minHeight: "100vh", background: "#f6f0e4" }}>
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
          href="/platform"
          style={{
            display: "flex",
            alignItems: "center",
            textDecoration: "none",
          }}
        >
          <img src="/logo/vam-logo-for-dark-bg.png" alt="VAM" style={{ height: 40, display: "block" }} />
        </Link>
        <Link
          href="/platform"
          style={{
            fontSize: 13,
            color: "rgba(246,240,228,0.7)",
            textDecoration: "none",
          }}
        >
          ← Ana Sayfaya Dön
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
            fontFamily: "Georgia, serif",
            fontSize: 32,
            fontWeight: 700,
            color: "#1c1a16",
            marginBottom: 8,
          }}
        >
          {title}
        </h1>
        <p style={{ fontSize: 13, color: "#8c8275", marginBottom: 40 }}>
          Son güncelleme: {updatedDate}
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
      `}</style>
    </div>
  );
}

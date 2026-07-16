"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { localizeBundle, type VamBundle } from "@/lib/bundles";
import { chip, t, type Lang } from "@/lib/dictionary";
import { formatPrice, type Currency } from "@/lib/currency";
import SmartImage from "@/app/components/SmartImage";

const EXP_TYPES = ["Tümü", "Arkeoloji", "Tarih", "Doğa", "Kültür", "Gastronomi"];

// Basit eşleştirme: bundle destinasyon ismi → deneyim tipi
const DEST_EXP_MAP: Record<string, string[]> = {
  "Göbeklitepe": ["Arkeoloji", "Tarih"],
  "Harran": ["Tarih", "Kültür"],
  "Mardin": ["Kültür", "Mimari"],
  "Van": ["Tarih", "Doğa"],
  "Diyarbakır": ["Tarih", "Kültür"],
  "Hasankeyf": ["Tarih", "Arkeoloji"],
  "Midyat": ["Kültür", "Mimari"],
  "Nemrut Dağı": ["Arkeoloji", "Tarih"],
  "Adıyaman": ["Tarih"],
  "Kahta": ["Tarih"],
};

function bundleMatchesExp(b: VamBundle, exp: string): boolean {
  if (exp === "Tümü") return true;
  return (b.destinations || []).some(d => (DEST_EXP_MAP[d] || []).includes(exp));
}

function bundleMatchesDest(b: VamBundle, dest: string): boolean {
  if (!dest || dest === "Tümü") return true;
  return (b.destinations || []).some(d =>
    d.toLowerCase().includes(dest.toLowerCase())
  );
}

export default function BundlesClient({
  bundles,
  initialDest,
  initialExp,
  initialGuests,
  initialDate,
  lang = "TR",
  currency = "TRY",
}: {
  bundles: VamBundle[];
  initialDest: string;
  initialExp: string;
  initialGuests: number;
  initialDate: string;
  lang?: Lang;
  currency?: Currency;
}) {
  const [filterDest, setFilterDest] = useState(initialDest || "Tümü");
  const [filterExp, setFilterExp]   = useState(initialExp  || "Tümü");

  const hasFilters = (filterDest && filterDest !== "Tümü") || (filterExp && filterExp !== "Tümü");

  const filtered = useMemo(() => {
    return bundles.filter(b =>
      bundleMatchesDest(b, filterDest) && bundleMatchesExp(b, filterExp)
    );
  }, [bundles, filterDest, filterExp]);

  const destOptions = useMemo(() => {
    const all = new Set<string>();
    bundles.forEach(b => (b.destinations || []).forEach(d => all.add(d)));
    return ["Tümü", ...Array.from(all).sort()];
  }, [bundles]);

  return (
    <>
      <div className="vc-pagehead">
        <div className="vc-eyebrow">{t("bundle_eyebrow", lang)}</div>
        <h1 className="vc-h1">{t("bundle_h1", lang)}</h1>
        <p className="vc-lede">
          {t("bundle_lede", lang)}
          {initialGuests > 0 && (
            <span style={{ marginInlineStart: 6, color: "var(--color-primary)", fontWeight: 600 }}>
              · {initialGuests} {t("bundle_guests_suffix", lang)}
            </span>
          )}
          {initialDate && (() => {
            // `new Date("YYYY-MM-01")` ISO string'i UTC gece yarısı olarak ayrıştırır;
            // UTC'nin batısındaki (ör. Amerika kıtası) ziyaretçilerde toLocaleDateString
            // bunu yerel saatte hep BİR ÖNCEKİ gün/ay olarak gösterir. Yıl/ay'ı
            // Date constructor'ına doğrudan (yerel bileşenler olarak) vererek bunu önlüyoruz.
            const [y, m] = initialDate.split("-").map(Number);
            const localDate = new Date(y, (m || 1) - 1, 1);
            return (
              <span style={{ marginInlineStart: 6, color: "var(--color-primary)", fontWeight: 600 }}>
                · {localDate.toLocaleDateString(lang === "DE" ? "de-DE" : lang === "EN" ? "en-US" : lang === "KU" ? "ku" : lang === "CKB" ? "ckb" : "tr-TR", { month: "long", year: "numeric" })}
              </span>
            );
          })()}
        </p>
      </div>

      {/* Filtre şeridi */}
      <div style={{
        maxWidth: 1100, margin: "0 auto", padding: "0 24px 20px",
        display: "flex", gap: 10, flexWrap: "wrap", alignItems: "center",
      }}>
        <span style={{ fontSize: 12, color: "var(--text-muted)", fontFamily: "var(--font-label)", letterSpacing: "0.1em", textTransform: "uppercase" }}>
          {t("bundle_label_destination", lang)}
        </span>
        {destOptions.map(d => (
          <button key={d}
            className={`vc-chip${filterDest === d ? " active" : ""}`}
            onClick={() => setFilterDest(d)}
            style={{ cursor: "pointer" }}>
            {chip(d, lang)}
          </button>
        ))}
        <span style={{ width: 1, height: 24, background: "var(--border-subtle)", margin: "0 4px" }} />
        <span style={{ fontSize: 12, color: "var(--text-muted)", fontFamily: "var(--font-label)", letterSpacing: "0.1em", textTransform: "uppercase" }}>
          {t("bundle_label_experience", lang)}
        </span>
        {EXP_TYPES.map(e => (
          <button key={e}
            className={`vc-chip${filterExp === e ? " active" : ""}`}
            onClick={() => setFilterExp(e)}
            style={{ cursor: "pointer" }}>
            {chip(e, lang)}
          </button>
        ))}
        {hasFilters && (
          <button
            onClick={() => { setFilterDest("Tümü"); setFilterExp("Tümü"); }}
            style={{ fontSize: 12, color: "var(--color-primary)", background: "none", border: "none", cursor: "pointer", padding: "0 4px" }}>
            {t("clear_filters", lang)}
          </button>
        )}
        <span style={{ marginInlineStart: "auto", fontSize: 12, color: "var(--text-muted)" }}>
          {filtered.length} {t("bundle_singular", lang)}
        </span>
      </div>

      {filtered.length === 0 ? (
        <div className="vc-empty">
          <div style={{ fontSize: 32, marginBottom: 12 }}>🔍</div>
          <div>{t("bundle_empty", lang)}</div>
          <button
            onClick={() => { setFilterDest("Tümü"); setFilterExp("Tümü"); }}
            style={{
              marginTop: 14, padding: "10px 20px", background: "var(--color-primary)",
              color: "#fff", border: "none", borderRadius: 6, fontSize: 13,
              cursor: "pointer", fontWeight: 600,
            }}>
            {t("bundle_show_all", lang)}
          </button>
        </div>
      ) : (
        <div className="vc-grid">
          {filtered.map((raw) => {
            const b = localizeBundle(raw, lang);
            return (
              <Link key={b.id} className="vc-card" href={`/bundles/${b.slug}`}>
                <div className="vc-card-media">
                  {b.image_url ? (
                    <SmartImage
                      src={b.image_url}
                      alt={b.title}
                      fill
                      sizes="(max-width: 600px) 100vw, (max-width: 900px) 50vw, 33vw"
                    />
                  ) : (
                    <span className="vc-card-letter">{b.title[0]}</span>
                  )}
                  <span className="vc-card-tag">{b.nights} {t("bundle_night", lang)}</span>
                  {b.badge && (
                    <span className="vc-card-tag vc-card-tag-gold" style={{ left: "auto", right: 10 }}>
                      {b.badge}
                    </span>
                  )}
                </div>
                <div className="vc-card-body">
                  <div className="vc-card-eyebrow">{t("bundle_card_eyebrow", lang)}</div>
                  <div className="vc-card-title">{b.title}</div>
                  <div className="vc-card-desc">{b.description}</div>
                  <div className="vc-card-tags">
                    {(b.destinations || []).map((dn) => (
                      <span key={dn} className="vc-card-pill">{dn}</span>
                    ))}
                  </div>
                  <div className="vc-card-price-row">
                    <span className="vc-price">{formatPrice(Number(b.price), currency)}</span>
                    {b.original_price && (
                      <span className="vc-price-old">
                        {formatPrice(Number(b.original_price), currency)}
                      </span>
                    )}
                    <span style={{ fontSize: 11, color: "var(--text-muted)" }}>{t("bundle_per_person", lang)}</span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </>
  );
}

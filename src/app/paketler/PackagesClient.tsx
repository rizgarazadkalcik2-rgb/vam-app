"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import type { VamPackage } from "@/lib/packages";
import { chip, t, type Lang } from "@/lib/dictionary";
import { formatPrice, type Currency } from "@/lib/currency";
import SmartImage from "@/app/components/SmartImage";

const EXP_TYPES = ["Tümü", "Arkeoloji", "Tarih", "Doğa", "Kültür", "Gastronomi"];

function packageMatchesDest(p: VamPackage, dest: string): boolean {
  if (!dest || dest === "Tümü") return true;
  return p.destination.trim().toLowerCase().includes(dest.trim().toLowerCase());
}

// Bundle'lardaki DEST_EXP_MAP tahmini eşleştirmesinin aksine burada gerçek
// bir alana bakılıyor — kategorisi olmayan paketler belirli bir kategori
// seçildiğinde sonuçtan çıkar (yanlış eşleşme göstermek yerine).
function packageMatchesExp(p: VamPackage, exp: string): boolean {
  if (!exp || exp === "Tümü") return true;
  return p.category === exp;
}

export default function PackagesClient({
  packages,
  initialDest,
  initialExp,
  initialGuests,
  initialDate,
  lang = "TR",
  currency = "TRY",
}: {
  packages: VamPackage[];
  initialDest: string;
  initialExp: string;
  initialGuests: number;
  initialDate: string;
  lang?: Lang;
  currency?: Currency;
}) {
  const [filterDest, setFilterDest] = useState(initialDest || "Tümü");
  const [filterExp, setFilterExp] = useState(initialExp || "Tümü");

  const hasFilters = (filterDest && filterDest !== "Tümü") || (filterExp && filterExp !== "Tümü");

  const filtered = useMemo(() => {
    return packages.filter((p) => packageMatchesDest(p, filterDest) && packageMatchesExp(p, filterExp));
  }, [packages, filterDest, filterExp]);

  const destOptions = useMemo(() => {
    const all = new Set<string>();
    packages.forEach((p) => {
      const d = p.destination.trim();
      if (d) all.add(d);
    });
    return ["Tümü", ...Array.from(all).sort()];
  }, [packages]);

  return (
    <>
      <div className="vc-pagehead">
        <div className="vc-eyebrow">{t("pkg_eyebrow", lang)}</div>
        <h1 className="vc-h1">{t("pkg_h1", lang)}</h1>
        <p className="vc-lede">
          {t("pkg_lede", lang)}
          {initialGuests > 0 && (
            <span style={{ marginInlineStart: 6, color: "var(--color-primary)", fontWeight: 600 }}>
              · {initialGuests} {t("bundle_guests_suffix", lang)}
            </span>
          )}
          {initialDate && (() => {
            // `new Date("YYYY-MM-01")` ISO string'i UTC gece yarısı olarak ayrıştırır;
            // UTC'nin batısındaki ziyaretçilerde toLocaleDateString bunu yerel saatte
            // bir önceki gün/ay gösterebilir — yıl/ay'ı Date constructor'ına yerel
            // bileşenler olarak vererek bunu önlüyoruz (BundlesClient ile aynı desen).
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
          {t("pkg_label_destination", lang)}
        </span>
        {destOptions.map((d) => (
          <button
            key={d}
            className={`vc-chip${filterDest === d ? " active" : ""}`}
            onClick={() => setFilterDest(d)}
            style={{ cursor: "pointer" }}
          >
            {chip(d, lang)}
          </button>
        ))}
        <span style={{ width: 1, height: 24, background: "var(--border-subtle)", margin: "0 4px" }} />
        <span style={{ fontSize: 12, color: "var(--text-muted)", fontFamily: "var(--font-label)", letterSpacing: "0.1em", textTransform: "uppercase" }}>
          {t("pkg_label_category", lang)}
        </span>
        {EXP_TYPES.map((e) => (
          <button
            key={e}
            className={`vc-chip${filterExp === e ? " active" : ""}`}
            onClick={() => setFilterExp(e)}
            style={{ cursor: "pointer" }}
          >
            {chip(e, lang)}
          </button>
        ))}
        {hasFilters && (
          <button
            onClick={() => { setFilterDest("Tümü"); setFilterExp("Tümü"); }}
            style={{ fontSize: 12, color: "var(--color-primary)", background: "none", border: "none", cursor: "pointer", padding: "0 4px" }}
          >
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
          <div>{t("pkg_empty", lang)}</div>
          <button
            onClick={() => { setFilterDest("Tümü"); setFilterExp("Tümü"); }}
            style={{
              marginTop: 14, padding: "10px 20px", background: "var(--color-primary)",
              color: "#fff", border: "none", borderRadius: 6, fontSize: 13,
              cursor: "pointer", fontWeight: 600,
            }}
          >
            {t("pkg_show_all", lang)}
          </button>
        </div>
      ) : (
        <div className="vc-grid">
          {filtered.map((pkg) => (
            <Link key={pkg.id} className="vc-card" href={`/rezervasyon/${pkg.id}`}>
              <div className="vc-card-media">
                {pkg.image_url ? (
                  <SmartImage
                    src={pkg.image_url}
                    alt={pkg.title}
                    fill
                    sizes="(max-width: 600px) 100vw, (max-width: 900px) 50vw, 33vw"
                  />
                ) : (
                  <span className="vc-card-letter">{pkg.title[0]}</span>
                )}
                <span className="vc-card-tag">{pkg.nights} {t("bundle_night", lang)}</span>
              </div>
              <div className="vc-card-body">
                <div className="vc-card-eyebrow">{t("pkg_card_eyebrow", lang)}</div>
                <div className="vc-card-title">{pkg.title}</div>
                <div className="vc-card-desc">{pkg.description}</div>
                <div className="vc-card-tags">
                  <span className="vc-card-pill">{pkg.destination}</span>
                </div>
                <div className="vc-card-price-row">
                  <span className="vc-price">{formatPrice(Number(pkg.price_try), currency)}</span>
                  <span style={{ fontSize: 11, color: "var(--text-muted)" }}>{t("bundle_per_person", lang)}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </>
  );
}

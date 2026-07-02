"use client";

import { useMemo, useState } from "react";
import type { VamDestination } from "@/lib/destinations";
import { chip, t, type Lang } from "@/lib/dictionary";

const FILTERS = ["Tümü", "Arkeoloji", "Tarih", "Doğa", "Kültür", "Mimari"];

export default function DestinationsGrid({
  destinations,
  lang = "TR",
}: {
  destinations: VamDestination[];
  lang?: Lang;
}) {
  const [activeFilter, setActiveFilter] = useState("Tümü");

  const filtered = useMemo(() => {
    if (activeFilter === "Tümü") return destinations;
    return destinations.filter((d) => (d.tags || []).includes(activeFilter));
  }, [destinations, activeFilter]);

  return (
    <>
      <div className="vc-filter-row">
        {FILTERS.map((f) => (
          <button
            key={f}
            className={`vc-chip${activeFilter === f ? " active" : ""}`}
            onClick={() => setActiveFilter(f)}
            style={{ cursor: "pointer" }}
          >
            {chip(f, lang)}
          </button>
        ))}
        <span style={{ marginLeft: "auto", fontSize: 12, color: "var(--text-muted)" }}>
          {filtered.length} {t("destination_singular", lang)}
        </span>
      </div>

      {filtered.length === 0 ? (
        <div className="vc-empty">{t("dest_empty", lang)}</div>
      ) : (
        <div className="vc-grid">
          {filtered.map((d, i) => (
            <a key={d.id} className="vc-card" href={`/destinations/${d.slug}`}>
              <div className="vc-card-media">
                {d.image_url ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={d.image_url} alt={d.name} />
                ) : (
                  <span className="vc-card-letter">{d.name[0]}</span>
                )}
                <span className="vc-card-tag">{d.region}</span>
                {d.unesco && <span className="vc-card-tag vc-card-tag-gold" style={{ left: "auto", right: 10 }}>UNESCO</span>}
              </div>
              <div className="vc-card-body">
                <div className="vc-card-eyebrow">{(d.tags || [])[0] || t("dest_card_eyebrow_fallback", lang)}</div>
                <div className="vc-card-title">{d.name}</div>
                <div className="vc-card-desc">
                  {(d.history && d.history[0]) ? d.history[0].slice(0, 110) + "…" : ""}
                </div>
                <div className="vc-card-meta">{d.era_display || d.era}</div>
              </div>
            </a>
          ))}
        </div>
      )}
    </>
  );
}

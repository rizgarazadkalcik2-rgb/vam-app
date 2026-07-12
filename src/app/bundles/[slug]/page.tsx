import { notFound } from "next/navigation";
import { getBundleBySlug, listActiveBundles, localizeBundle } from "@/lib/bundles";
import VamNavbar from "@/app/components/VamNavbar";
import VamFooter from "@/app/components/VamFooter";
import { getLang } from "@/lib/i18n";
import { t } from "@/lib/dictionary";
import { formatPrice } from "@/lib/currency";
import { getCurrency } from "@/lib/getCurrency";
import { buildAlternates, canonicalForLang, getUrlLang } from "@/lib/hreflang";
import SmartImage from "@/app/components/SmartImage";
import "@/app/vam-content.css";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const [raw, lang] = await Promise.all([getBundleBySlug(slug), getLang()]);
  const urlLang = await getUrlLang();
  if (!raw || raw.status !== "active") return {};
  const b = localizeBundle(raw, lang);

  const description = (b.description || "").slice(0, 155);
  const path = `/bundles/${b.slug}`;

  return {
    title: b.title,
    description,
    alternates: { canonical: canonicalForLang(path, urlLang), languages: buildAlternates(path) },
    openGraph: {
      title: `${b.title} | VAM`,
      description,
      ...(b.image_url ? { images: [{ url: b.image_url }] } : {}),
    },
  };
}

export default async function BundleDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const [rawBundle, lang, currency] = await Promise.all([getBundleBySlug(slug), getLang(), getCurrency()]);
  if (!rawBundle || rawBundle.status !== "active") notFound();
  const b = localizeBundle(rawBundle, lang);

  const others = (await listActiveBundles()).filter((x) => x.slug !== b.slug).slice(0, 3).map((x) => localizeBundle(x, lang));

  const questionSubject = encodeURIComponent(`Soru – ${b.title}`);

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: t("breadcrumb_home", lang), item: "https://visitvam.com/" },
          { "@type": "ListItem", position: 2, name: t("all_bundles", lang), item: "https://visitvam.com/bundles" },
          { "@type": "ListItem", position: 3, name: b.title, item: `https://visitvam.com/bundles/${b.slug}` },
        ],
      },
      {
        "@type": "TouristTrip",
        name: b.title,
        description: b.description,
        ...(b.image_url ? { image: b.image_url } : {}),
        touristType: "Cultural tourism",
        offers: {
          "@type": "Offer",
          price: Number(b.price),
          priceCurrency: currency,
          url: `https://visitvam.com/bundles/${b.slug}`,
          availability: "https://schema.org/InStock",
        },
      },
    ],
  };

  return (
    <div className="vc-root">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <VamNavbar lang={lang} currency={currency} />

      <div className="vc-breadcrumb">
        <a href="/">{t("breadcrumb_home", lang)}</a> {t("breadcrumb_sep", lang)} <a href="/bundles">{t("all_bundles", lang)}</a> {t("breadcrumb_sep", lang)} {b.title}
      </div>

      <div className="vc-hero">
        {b.image_url ? (
          <SmartImage src={b.image_url} alt={b.title} fill sizes="100vw" />
        ) : (
          <div className="vc-hero-ph">
            <span className="vc-hero-letter">{b.title[0]}</span>
          </div>
        )}
        <div className="vc-hero-overlay" />
        <div className="vc-hero-content">
          <div className="vc-badges">
            <span className="vc-badge vc-badge-dark">{b.nights} {t("bundle_night", lang)}</span>
            {b.badge && <span className="vc-badge vc-badge-gold">{b.badge}</span>}
          </div>
          <h1 className="vc-hero-title">{b.title}</h1>
          <div className="vc-hero-meta">
            <span>⊙ {(b.destinations || []).join(" · ")}</span>
          </div>
        </div>
      </div>

      <div className="vc-layout">
        <main>
          <a className="vc-back" href="/bundles">
            {t("bundle_back", lang)}
          </a>
          <p className="vc-lead">{b.description}</p>

          <div className="vc-features">
            <div className="vc-section-label">{t("bundle_route_title", lang)}</div>
            <div className="vc-card-tags" style={{ marginBottom: 20 }}>
              {(b.destinations || []).map((dn) => (
                <span key={dn} className="vc-card-pill">
                  {dn}
                </span>
              ))}
            </div>

            <div className="vc-section-label">{t("bundle_includes_title", lang)}</div>
            <ul className="vc-checklist">
              {(b.includes || []).map((inc) => (
                <li key={inc}>{inc}</li>
              ))}
            </ul>
          </div>
        </main>

        <aside>
          <div className="vc-sidebar-card" id="booking-card">
            <div style={{ marginBottom: 16 }}>
              <span className="vc-price" style={{ fontSize: 28 }}>
                {formatPrice(Number(b.price), currency)}
              </span>
              {b.original_price && (
                <span className="vc-price-old" style={{ marginInlineStart: 8 }}>
                  {formatPrice(Number(b.original_price), currency)}
                </span>
              )}
              <div style={{ fontSize: 12, color: "var(--text-muted)" }}>{t("bundle_per_person", lang)}</div>
            </div>

            <div className="vc-info-row">
              <span>{t("bundle_duration_label", lang)}</span>
              <span>{b.nights} {t("bundle_night_day", lang)} / {b.nights + 1} {t("bundle_day", lang)}</span>
            </div>
            <div className="vc-info-row">
              <span>{t("bundle_destination_label", lang)}</span>
              <span>{(b.destinations || []).length} {t("bundle_point_suffix", lang)}</span>
            </div>

            <a
              className="vc-btn-cta"
              style={{ display: "block", textAlign: "center", marginTop: 18 }}
              href={`/rezervasyon/bundle/${b.id}`}
            >
              {t("bundle_book_now", lang)}
            </a>
            <a
              href={`mailto:info@visitvam.com?subject=${questionSubject}`}
              style={{
                display: "block",
                textAlign: "center",
                marginTop: 8,
                fontSize: 13,
                color: "var(--text-secondary)",
                padding: "10px 0",
              }}
            >
              {t("bundle_question_cta", lang)}
            </a>
            <p className="vc-note">
              {t("bundle_book_note", lang)}
            </p>
          </div>

          {others.length > 0 && (
            <div className="vc-sidebar-card">
              <div className="vc-section-label">{t("bundle_other_routes", lang)}</div>
              {others.map((o) => (
                <a key={o.slug} className="vc-related-card" href={`/bundles/${o.slug}`}>
                  {o.image_url ? (
                    <SmartImage className="vc-related-thumb" src={o.image_url} alt={o.title} width={52} height={52} />
                  ) : (
                    <div className="vc-related-thumb-ph">{o.title[0]}</div>
                  )}
                  <div>
                    <div className="vc-related-name">{o.title}</div>
                    <div className="vc-related-region">
                      {formatPrice(Number(o.price), currency)} · {o.nights} {t("bundle_night", lang)}
                    </div>
                  </div>
                </a>
              ))}
            </div>
          )}
        </aside>
      </div>

      <VamFooter lang={lang} />
    </div>
  );
}

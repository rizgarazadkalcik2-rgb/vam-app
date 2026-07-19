import { notFound } from "next/navigation";
import Link from "next/link";
import { getDestinationBySlug, listActiveDestinations, localizeDestination } from "@/lib/destinations";
import VamNavbar from "@/app/components/VamNavbar";
import VamFooter from "@/app/components/VamFooter";
import { getLang } from "@/lib/i18n";
import { getCurrency } from "@/lib/getCurrency";
import { chip, t } from "@/lib/dictionary";
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
  const [raw, lang] = await Promise.all([getDestinationBySlug(slug), getLang()]);
  const urlLang = await getUrlLang();
  if (!raw || raw.status !== "active") return {};
  const d = localizeDestination(raw, lang);

  const description =
    (d.history && d.history[0] ? d.history[0].slice(0, 155) : "") ||
    `${d.name} — ${d.region}. ${t("meta_site_desc", lang)}`.slice(0, 155);
  const path = `/destinations/${d.slug}`;

  return {
    title: `${d.name} — ${d.region}`,
    description,
    alternates: { canonical: canonicalForLang(path, urlLang), languages: buildAlternates(path) },
    openGraph: {
      title: `${d.name} — ${d.region} | VAM`,
      description,
      ...(d.image_url ? { images: [{ url: d.image_url, alt: d.name }] } : {}),
    },
  };
}

export default async function DestinationDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const [rawDest, lang, currency] = await Promise.all([getDestinationBySlug(slug), getLang(), getCurrency()]);
  if (!rawDest || rawDest.status !== "active") notFound();
  const d = localizeDestination(rawDest, lang);

  const allDests = await listActiveDestinations();
  const bySlug = new Map(allDests.map((x) => [x.slug, x]));
  const related = (d.related || [])
    .map((s) => bySlug.get(s))
    .filter(Boolean)
    .map((x) => localizeDestination(x!, lang));

  const history = d.history || [];
  const features = d.features || [];

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: t("breadcrumb_home", lang), item: "https://visitvam.com/" },
          { "@type": "ListItem", position: 2, name: t("all_destinations", lang), item: "https://visitvam.com/destinations" },
          { "@type": "ListItem", position: 3, name: d.name, item: `https://visitvam.com/destinations/${d.slug}` },
        ],
      },
      {
        "@type": "TouristAttraction",
        name: d.name,
        description: history[0] || d.name,
        ...(d.image_url ? { image: d.image_url } : {}),
        address: { "@type": "PostalAddress", addressRegion: d.region, addressCountry: "TR" },
        ...(d.latitude != null && d.longitude != null
          ? { geo: { "@type": "GeoCoordinates", latitude: d.latitude, longitude: d.longitude } }
          : {}),
        ...(d.rating ? { aggregateRating: { "@type": "AggregateRating", ratingValue: d.rating, reviewCount: d.reviews || 1 } } : {}),
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
        <Link href="/" prefetch={false}>{t("breadcrumb_home", lang)}</Link> {t("breadcrumb_sep", lang)} <Link href="/destinations">{t("all_destinations", lang)}</Link> {t("breadcrumb_sep", lang)} {d.name}
      </div>

      <div className="vc-hero">
        {d.image_url ? (
          <SmartImage src={d.image_url} alt={d.name} fill sizes="100vw" />
        ) : (
          <div className="vc-hero-ph">
            <span className="vc-hero-letter">{d.name[0]}</span>
          </div>
        )}
        <div className="vc-hero-overlay" />
        <div className="vc-hero-content">
          <div className="vc-badges">
            {(d.tags || []).map((tag) => (
              <span key={tag} className="vc-badge vc-badge-dark">
                {chip(tag, lang)}
              </span>
            ))}
            {d.unesco && <span className="vc-badge vc-badge-gold">UNESCO</span>}
          </div>
          <h1 className="vc-hero-title">{d.name}</h1>
          <div className="vc-hero-meta">
            <span>⊙ {d.region}</span>
            <span className="vc-dot" />
            <span style={{ color: "var(--gold-300)" }}>
              ★ {d.era_display || d.era} · {d.era_caption || t("dest_era_caption_fallback", lang)}
            </span>
          </div>
        </div>
      </div>

      <div className="vc-layout">
        <main>
          <Link className="vc-back" href="/destinations">
            {t("dest_back", lang)}
          </Link>
          {history[0] && <p className="vc-lead">{history[0]}</p>}
          {history.slice(1).map((p, i) => (
            <p key={i} className="vc-p">
              {p}
            </p>
          ))}

          {features.length > 0 && (
            <div className="vc-features">
              <h2 className="vc-section-label">{t("dest_features_title", lang)}</h2>
              {features.map((f, i) => (
                <div key={i} className="vc-feature">
                  <h3>{f.title}</h3>
                  <p>{f.body}</p>
                </div>
              ))}
            </div>
          )}
        </main>

        <aside>
          <div className="vc-sidebar-card">
            {d.rating && (
              <div className="vc-rating-row">
                <span className="vc-stars">★ {d.rating}</span>
                <span style={{ color: "var(--text-muted)" }}>({d.reviews || 0} {t("dest_reviews_suffix", lang)})</span>
              </div>
            )}
            {d.visit_location && (
              <div className="vc-info-row">
                <span>{t("dest_location", lang)}</span>
                <span>{d.visit_location}</span>
              </div>
            )}
            {d.visit_nearest_city && (
              <div className="vc-info-row">
                <span>{t("dest_nearest_city", lang)}</span>
                <span>{d.visit_nearest_city}</span>
              </div>
            )}
            {d.visit_duration && (
              <div className="vc-info-row">
                <span>{t("dest_duration", lang)}</span>
                <span>{d.visit_duration}</span>
              </div>
            )}
            {d.visit_best_time && (
              <div className="vc-info-row">
                <span>{t("dest_best_time", lang)}</span>
                <span>{d.visit_best_time}</span>
              </div>
            )}
            <Link className="vc-btn-cta" style={{ display: "block", textAlign: "center", marginTop: 18 }} href="/bundles">
              {t("dest_related_bundles_btn", lang)}
            </Link>
          </div>

          {related.length > 0 && (
            <div className="vc-sidebar-card">
              <h2 className="vc-section-label">{t("dest_related_title", lang)}</h2>
              {related.map((r) => (
                <Link key={r.slug} className="vc-related-card" href={`/destinations/${r.slug}`}>
                  {r.image_url ? (
                    <SmartImage className="vc-related-thumb" src={r.image_url} alt={r.name} width={52} height={52} />
                  ) : (
                    <div className="vc-related-thumb-ph">{r.name[0]}</div>
                  )}
                  <div>
                    <div className="vc-related-name">{r.name}</div>
                    <div className="vc-related-region">{r.region}</div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </aside>
      </div>

      <VamFooter lang={lang} />
    </div>
  );
}

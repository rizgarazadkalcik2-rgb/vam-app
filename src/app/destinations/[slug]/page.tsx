import { notFound } from "next/navigation";
import { getDestinationBySlug, listActiveDestinations } from "@/lib/destinations";
import VamNavbar from "@/app/components/VamNavbar";
import VamFooter from "@/app/components/VamFooter";
import { getLang } from "@/lib/i18n";
import { getCurrency } from "@/lib/getCurrency";
import { t } from "@/lib/dictionary";
import "@/app/vam-content.css";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const [d, lang] = await Promise.all([getDestinationBySlug(slug), getLang()]);
  if (!d || d.status !== "active") return {};

  const description =
    (d.history && d.history[0] ? d.history[0].slice(0, 155) : "") ||
    `${d.name} — ${d.region}. ${t("meta_site_desc", lang)}`.slice(0, 155);

  return {
    title: `${d.name} — ${d.region}`,
    description,
    alternates: { canonical: `/destinations/${d.slug}` },
    openGraph: {
      title: `${d.name} — ${d.region} | VAM`,
      description,
      ...(d.image_url ? { images: [{ url: d.image_url }] } : {}),
    },
  };
}

export default async function DestinationDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const [d, lang, currency] = await Promise.all([getDestinationBySlug(slug), getLang(), getCurrency()]);
  if (!d || d.status !== "active") notFound();

  const allDests = await listActiveDestinations();
  const bySlug = new Map(allDests.map((x) => [x.slug, x]));
  const related = (d.related || []).map((s) => bySlug.get(s)).filter(Boolean) as typeof allDests;

  const history = d.history || [];
  const features = d.features || [];

  return (
    <div className="vc-root">
      <VamNavbar lang={lang} currency={currency} />

      <div className="vc-breadcrumb">
        <a href="/platform">{t("breadcrumb_home", lang)}</a> › <a href="/destinations">{t("all_destinations", lang)}</a> › {d.name}
      </div>

      <div className="vc-hero">
        {d.image_url ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={d.image_url} alt={d.name} />
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
                {tag}
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
          <a className="vc-back" href="/destinations">
            {t("dest_back", lang)}
          </a>
          {history[0] && <p className="vc-lead">{history[0]}</p>}
          {history.slice(1).map((p, i) => (
            <p key={i} className="vc-p">
              {p}
            </p>
          ))}

          {features.length > 0 && (
            <div className="vc-features">
              <div className="vc-section-label">{t("dest_features_title", lang)}</div>
              {features.map((f, i) => (
                <div key={i} className="vc-feature">
                  <h4>{f.title}</h4>
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
            <a className="vc-btn-cta" style={{ display: "block", textAlign: "center", marginTop: 18 }} href="/bundles">
              {t("dest_related_bundles_btn", lang)}
            </a>
          </div>

          {related.length > 0 && (
            <div className="vc-sidebar-card">
              <div className="vc-section-label">{t("dest_related_title", lang)}</div>
              {related.map((r) => (
                <a key={r.slug} className="vc-related-card" href={`/destinations/${r.slug}`}>
                  {r.image_url ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img className="vc-related-thumb" src={r.image_url} alt={r.name} />
                  ) : (
                    <div className="vc-related-thumb-ph">{r.name[0]}</div>
                  )}
                  <div>
                    <div className="vc-related-name">{r.name}</div>
                    <div className="vc-related-region">{r.region}</div>
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

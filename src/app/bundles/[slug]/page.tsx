import { notFound } from "next/navigation";
import { getBundleBySlug, listActiveBundles } from "@/lib/bundles";
import VamNavbar from "@/app/components/VamNavbar";
import VamFooter from "@/app/components/VamFooter";
import { getLang } from "@/lib/i18n";
import { t } from "@/lib/dictionary";
import { formatPrice } from "@/lib/currency";
import { getCurrency } from "@/lib/getCurrency";
import "@/app/vam-content.css";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const b = await getBundleBySlug(slug);
  if (!b || b.status !== "active") return {};

  const description = (b.description || "").slice(0, 155);

  return {
    title: b.title,
    description,
    alternates: { canonical: `/bundles/${b.slug}` },
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
  const [b, lang, currency] = await Promise.all([getBundleBySlug(slug), getLang(), getCurrency()]);
  if (!b || b.status !== "active") notFound();

  const others = (await listActiveBundles()).filter((x) => x.slug !== b.slug).slice(0, 3);

  const questionSubject = encodeURIComponent(`Soru – ${b.title}`);

  return (
    <div className="vc-root">
      <VamNavbar lang={lang} currency={currency} />

      <div className="vc-breadcrumb">
        <a href="/platform">{t("breadcrumb_home", lang)}</a> › <a href="/bundles">{t("all_bundles", lang)}</a> › {b.title}
      </div>

      <div className="vc-hero">
        {b.image_url ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={b.image_url} alt={b.title} />
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
                <span className="vc-price-old" style={{ marginLeft: 8 }}>
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
                    // eslint-disable-next-line @next/next/no-img-element
                    <img className="vc-related-thumb" src={o.image_url} alt={o.title} />
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

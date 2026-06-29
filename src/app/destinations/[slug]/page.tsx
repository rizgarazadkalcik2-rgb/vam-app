import { notFound } from "next/navigation";
import { getDestinationBySlug, listActiveDestinations } from "@/lib/destinations";
import VamNavbar from "@/app/components/VamNavbar";
import VamFooter from "@/app/components/VamFooter";
import "@/app/vam-content.css";

export const dynamic = "force-dynamic";

export default async function DestinationDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const d = await getDestinationBySlug(slug);
  if (!d || d.status !== "active") notFound();

  const allDests = await listActiveDestinations();
  const bySlug = new Map(allDests.map((x) => [x.slug, x]));
  const related = (d.related || []).map((s) => bySlug.get(s)).filter(Boolean) as typeof allDests;

  const history = d.history || [];
  const features = d.features || [];

  return (
    <div className="vc-root">
      <VamNavbar />

      <div className="vc-breadcrumb">
        <a href="/platform">Ana Sayfa</a> › <a href="/destinations">Destinasyonlar</a> › {d.name}
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
            {(d.tags || []).map((t) => (
              <span key={t} className="vc-badge vc-badge-dark">
                {t}
              </span>
            ))}
            {d.unesco && <span className="vc-badge vc-badge-gold">UNESCO</span>}
          </div>
          <h1 className="vc-hero-title">{d.name}</h1>
          <div className="vc-hero-meta">
            <span>⊙ {d.region}</span>
            <span className="vc-dot" />
            <span style={{ color: "var(--gold-300)" }}>
              ★ {d.era_display || d.era} · {d.era_caption || "Dönem"}
            </span>
          </div>
        </div>
      </div>

      <div className="vc-layout">
        <main>
          <a className="vc-back" href="/destinations">
            ← Tüm Destinasyonlar
          </a>
          {history[0] && <p className="vc-lead">{history[0]}</p>}
          {history.slice(1).map((p, i) => (
            <p key={i} className="vc-p">
              {p}
            </p>
          ))}

          {features.length > 0 && (
            <div className="vc-features">
              <div className="vc-section-label">Öne Çıkan Özellikler</div>
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
                <span style={{ color: "var(--text-muted)" }}>({d.reviews || 0} değerlendirme)</span>
              </div>
            )}
            {d.visit_location && (
              <div className="vc-info-row">
                <span>Konum</span>
                <span>{d.visit_location}</span>
              </div>
            )}
            {d.visit_nearest_city && (
              <div className="vc-info-row">
                <span>En Yakın Şehir</span>
                <span>{d.visit_nearest_city}</span>
              </div>
            )}
            {d.visit_duration && (
              <div className="vc-info-row">
                <span>Önerilen Süre</span>
                <span>{d.visit_duration}</span>
              </div>
            )}
            {d.visit_best_time && (
              <div className="vc-info-row">
                <span>En İyi Zaman</span>
                <span>{d.visit_best_time}</span>
              </div>
            )}
            <a className="vc-btn-cta" style={{ display: "block", textAlign: "center", marginTop: 18 }} href="/bundles">
              İlgili Paketleri Gör
            </a>
          </div>

          {related.length > 0 && (
            <div className="vc-sidebar-card">
              <div className="vc-section-label">İlgili Destinasyonlar</div>
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

      <VamFooter />
    </div>
  );
}

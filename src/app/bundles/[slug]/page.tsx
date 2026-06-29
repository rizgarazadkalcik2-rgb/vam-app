import { notFound } from "next/navigation";
import { getBundleBySlug, listActiveBundles } from "@/lib/bundles";
import VamNavbar from "@/app/components/VamNavbar";
import VamFooter from "@/app/components/VamFooter";
import "@/app/vam-content.css";

export const dynamic = "force-dynamic";

export default async function BundleDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const b = await getBundleBySlug(slug);
  if (!b || b.status !== "active") notFound();

  const others = (await listActiveBundles()).filter((x) => x.slug !== b.slug).slice(0, 3);

  const subject = encodeURIComponent(`Rezervasyon Talebi – ${b.title}`);
  const questionSubject = encodeURIComponent(`Soru – ${b.title}`);

  return (
    <div className="vc-root">
      <VamNavbar />

      <div className="vc-breadcrumb">
        <a href="/platform">Ana Sayfa</a> › <a href="/bundles">Paketler</a> › {b.title}
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
            <span className="vc-badge vc-badge-dark">{b.nights} Gece</span>
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
            ← Tüm Paketler
          </a>
          <p className="vc-lead">{b.description}</p>

          <div className="vc-features">
            <div className="vc-section-label">Güzergah</div>
            <div className="vc-card-tags" style={{ marginBottom: 20 }}>
              {(b.destinations || []).map((dn) => (
                <span key={dn} className="vc-card-pill">
                  {dn}
                </span>
              ))}
            </div>

            <div className="vc-section-label">Pakete Dahil</div>
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
                ₺{Number(b.price).toLocaleString("tr-TR")}
              </span>
              {b.original_price && (
                <span className="vc-price-old" style={{ marginLeft: 8 }}>
                  ₺{Number(b.original_price).toLocaleString("tr-TR")}
                </span>
              )}
              <div style={{ fontSize: 12, color: "var(--text-muted)" }}>kişi başı</div>
            </div>

            <div className="vc-info-row">
              <span>Süre</span>
              <span>{b.nights} gece / {b.nights + 1} gün</span>
            </div>
            <div className="vc-info-row">
              <span>Destinasyon</span>
              <span>{(b.destinations || []).length} nokta</span>
            </div>

            <a
              className="vc-btn-cta"
              style={{ display: "block", textAlign: "center", marginTop: 18 }}
              href={`mailto:info@visitvam.com?subject=${subject}`}
            >
              Şimdi Rezervasyon Yap
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
              Sorusu Olanlar İçin →
            </a>
            <p className="vc-note">
              Bu rota için rezervasyon talebi şu an e-posta üzerinden alınmaktadır. Çevrimiçi
              anlık rezervasyon yakında eklenecek.
            </p>
          </div>

          {others.length > 0 && (
            <div className="vc-sidebar-card">
              <div className="vc-section-label">Diğer Rotalar</div>
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
                      ₺{Number(o.price).toLocaleString("tr-TR")} · {o.nights} gece
                    </div>
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

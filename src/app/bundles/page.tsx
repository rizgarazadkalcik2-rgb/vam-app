import { listActiveBundles } from "@/lib/bundles";
import VamNavbar from "@/app/components/VamNavbar";
import VamFooter from "@/app/components/VamFooter";
import "@/app/vam-content.css";

export const dynamic = "force-dynamic";

export default async function BundlesPage() {
  const bundles = await listActiveBundles();

  return (
    <div className="vc-root">
      <VamNavbar />

      <div className="vc-pagehead">
        <div className="vc-eyebrow">— Paket Koleksiyonu</div>
        <h1 className="vc-h1">Her Şey Dahil Rotalar</h1>
        <p className="vc-lede">
          Yerel operatörlerle revenue-share modeliyle hazırlanan, konaklama ve rehberlik dahil
          küratörlü paketler.
        </p>
      </div>

      {bundles.length === 0 ? (
        <div className="vc-empty">Şu anda aktif bundle paketi bulunmuyor.</div>
      ) : (
        <div className="vc-grid">
          {bundles.map((b) => (
            <a key={b.id} className="vc-card" href={`/bundles/${b.slug}`}>
              <div className="vc-card-media">
                {b.image_url ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={b.image_url} alt={b.title} />
                ) : (
                  <span className="vc-card-letter">{b.title[0]}</span>
                )}
                <span className="vc-card-tag">{b.nights} Gece</span>
                {b.badge && (
                  <span className="vc-card-tag vc-card-tag-gold" style={{ left: "auto", right: 10 }}>
                    {b.badge}
                  </span>
                )}
              </div>
              <div className="vc-card-body">
                <div className="vc-card-eyebrow">Rota Paketi</div>
                <div className="vc-card-title">{b.title}</div>
                <div className="vc-card-desc">{b.description}</div>
                <div className="vc-card-tags">
                  {(b.destinations || []).map((dn) => (
                    <span key={dn} className="vc-card-pill">
                      {dn}
                    </span>
                  ))}
                </div>
                <div className="vc-card-price-row">
                  <span className="vc-price">₺{Number(b.price).toLocaleString("tr-TR")}</span>
                  {b.original_price && (
                    <span className="vc-price-old">
                      ₺{Number(b.original_price).toLocaleString("tr-TR")}
                    </span>
                  )}
                  <span style={{ fontSize: 11, color: "var(--text-muted)" }}>kişi başı</span>
                </div>
              </div>
            </a>
          ))}
        </div>
      )}

      <VamFooter />
    </div>
  );
}

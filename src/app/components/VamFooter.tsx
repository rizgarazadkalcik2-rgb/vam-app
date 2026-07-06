import { t, type Lang } from "@/lib/dictionary";

export default function VamFooter({ lang = "TR" }: { lang?: Lang }) {
  return (
    <footer className="vc-footer">
      <div className="vc-footer-inner">
        <div>
          <div className="vc-footer-logo">VAM</div>
          <p style={{ fontSize: 13, color: "var(--ink-400)", lineHeight: 1.6 }}>
            Visit Anatolia and Mesopotamia.
            <br />
            {t("footer_tagline", lang)}
          </p>
        </div>
        <div>
          <h5>{t("footer_col_platform", lang)}</h5>
          <a href="/destinations">{t("nav_destinations", lang)}</a>
          <a href="/bundles">{t("nav_bundles", lang)}</a>
          <a href="/experiences">{t("nav_experiences", lang)}</a>
          <a href="/match-weekends">{t("nav_matchweekends", lang)}</a>
          <a href="#">{t("footer_guides", lang)}</a>
          <a href="#">{t("footer_reviews", lang)}</a>
        </div>
        <div>
          <h5>{t("footer_col_company", lang)}</h5>
          <a href="/about">{t("footer_about", lang)}</a>
          <a href="mailto:info@visitvam.com">{t("footer_contact", lang)}</a>
        </div>
        <div>
          <h5>{t("footer_col_support", lang)}</h5>
          <a href="/mesafeli-satis-sozlesmesi">{t("footer_terms_sale", lang)}</a>
          <a href="/iptal-iade-politikasi">{t("footer_cancel_policy", lang)}</a>
          <a href="/gizlilik-politikasi">{t("footer_privacy", lang)}</a>
          <a href="/impressum">{t("footer_impressum", lang)}</a>
          <a href="/teslimat-hizmet-sartlari">{t("footer_service_terms", lang)}</a>
          <a href="/giris">{t("footer_partner_login", lang)}</a>
        </div>
      </div>
      <div className="vc-footer-bottom">© 2026 VAM · Visit Anatolia and Mesopotamia</div>
    </footer>
  );
}

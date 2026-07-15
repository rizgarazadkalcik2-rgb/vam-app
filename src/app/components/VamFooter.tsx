import Link from "next/link";
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
          <Link href="/destinations">{t("nav_destinations", lang)}</Link>
          <Link href="/bundles">{t("nav_bundles", lang)}</Link>
          <Link href="/experiences">{t("nav_experiences", lang)}</Link>
          <Link href="/match-weekends">{t("nav_matchweekends", lang)}</Link>
        </div>
        <div>
          <h5>{t("footer_col_company", lang)}</h5>
          <Link href="/about">{t("footer_about", lang)}</Link>
          <a href="mailto:info@visitvam.com">{t("footer_contact", lang)}</a>
        </div>
        <div>
          <h5>{t("footer_col_support", lang)}</h5>
          <Link href="/mesafeli-satis-sozlesmesi">{t("footer_terms_sale", lang)}</Link>
          <Link href="/iptal-iade-politikasi">{t("footer_cancel_policy", lang)}</Link>
          <Link href="/gizlilik-politikasi">{t("footer_privacy", lang)}</Link>
          <Link href="/impressum">{t("footer_impressum", lang)}</Link>
          <Link href="/teslimat-hizmet-sartlari">{t("footer_service_terms", lang)}</Link>
          <Link href="/giris">{t("footer_partner_login", lang)}</Link>
        </div>
      </div>
      <div className="vc-footer-bottom">© 2026 VAM · Visit Anatolia and Mesopotamia</div>
    </footer>
  );
}

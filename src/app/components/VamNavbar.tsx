import { t, type Lang } from "@/lib/dictionary";

export default function VamNavbar({ lang = "TR" }: { lang?: Lang }) {
  return (
    <nav className="vc-navbar">
      <a className="vc-logo" href="/platform">
        VAM<small>Visit Anatolia &amp; Mesopotamia</small>
      </a>
      <div className="vc-nav-links">
        <a href="/platform">{t("nav_home", lang)}</a>
        <a href="/destinations">{t("nav_destinations", lang)}</a>
        <a href="/bundles">{t("nav_bundles", lang)}</a>
        <a href="/experiences">{t("nav_experiences", lang)}</a>
        <a href="/match-weekends">{t("nav_matchweekends", lang)}</a>
        <a href="/about">{t("nav_about", lang)}</a>
      </div>
      <a className="vc-btn-cta" href="/bundles">
        {t("nav_cta", lang)}
      </a>
    </nav>
  );
}

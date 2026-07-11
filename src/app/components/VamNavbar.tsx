"use client";

import { useState } from "react";
import { t, type Lang } from "@/lib/dictionary";
import type { Currency } from "@/lib/currency";
import LanguageSwitcher from "./LanguageSwitcher";
import CurrencySwitcher from "./CurrencySwitcher";

export default function VamNavbar({ lang = "TR", currency = "TRY" }: { lang?: Lang; currency?: Currency }) {
  const [open, setOpen] = useState(false);

  const links = (
    <>
      <a href="/">{t("nav_home", lang)}</a>
      <a href="/destinations">{t("nav_destinations", lang)}</a>
      <a href="/bundles">{t("nav_bundles", lang)}</a>
      <a href="/experiences">{t("nav_experiences", lang)}</a>
      <a href="/match-weekends">{t("nav_matchweekends", lang)}</a>
      <a href="/about">{t("nav_about", lang)}</a>
    </>
  );

  return (
    <nav className="vc-navbar">
      <a className="vc-logo" href="/">
        VAM<small>Visit Anatolia &amp; Mesopotamia</small>
      </a>

      <button
        className={`vc-nav-toggle${open ? " open" : ""}`}
        onClick={() => setOpen((o) => !o)}
        aria-label="Menu"
        aria-expanded={open}
      >
        <span /><span /><span />
      </button>

      <div className="vc-nav-links">{links}</div>
      <div className="vc-switcher-group">
        <LanguageSwitcher lang={lang} />
        <CurrencySwitcher currency={currency} />
      </div>
      <a className="vc-btn-cta" href="/bundles">
        {t("nav_cta", lang)}
      </a>

      <div className={`vc-nav-mobile-panel${open ? " open" : ""}`} onClick={() => setOpen(false)}>
        {links}
        <a className="vc-btn-cta" href="/bundles">
          {t("nav_cta", lang)}
        </a>
        <div className="vc-switcher-group">
          <LanguageSwitcher lang={lang} />
          <CurrencySwitcher currency={currency} />
        </div>
      </div>
    </nav>
  );
}

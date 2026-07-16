"use client";

import { useState } from "react";
import Link from "next/link";
import { t, type Lang } from "@/lib/dictionary";
import type { Currency } from "@/lib/currency";
import LanguageSwitcher from "./LanguageSwitcher";
import CurrencySwitcher from "./CurrencySwitcher";

export default function VamNavbar({ lang = "TR", currency = "TRY" }: { lang?: Lang; currency?: Currency }) {
  const [open, setOpen] = useState(false);

  const links = (
    <>
      <Link href="/">{t("nav_home", lang)}</Link>
      <Link href="/destinations">{t("nav_destinations", lang)}</Link>
      <Link href="/bundles">{t("nav_bundles", lang)}</Link>
      <Link href="/experiences">{t("nav_experiences", lang)}</Link>
      <Link href="/match-weekends">{t("nav_matchweekends", lang)}</Link>
      <Link href="/about">{t("nav_about", lang)}</Link>
    </>
  );

  return (
    <nav className="vc-navbar">
      <Link className="vc-logo" href="/">
        VAM<small>Visit Anatolia &amp; Mesopotamia</small>
      </Link>

      <button
        className={`vc-nav-toggle${open ? " open" : ""}`}
        onClick={() => setOpen((o) => !o)}
        aria-label={t("nav_menu_label", lang)}
        aria-expanded={open}
      >
        <span /><span /><span />
      </button>

      <div className="vc-nav-links">{links}</div>
      <div className="vc-switcher-group">
        <LanguageSwitcher lang={lang} />
        <CurrencySwitcher currency={currency} />
      </div>
      <Link className="vc-btn-cta" href="/bundles">
        {t("nav_cta", lang)}
      </Link>

      <div className={`vc-nav-mobile-panel${open ? " open" : ""}`} onClick={() => setOpen(false)}>
        {links}
        <Link className="vc-btn-cta" href="/bundles">
          {t("nav_cta", lang)}
        </Link>
        <div className="vc-switcher-group">
          <LanguageSwitcher lang={lang} />
          <CurrencySwitcher currency={currency} />
        </div>
      </div>
    </nav>
  );
}

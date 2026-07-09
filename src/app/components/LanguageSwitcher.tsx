"use client";

import { useRouter } from "next/navigation";
import type { Lang } from "@/lib/dictionary";

const OPTIONS: Lang[] = ["TR", "DE", "EN", "KU", "CKB"];
const COOKIE_MAX_AGE = 60 * 60 * 24 * 365; // 1 year, matches middleware.ts

export default function LanguageSwitcher({ lang }: { lang: Lang }) {
  const router = useRouter();

  function selectLang(next: Lang) {
    if (next === lang) return;
    document.cookie = `vam_lang=${next}; path=/; max-age=${COOKIE_MAX_AGE}; SameSite=Lax`;
    router.refresh();
  }

  return (
    <div className="vc-lang-switcher">
      {OPTIONS.map((code, i) => (
        <span key={code}>
          {i > 0 && <span className="vc-lang-switcher-sep">·</span>}
          <button
            type="button"
            className={`vc-lang-switcher-btn${code === lang ? " active" : ""}`}
            onClick={() => selectLang(code)}
            aria-current={code === lang}
          >
            {code}
          </button>
        </span>
      ))}
    </div>
  );
}

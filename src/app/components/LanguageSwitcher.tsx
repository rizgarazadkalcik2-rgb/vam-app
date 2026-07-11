"use client";

import { useRouter, usePathname } from "next/navigation";
import type { Lang } from "@/lib/dictionary";

const OPTIONS: Lang[] = ["TR", "DE", "EN", "KU", "CKB"];

// hreflang URL önekleri — middleware.ts'teki LANG_PREFIXES ile aynı eşleme.
// TR varsayılan dil olduğu için önek almaz.
const LANG_PREFIXES: Partial<Record<Lang, string>> = { DE: "de", EN: "en", KU: "ku", CKB: "ckb" };
const PREFIX_TO_LANG: Record<string, Lang> = { de: "DE", en: "EN", ku: "KU", ckb: "CKB" };

/** Mevcut path'ten (varsa) dil önekini çıkarır — örn. "/de/destinations" -> "/destinations". */
function stripLangPrefix(pathname: string): string {
  const segments = pathname.split("/");
  const first = segments[1];
  if (first && PREFIX_TO_LANG[first]) {
    const rest = "/" + segments.slice(2).join("/");
    return rest.length > 1 ? rest.replace(/\/$/, "") : "/";
  }
  return pathname;
}

export default function LanguageSwitcher({ lang }: { lang: Lang }) {
  const router = useRouter();
  const pathname = usePathname();

  function selectLang(next: Lang) {
    if (next === lang) return;
    const basePath = stripLangPrefix(pathname);
    const prefix = LANG_PREFIXES[next];
    const target = !prefix ? basePath : basePath === "/" ? `/${prefix}` : `/${prefix}${basePath}`;
    router.push(target);
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

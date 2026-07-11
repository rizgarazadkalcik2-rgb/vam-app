import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { defaultCurrencyForLang } from "@/lib/currency";
import type { Lang } from "@/lib/dictionary";

// Countries where German should be offered by default.
const GERMAN_SPEAKING_COUNTRIES = new Set(["DE", "AT", "CH", "LI"]);

const LANG_COOKIE = "vam_lang";
const CURRENCY_COOKIE = "vam_currency";
const COOKIE_MAX_AGE = 60 * 60 * 24 * 365; // 1 year

// hreflang URL önekleri — TR varsayılan dil olduğu için önek almaz (mevcut
// URL'ler hiç değişmez). DE/EN/KU/CKB için /de, /en, /ku, /ckb önekleri
// kullanılır; bkz. src/lib/hreflang.ts.
const LANG_PREFIXES: Record<string, Lang> = { de: "DE", en: "EN", ku: "KU", ckb: "CKB" };

function extractLangPrefix(pathname: string): { lang: Lang; rest: string } | null {
  const match = pathname.match(/^\/(de|en|ku|ckb)(\/.*)?$/);
  if (!match) return null;
  return { lang: LANG_PREFIXES[match[1]], rest: match[2] || "/" };
}

function detectLang(request: NextRequest): "DE" | "EN" | "TR" | "KU" | "CKB" {
  // 1) Vercel edge geo header — where the visitor is connecting from.
  const country = request.headers.get("x-vercel-ip-country");
  if (country && GERMAN_SPEAKING_COUNTRIES.has(country)) {
    return "DE";
  }
  if (country === "TR") {
    return "TR";
  }

  // 2) Fallback: browser/OS language preference.
  const acceptLanguage = request.headers.get("accept-language") || "";
  const primary = acceptLanguage.split(",")[0]?.trim().toLowerCase() || "";
  if (primary.startsWith("de")) {
    return "DE";
  }
  if (primary.startsWith("tr")) {
    return "TR";
  }
  // Kurdish has no single majority country, so it's detected from browser
  // language only. Sorani (Central Kurdish) browsers typically send "ckb"
  // or occasionally "ku-arab"; anything else starting with "ku" is treated
  // as Kurmanji. Browsers are inconsistent here, so the manual switcher
  // remains the primary way users reach Sorani.
  if (primary.startsWith("ckb") || primary.startsWith("ku-arab")) {
    return "CKB";
  }
  if (primary.startsWith("ku")) {
    return "KU";
  }

  // 3) Everyone else (no TR/DE/KU signal from geo or browser) defaults to English.
  return "EN";
}

function setLangAndCurrencyCookies(
  response: NextResponse,
  lang: Lang,
  currencyAlreadySet: boolean
) {
  response.cookies.set(LANG_COOKIE, lang, {
    path: "/",
    maxAge: COOKIE_MAX_AGE,
    sameSite: "lax",
  });
  if (!currencyAlreadySet) {
    response.cookies.set(CURRENCY_COOKIE, defaultCurrencyForLang(lang), {
      path: "/",
      maxAge: COOKIE_MAX_AGE,
      sameSite: "lax",
    });
  }
}

export function middleware(request: NextRequest) {
  const prefixed = extractLangPrefix(request.nextUrl.pathname);

  if (prefixed) {
    // Dil öneki varsa URL kaynak-doğrudur (source of truth): çerez ona göre
    // hizalanır ve istek önek olmadan (örn. /de/destinations -> /destinations)
    // render edilir. Tarayıcıda adres çubuğu /de/destinations olarak kalır —
    // rewrite şeffaftır, mevcut sayfa dosyalarının hiçbiri değişmez.
    const url = request.nextUrl.clone();
    url.pathname = prefixed.rest;

    // Aynı isteğin sunucu render'ında cookies() ile okunacak değeri de
    // günceller (Next.js'in belgelenen deseni: request cookie'sini
    // middleware'de set etmek downstream'e iletilir).
    request.cookies.set(LANG_COOKIE, prefixed.lang);

    const response = NextResponse.rewrite(url);
    setLangAndCurrencyCookies(response, prefixed.lang, !!request.cookies.get(CURRENCY_COOKIE));
    return response;
  }

  const response = NextResponse.next();

  // Respect an existing choice (manual selection or previous detection) — never override it.
  const existingLang = request.cookies.get(LANG_COOKIE)?.value as Lang | undefined;
  const lang: Lang = existingLang ?? detectLang(request);
  if (!existingLang) {
    response.cookies.set(LANG_COOKIE, lang, {
      path: "/",
      maxAge: COOKIE_MAX_AGE,
      sameSite: "lax",
    });
  }

  // Currency is independent of language — it only gets a language-based
  // default on a visitor's very first request. Once set, only the
  // currency switcher itself changes it (see CurrencySwitcher.tsx).
  if (!request.cookies.get(CURRENCY_COOKIE)) {
    response.cookies.set(CURRENCY_COOKIE, defaultCurrencyForLang(lang), {
      path: "/",
      maxAge: COOKIE_MAX_AGE,
      sameSite: "lax",
    });
  }

  return response;
}

export const config = {
  matcher: [
    // Run on everything except static assets, API routes, and Next internals.
    "/((?!_next/static|_next/image|api|favicon.ico|.*\\.(?:png|jpg|jpeg|svg|webp|ico|txt|xml|webmanifest)$).*)",
  ],
};

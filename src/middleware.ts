import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { defaultCurrencyForLang } from "@/lib/currency";
import type { Lang } from "@/lib/dictionary";

// Countries where German should be offered by default.
const GERMAN_SPEAKING_COUNTRIES = new Set(["DE", "AT", "CH", "LI"]);

const LANG_COOKIE = "vam_lang";
const CURRENCY_COOKIE = "vam_currency";
const COOKIE_MAX_AGE = 60 * 60 * 24 * 365; // 1 year

function detectLang(request: NextRequest): "DE" | "EN" | "TR" | "KU" {
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
  // language only — "ku" covers Kurmanji; regional Sorani tags aren't
  // handled here yet.
  if (primary.startsWith("ku")) {
    return "KU";
  }

  // 3) Everyone else (no TR/DE/KU signal from geo or browser) defaults to English.
  return "EN";
}

export function middleware(request: NextRequest) {
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

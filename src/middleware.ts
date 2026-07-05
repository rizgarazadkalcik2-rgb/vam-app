import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Countries where German should be offered by default.
const GERMAN_SPEAKING_COUNTRIES = new Set(["DE", "AT", "CH", "LI"]);

const COOKIE_NAME = "vam_lang";
const COOKIE_MAX_AGE = 60 * 60 * 24 * 365; // 1 year

function detectLang(request: NextRequest): "DE" | "EN" | "TR" {
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

  // 3) Everyone else (no TR/DE signal from geo or browser) defaults to English.
  return "EN";
}

export function middleware(request: NextRequest) {
  // Respect an existing choice (manual selection or previous detection) — never override it.
  if (request.cookies.get(COOKIE_NAME)) {
    return NextResponse.next();
  }

  const lang = detectLang(request);
  const response = NextResponse.next();
  response.cookies.set(COOKIE_NAME, lang, {
    path: "/",
    maxAge: COOKIE_MAX_AGE,
    sameSite: "lax",
  });
  return response;
}

export const config = {
  matcher: [
    // Run on everything except static assets, API routes, and Next internals.
    "/((?!_next/static|_next/image|api|favicon.ico|.*\\.(?:png|jpg|jpeg|svg|webp|ico|txt|xml|webmanifest)$).*)",
  ],
};

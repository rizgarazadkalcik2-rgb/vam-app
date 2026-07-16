import type { Lang } from "./dictionary";

export type Currency = "TRY" | "EUR" | "USD";

/** Fixed TRY-per-1-EUR rate. VAM absorbs FX risk so the customer never sees a moving price. Update manually when the rate drifts meaningfully. */
const TRY_PER_EUR = 55;

/** Round to the nearest 5 EUR so prices read clean (e.g. "175 €", not "174,55 €"). */
const EUR_ROUND_STEP = 5;

/** Fixed TRY-per-1-USD rate, same fixed-rate approach as EUR. */
const TRY_PER_USD = 48;

/** Round to the nearest 5 USD so prices read clean. */
const USD_ROUND_STEP = 5;

/** First-visit default only — after that, the visitor's own vam_currency cookie choice always wins (see middleware.ts). */
export function defaultCurrencyForLang(lang: Lang): Currency {
  if (lang === "DE" || lang === "KU" || lang === "CKB") return "EUR";
  if (lang === "EN") return "USD";
  return "TRY";
}

/**
 * Converts a TRY amount to the chosen currency's rounded numeric value —
 * no symbol/locale formatting. Use this (not formatPrice) anywhere the
 * bare number is needed, e.g. structured data (JSON-LD Offer.price), where
 * priceCurrency and price must describe the SAME amount or crawlers/rich
 * results index a wildly wrong price.
 */
export function convertPrice(amountTry: number, currency: Currency): number {
  if (currency === "EUR") {
    return Math.round(amountTry / TRY_PER_EUR / EUR_ROUND_STEP) * EUR_ROUND_STEP;
  }
  if (currency === "USD") {
    return Math.round(amountTry / TRY_PER_USD / USD_ROUND_STEP) * USD_ROUND_STEP;
  }
  return amountTry;
}

/** Formats a TRY amount for display in the chosen currency — independent of interface language. */
export function formatPrice(amountTry: number, currency: Currency): string {
  const amount = convertPrice(amountTry, currency);
  if (currency === "EUR") return `${amount.toLocaleString("de-DE")} €`;
  if (currency === "USD") return `$${amount.toLocaleString("en-US")}`;
  return `₺${amount.toLocaleString("tr-TR")}`;
}

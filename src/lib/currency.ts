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
  if (lang === "DE" || lang === "KU") return "EUR";
  if (lang === "EN") return "USD";
  return "TRY";
}

/** Formats a TRY amount for display in the chosen currency — independent of interface language. */
export function formatPrice(amountTry: number, currency: Currency): string {
  if (currency === "EUR") {
    const eur = Math.round(amountTry / TRY_PER_EUR / EUR_ROUND_STEP) * EUR_ROUND_STEP;
    return `${eur.toLocaleString("de-DE")} €`;
  }
  if (currency === "USD") {
    const usd = Math.round(amountTry / TRY_PER_USD / USD_ROUND_STEP) * USD_ROUND_STEP;
    return `$${usd.toLocaleString("en-US")}`;
  }
  return `₺${amountTry.toLocaleString("tr-TR")}`;
}

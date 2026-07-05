import type { Lang } from "./dictionary";

/** Fixed TRY-per-1-EUR rate. VAM absorbs FX risk so the customer never sees a moving price. Update manually when the rate drifts meaningfully. */
const TRY_PER_EUR = 55;

/** Round to the nearest 5 EUR so prices read clean (e.g. "175 €", not "174,55 €"). */
const EUR_ROUND_STEP = 5;

/** Fixed TRY-per-1-USD rate, same fixed-rate approach as EUR. */
const TRY_PER_USD = 48;

/** Round to the nearest 5 USD so prices read clean. */
const USD_ROUND_STEP = 5;

/** Formats a TRY amount for display: TR sessions see TRY, DE/KU sessions see a fixed-rate EUR conversion, EN sessions see a fixed-rate USD conversion.
 *  KU is routed to EUR as an interim default (large European Kurdish diaspora) until an independent currency selector ships. */
export function formatPrice(amountTry: number, lang: Lang): string {
  if (lang === "DE" || lang === "KU") {
    const eur = Math.round(amountTry / TRY_PER_EUR / EUR_ROUND_STEP) * EUR_ROUND_STEP;
    return `${eur.toLocaleString("de-DE")} €`;
  }
  if (lang === "EN") {
    const usd = Math.round(amountTry / TRY_PER_USD / USD_ROUND_STEP) * USD_ROUND_STEP;
    return `$${usd.toLocaleString("en-US")}`;
  }
  return `₺${amountTry.toLocaleString("tr-TR")}`;
}

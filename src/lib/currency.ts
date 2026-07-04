import type { Lang } from "./dictionary";

/** Fixed TRY-per-1-EUR rate. VAM absorbs FX risk so the customer never sees a moving price. Update manually when the rate drifts meaningfully. */
const TRY_PER_EUR = 55;

/** Round to the nearest 5 EUR so prices read clean (e.g. "175 €", not "174,55 €"). */
const EUR_ROUND_STEP = 5;

/** Formats a TRY amount for display: TR sessions see TRY, DE sessions see a fixed-rate EUR conversion. */
export function formatPrice(amountTry: number, lang: Lang): string {
  if (lang === "DE") {
    const eur = Math.round(amountTry / TRY_PER_EUR / EUR_ROUND_STEP) * EUR_ROUND_STEP;
    return `${eur.toLocaleString("de-DE")} €`;
  }
  return `₺${amountTry.toLocaleString("tr-TR")}`;
}

import { cookies } from "next/headers";
import type { Currency } from "./currency";

/** Reads the vam_currency cookie (set by middleware or the currency switcher) on the server. Independent of vam_lang.
 *  Kept in its own module (not currency.ts) because next/headers can't be imported from Edge Middleware or Client Components. */
export async function getCurrency(): Promise<Currency> {
  const store = await cookies();
  const v = store.get("vam_currency")?.value;
  return v === "EUR" ? "EUR" : v === "USD" ? "USD" : "TRY";
}

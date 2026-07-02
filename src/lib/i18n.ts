import { cookies } from "next/headers";
import type { Lang } from "./dictionary";

export type { Lang };

/** Reads the vam_lang cookie (set by middleware or the language switcher) on the server. */
export async function getLang(): Promise<Lang> {
  const store = await cookies();
  const v = store.get("vam_lang")?.value;
  return v === "DE" ? "DE" : "TR";
}

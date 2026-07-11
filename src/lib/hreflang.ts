import { headers } from "next/headers";
import type { Lang } from "@/lib/dictionary";

const URL_LANG_HEADER = "x-vam-url-lang";
const BASE_URL = "https://visitvam.com";

// middleware.ts'teki LANG_PREFIXES ile aynı eşleme — TR varsayılan dil
// olduğu için önek almaz.
const LANG_URL_PREFIXES: Partial<Record<Lang, string>> = { DE: "de", EN: "en", KU: "ku", CKB: "ckb" };
const HREFLANG_CODES: Record<Lang, string> = { TR: "tr", DE: "de", EN: "en", KU: "ku", CKB: "ckb" };

/** path: önek'siz path, örn. "/destinations/gobeklitepe" veya "/" (kök). */
function urlForLang(path: string, lang: Lang): string {
  const prefix = LANG_URL_PREFIXES[lang];
  if (!prefix) return path;
  return path === "/" ? `/${prefix}` : `/${prefix}${path}`;
}

/**
 * generateMetadata()'da alternates.languages için kullanılan yardımcı —
 * verilen önek'siz path için 5 dilin URL'ini + x-default (TR) üretir.
 * Değerler metadataBase'e göre (layout.tsx) göreceli path olarak dönülür.
 */
export function buildAlternates(path: string): Record<string, string> {
  const languages: Record<string, string> = {};
  (Object.keys(HREFLANG_CODES) as Lang[]).forEach((lang) => {
    languages[HREFLANG_CODES[lang]] = urlForLang(path, lang);
  });
  languages["x-default"] = urlForLang(path, "TR");
  return languages;
}

/** generateMetadata()'da alternates.canonical için — sayfanın kendi dilindeki URL'i. */
export function canonicalForLang(path: string, lang: Lang): string {
  return urlForLang(path, lang);
}

/**
 * sitemap.ts'te her girdinin alternates.languages alanı için — orada
 * metadataBase yok, XML'e yazılan <xhtml:link> mutlak URL gerektirir.
 */
export function buildAbsoluteAlternates(path: string): Record<string, string> {
  const languages: Record<string, string> = {};
  (Object.keys(HREFLANG_CODES) as Lang[]).forEach((lang) => {
    languages[HREFLANG_CODES[lang]] = `${BASE_URL}${urlForLang(path, lang)}`;
  });
  languages["x-default"] = `${BASE_URL}${urlForLang(path, "TR")}`;
  return languages;
}

/**
 * İsteğin GERÇEKTEN hangi URL önekiyle geldiğini döner (middleware.ts'in
 * x-vam-url-lang header'ı üzerinden) — önek yoksa "TR".
 *
 * getLang() (vam_lang çerezi) canonical için GÜVENİLMEZ: çerez önceki bir
 * ziyaretten kalmış olabilir veya geo/Accept-Language fallback'iyle
 * belirlenmiş olabilir, ikisi de o an istenen URL'den bağımsızdır. Örneğin
 * çerezi KU olan bir ziyaretçi önek'siz /impressum'a giderse, getLang()
 * "KU" döner ama gerçek URL /impressum'dur — canonical'ı /ku/impressum
 * yapmak yanlış olur (zaten indekslenmiş TR URL'sini SEO'da riske atar).
 * canonicalForLang() bu yüzden her zaman getUrlLang() ile çağrılmalı.
 */
export async function getUrlLang(): Promise<Lang> {
  const h = await headers();
  const v = h.get(URL_LANG_HEADER);
  return v === "DE" || v === "EN" || v === "KU" || v === "CKB" ? v : "TR";
}

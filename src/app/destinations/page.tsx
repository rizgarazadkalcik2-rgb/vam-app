import { listActiveDestinations } from "@/lib/destinations";
import VamNavbar from "@/app/components/VamNavbar";
import VamFooter from "@/app/components/VamFooter";
import DestinationsGrid from "./DestinationsGrid";
import { getLang } from "@/lib/i18n";
import { getCurrency } from "@/lib/getCurrency";
import { t } from "@/lib/dictionary";
import { buildAlternates, canonicalForLang, getUrlLang } from "@/lib/hreflang";
import "@/app/vam-content.css";

export const dynamic = "force-dynamic";

export async function generateMetadata() {
  const lang = await getLang();
  const urlLang = await getUrlLang();
  return {
    title: t("meta_dest_title", lang),
    description: t("dest_lede", lang),
    alternates: { canonical: canonicalForLang("/destinations", urlLang), languages: buildAlternates("/destinations") },
  };
}

export default async function DestinationsPage() {
  const [destinations, lang, currency] = await Promise.all([listActiveDestinations(), getLang(), getCurrency()]);

  return (
    <div className="vc-root">
      <VamNavbar lang={lang} currency={currency} />

      <div className="vc-pagehead">
        <div className="vc-eyebrow">{t("dest_eyebrow", lang)}</div>
        <h1 className="vc-h1">{t("dest_h1", lang)}</h1>
        <p className="vc-lede">{t("dest_lede", lang)}</p>
      </div>

      <DestinationsGrid destinations={destinations} lang={lang} />

      <VamFooter lang={lang} />
    </div>
  );
}

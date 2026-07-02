import { listActiveDestinations } from "@/lib/destinations";
import VamNavbar from "@/app/components/VamNavbar";
import VamFooter from "@/app/components/VamFooter";
import DestinationsGrid from "./DestinationsGrid";
import { getLang } from "@/lib/i18n";
import { t } from "@/lib/dictionary";
import "@/app/vam-content.css";

export const dynamic = "force-dynamic";

export default async function DestinationsPage() {
  const [destinations, lang] = await Promise.all([listActiveDestinations(), getLang()]);

  return (
    <div className="vc-root">
      <VamNavbar lang={lang} />

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

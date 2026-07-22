import { listActivePackages } from "@/lib/packages";
import VamNavbar from "@/app/components/VamNavbar";
import VamFooter from "@/app/components/VamFooter";
import PackagesClient from "./PackagesClient";
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
    title: t("meta_packages_title", lang),
    description: t("meta_site_desc", lang),
    alternates: { canonical: canonicalForLang("/paketler", urlLang), languages: buildAlternates("/paketler") },
  };
}

export default async function PaketlerPage({
  searchParams,
}: {
  searchParams: Promise<{ dest?: string; exp?: string; guests?: string; date?: string }>;
}) {
  const params = await searchParams;
  const [packages, lang, currency] = await Promise.all([listActivePackages(), getLang(), getCurrency()]);

  return (
    <div className="vc-root">
      <VamNavbar lang={lang} currency={currency} />
      <PackagesClient
        packages={packages}
        initialDest={params.dest || ""}
        initialExp={params.exp || ""}
        initialGuests={params.guests ? Number(params.guests) : 0}
        initialDate={params.date || ""}
        lang={lang}
        currency={currency}
      />
      <VamFooter lang={lang} />
    </div>
  );
}

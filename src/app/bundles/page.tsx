import { listActiveBundles } from "@/lib/bundles";
import VamNavbar from "@/app/components/VamNavbar";
import VamFooter from "@/app/components/VamFooter";
import BundlesClient from "./BundlesClient";
import { getLang } from "@/lib/i18n";
import "@/app/vam-content.css";

export const dynamic = "force-dynamic";

export default async function BundlesPage({
  searchParams,
}: {
  searchParams: Promise<{ dest?: string; exp?: string; guests?: string; date?: string }>;
}) {
  const params = await searchParams;
  const [bundles, lang] = await Promise.all([listActiveBundles(), getLang()]);

  return (
    <div className="vc-root">
      <VamNavbar lang={lang} />
      <BundlesClient
        bundles={bundles}
        initialDest={params.dest || ""}
        initialExp={params.exp || ""}
        initialGuests={params.guests ? Number(params.guests) : 0}
        initialDate={params.date || ""}
        lang={lang}
      />
      <VamFooter lang={lang} />
    </div>
  );
}

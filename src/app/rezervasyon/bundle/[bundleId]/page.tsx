import { notFound } from "next/navigation";
import { getBundleById } from "@/lib/bundles";
import { getLang } from "@/lib/i18n";
import { t } from "@/lib/dictionary";
import ReservationForm from "../../[packageId]/ReservationForm";

// Reservation pages are personal flows — keep them out of search engines.
export const metadata = {
  robots: { index: false, follow: false },
};

export default async function BundleRezervasyonPage({
  params,
}: {
  params: Promise<{ bundleId: string }>;
}) {
  const { bundleId } = await params;
  const [bundle, lang] = await Promise.all([getBundleById(Number(bundleId)), getLang()]);

  if (!bundle || bundle.status !== "active") {
    notFound();
  }

  return (
    <ReservationForm
      lang={lang}
      item={{
        kind: "bundle",
        id: bundle.id,
        title: bundle.title,
        imageUrl: bundle.image_url,
        subtitle: `${(bundle.destinations || []).join(" – ")} · ${bundle.nights} ${t("rez_night", lang)}`,
        unitPrice: Number(bundle.price),
      }}
    />
  );
}

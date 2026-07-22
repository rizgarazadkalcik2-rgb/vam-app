import { notFound } from "next/navigation";
import { getPackageById } from "@/lib/packages";
import { getLang } from "@/lib/i18n";
import { getCurrency } from "@/lib/getCurrency";
import { t } from "@/lib/dictionary";
import ReservationForm from "./ReservationForm";

// Reservation pages are personal flows — keep them out of search engines.
export const metadata = {
  robots: { index: false, follow: false },
};

export default async function RezervasyonPage({
  params,
}: {
  params: Promise<{ packageId: string }>;
}) {
  const { packageId } = await params;
  const [pkg, lang, currency] = await Promise.all([getPackageById(Number(packageId)), getLang(), getCurrency()]);

  if (!pkg || pkg.status !== "active") {
    notFound();
  }

  return (
    <ReservationForm
      lang={lang}
      currency={currency}
      item={{
        kind: "package",
        id: pkg.id,
        title: pkg.title,
        imageUrls: pkg.image_urls && pkg.image_urls.length > 0 ? pkg.image_urls : pkg.image_url ? [pkg.image_url] : [],
        subtitle: `${pkg.destination} · ${pkg.nights} ${t("rez_night", lang)} · ${pkg.partner_name}`,
        unitPrice: Number(pkg.price_try),
      }}
    />
  );
}

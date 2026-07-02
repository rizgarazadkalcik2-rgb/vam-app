import { notFound } from "next/navigation";
import { getPackageById } from "@/lib/packages";
import { getLang } from "@/lib/i18n";
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
  const [pkg, lang] = await Promise.all([getPackageById(Number(packageId)), getLang()]);

  if (!pkg || pkg.status !== "active") {
    notFound();
  }

  return (
    <ReservationForm
      lang={lang}
      item={{
        kind: "package",
        id: pkg.id,
        title: pkg.title,
        imageUrl: pkg.image_url,
        subtitle: `${pkg.destination} · ${pkg.nights} ${t("rez_night", lang)} · ${pkg.partner_name}`,
        unitPrice: Number(pkg.price_try),
      }}
    />
  );
}

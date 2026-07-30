import { notFound } from "next/navigation";
import { getPackageById } from "@/lib/packages";
import { findUserById } from "@/lib/users";
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

  // Turu düzenleyen acentenin profili — hikâyesi doluysa formun yanında
  // "Bu turu kim düzenliyor" kartı gösterilir. Acente hiçbir şey yazmadıysa
  // kart hiç render edilmez (boş bir kart güvenden çok soru işareti yaratır).
  const partner = await findUserById(pkg.partner_id);
  const partnerStory = partner?.company_story?.trim() || "";

  return (
    <ReservationForm
      lang={lang}
      currency={currency}
      item={{
        kind: "package",
        id: pkg.id,
        title: pkg.title,
        imageUrls: pkg.image_urls && pkg.image_urls.length > 0 ? pkg.image_urls : pkg.image_url ? [pkg.image_url] : [],
        subtitle: `${pkg.destination} · ${pkg.nights} ${t(pkg.nights === 1 ? "rez_night_one" : "rez_night", lang)} · ${pkg.partner_name}`,
        unitPrice: Number(pkg.price_try),
      }}
      partner={
        partnerStory
          ? {
              name: pkg.partner_name,
              story: partnerStory,
              since: partner?.company_since ?? null,
              photoUrl: partner?.company_photo_url || null,
            }
          : null
      }
    />
  );
}

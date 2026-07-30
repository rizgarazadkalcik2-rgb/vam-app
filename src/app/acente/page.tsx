import { redirect } from "next/navigation";
import { getSession } from "@/lib/session";
import { listPackagesByPartner } from "@/lib/packages";
import { listReservationsByPartner } from "@/lib/reservations";
import { listUpcomingMatches } from "@/lib/matchEvents";
import { findUserById } from "@/lib/users";
import PartnerPanel from "./PartnerPanel";

export default async function AcentePage() {
  const session = await getSession();
  if (!session) redirect("/giris");
  // admin de acente panelini görmek isterse erişebilir ama kendi datası boş olur;
  // bu sayfa esas partner için, admin /admin'e yönlendirilir.
  if (session.role === "admin") redirect("/admin");

  const packages = await listPackagesByPartner(session.userId);
  const reservations = await listReservationsByPartner(session.userId);
  const upcomingMatches = await listUpcomingMatches();
  // Acentenin kendi firma profili — müşteri tarafındaki "Bu turu kim
  // düzenliyor" kartını besleyen alanlar burada düzenlenir.
  const me = await findUserById(session.userId);

  return (
    <PartnerPanel
      session={session}
      initialPackages={packages}
      initialReservations={reservations}
      upcomingMatches={upcomingMatches}
      initialProfile={{
        companyStory: me?.company_story || "",
        companySince: me?.company_since != null ? String(me.company_since) : "",
        companyPhotoUrl: me?.company_photo_url || "",
      }}
    />
  );
}

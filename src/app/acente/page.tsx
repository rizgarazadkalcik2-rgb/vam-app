import { redirect } from "next/navigation";
import { getSession } from "@/lib/session";
import { listPackagesByPartner } from "@/lib/packages";
import { listReservationsByPartner } from "@/lib/reservations";
import PartnerPanel from "./PartnerPanel";

export default async function AcentePage() {
  const session = await getSession();
  if (!session) redirect("/giris");
  // admin de acente panelini görmek isterse erişebilir ama kendi datası boş olur;
  // bu sayfa esas partner için, admin /admin'e yönlendirilir.
  if (session.role === "admin") redirect("/admin");

  const packages = await listPackagesByPartner(session.userId);
  const reservations = await listReservationsByPartner(session.userId);

  return <PartnerPanel session={session} initialPackages={packages} initialReservations={reservations} />;
}

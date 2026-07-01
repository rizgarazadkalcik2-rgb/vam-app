import { redirect } from "next/navigation";
import { getSession } from "@/lib/session";
import { listAllReservations } from "@/lib/reservations";
import ReservationsPanel from "./ReservationsPanel";

export default async function RezervasyonlarPage() {
  const session = await getSession();
  if (!session) redirect("/giris");
  if (session.role !== "admin") redirect("/acente");

  const reservations = await listAllReservations();

  return <ReservationsPanel session={session} initialReservations={reservations} />;
}

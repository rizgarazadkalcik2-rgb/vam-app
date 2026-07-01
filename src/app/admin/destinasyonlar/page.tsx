import { redirect } from "next/navigation";
import { getSession } from "@/lib/session";
import { listAllDestinations } from "@/lib/destinations";
import DestinationsPanel from "./DestinationsPanel";

export default async function DestinasyonlarPage() {
  const session = await getSession();
  if (!session) redirect("/giris");
  if (session.role !== "admin") redirect("/acente");

  const destinations = await listAllDestinations();

  return <DestinationsPanel session={session} initialDestinations={destinations} />;
}

import { redirect } from "next/navigation";
import { getSession } from "@/lib/session";
import { listAllMatchEvents } from "@/lib/matchEvents";
import MatchWeekendsPanel from "./MatchWeekendsPanel";

export default async function AdminMatchWeekendsPage() {
  const session = await getSession();
  if (!session) redirect("/giris");
  if (session.role !== "admin") redirect("/acente");

  const events = await listAllMatchEvents();

  return <MatchWeekendsPanel session={session} initialEvents={events} />;
}

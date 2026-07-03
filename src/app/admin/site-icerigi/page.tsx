import { redirect } from "next/navigation";
import { getSession } from "@/lib/session";
import { listPlatformStats } from "@/lib/siteStats";
import StatsPanel from "./StatsPanel";

export default async function SiteIcerigiPage() {
  const session = await getSession();
  if (!session) redirect("/giris");
  if (session.role !== "admin") redirect("/acente");

  const stats = await listPlatformStats();

  return <StatsPanel session={session} initialStats={stats} />;
}

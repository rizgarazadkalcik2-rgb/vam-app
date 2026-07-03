import { redirect } from "next/navigation";
import { getSession } from "@/lib/session";
import { listPlatformStats } from "@/lib/siteStats";
import { listPageSections } from "@/lib/pageSections";
import { getAnnouncement } from "@/lib/announcement";
import SiteIcerigiPanel from "./SiteIcerigiPanel";

export default async function SiteIcerigiPage() {
  const session = await getSession();
  if (!session) redirect("/giris");
  if (session.role !== "admin") redirect("/acente");

  const [stats, sections, announcement] = await Promise.all([
    listPlatformStats(),
    listPageSections("platform"),
    getAnnouncement(),
  ]);

  return (
    <SiteIcerigiPanel
      session={session}
      initialStats={stats}
      initialSections={sections}
      initialAnnouncement={announcement}
    />
  );
}

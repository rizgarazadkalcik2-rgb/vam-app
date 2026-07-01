import { redirect } from "next/navigation";
import { getSession } from "@/lib/session";
import { listAllBundles } from "@/lib/bundles";
import BundlesPanel from "./BundlesPanel";

export default async function AdminBundlesPage() {
  const session = await getSession();
  if (!session) redirect("/giris");
  if (session.role !== "admin") redirect("/acente");

  const bundles = await listAllBundles();

  return <BundlesPanel session={session} initialBundles={bundles} />;
}

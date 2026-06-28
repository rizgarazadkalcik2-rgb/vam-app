import { redirect } from "next/navigation";
import { getSession } from "@/lib/session";
import { listAllPackages } from "@/lib/packages";
import AdminPanel from "./AdminPanel";

export default async function AdminPage() {
  const session = await getSession();
  if (!session) redirect("/giris");
  if (session.role !== "admin") redirect("/acente");

  const packages = await listAllPackages();

  return <AdminPanel session={session} initialPackages={packages} />;
}

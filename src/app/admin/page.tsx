import { redirect } from "next/navigation";
import { getSession } from "@/lib/session";
import { listAllPackages } from "@/lib/packages";
import { listAllUsers } from "@/lib/users";
import AdminPanel from "./AdminPanel";

export default async function AdminPage() {
  const session = await getSession();
  if (!session) redirect("/giris");
  if (session.role !== "admin") redirect("/acente");

  const packages = await listAllPackages();
  const users = await listAllUsers();
  const partners = users
    .filter((u) => u.role === "partner" && u.status === "active")
    .map(({ id, display_name }) => ({ id, display_name }));

  return <AdminPanel session={session} initialPackages={packages} partners={partners} />;
}

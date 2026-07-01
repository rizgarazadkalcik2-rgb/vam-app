import { redirect } from "next/navigation";
import { getSession } from "@/lib/session";
import { listAllUsers } from "@/lib/users";
import AcentelerPanel from "./AcentelerPanel";

export default async function AcentelerPage() {
  const session = await getSession();
  if (!session) redirect("/giris");
  if (session.role !== "admin") redirect("/acente");

  const users = await listAllUsers();
  const safeUsers = users.map(({ password_hash, ...rest }) => rest);

  return <AcentelerPanel session={session} initialUsers={safeUsers} />;
}

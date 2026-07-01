import { notFound } from "next/navigation";
import { getPackageById } from "@/lib/packages";
import ReservationForm from "./ReservationForm";

export default async function RezervasyonPage({
  params,
}: {
  params: Promise<{ packageId: string }>;
}) {
  const { packageId } = await params;
  const pkg = await getPackageById(Number(packageId));

  if (!pkg || pkg.status !== "active") {
    notFound();
  }

  return <ReservationForm pkg={pkg} />;
}

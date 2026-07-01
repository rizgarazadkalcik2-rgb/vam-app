import { notFound } from "next/navigation";
import { getPackageById } from "@/lib/packages";
import { getReservedGuestCountForPackage } from "@/lib/reservations";
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

  // capacity 0/tanımsız ise "sınırsız/belirtilmemiş" kabul edilir, kalan yer gösterilmez.
  const reserved = pkg.capacity > 0 ? await getReservedGuestCountForPackage(pkg.id) : 0;
  const remaining = pkg.capacity > 0 ? Math.max(pkg.capacity - reserved, 0) : null;

  return <ReservationForm pkg={pkg} remainingSpots={remaining} />;
}

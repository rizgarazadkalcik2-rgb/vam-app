import { listActiveDestinations } from "@/lib/destinations";
import VamNavbar from "@/app/components/VamNavbar";
import VamFooter from "@/app/components/VamFooter";
import DestinationsGrid from "./DestinationsGrid";
import "@/app/vam-content.css";

export const dynamic = "force-dynamic";

export default async function DestinationsPage() {
  const destinations = await listActiveDestinations();

  return (
    <div className="vc-root">
      <VamNavbar />

      <div className="vc-pagehead">
        <div className="vc-eyebrow">— Keşfet</div>
        <h1 className="vc-h1">Anadolu ve Mezopotamya&apos;nın Kadim Durakları</h1>
        <p className="vc-lede">
          Göbeklitepe&apos;nin taşlarından Ani&apos;nin kiliselerine — on beş binyıllık bir
          coğrafyada, küratörlü duraklar.
        </p>
      </div>

      <DestinationsGrid destinations={destinations} />

      <VamFooter />
    </div>
  );
}

import Image from "next/image";

const BLOB_HOST_SUFFIX = ".public.blob.vercel-storage.com";

function isOptimizable(url: string): boolean {
  // Kök-göreli yerel /public dosyaları ("//" ile başlayan protokol-göreli
  // dış host URL'leri hariç) next/image'da hiçbir remotePatterns config'i
  // gerekmeden optimize edilebilir — bazı seed destinasyonların image_url'i
  // bu şekilde (örn. /images/destinations/mardin.jpg), önceden new URL()
  // göreli path'te fırlattığı için bunlar hep düz <img>'e düşüyordu.
  if (url.startsWith("/") && !url.startsWith("//")) return true;
  try {
    return new URL(url).hostname.endsWith(BLOB_HOST_SUFFIX);
  } catch {
    return false;
  }
}

type Props = { src: string; alt: string; className?: string } & (
  | { fill: true; sizes: string; width?: never; height?: never }
  | { fill?: false; width: number; height: number; sizes?: never }
);

/**
 * image_url alanları admin panelde hem Vercel Blob yüklemesi hem serbest URL
 * girişi destekliyor. next/image yapılandırılmamış domain'ler için hata
 * fırlattığından, sadece Blob URL'leri optimize edilir — diğerleri eskisi
 * gibi düz <img> olarak render edilir (regresyon yok).
 */
export default function SmartImage({ src, alt, className, ...rest }: Props) {
  if (!isOptimizable(src)) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={src} alt={alt} className={className} />;
  }
  return rest.fill ? (
    <Image src={src} alt={alt} fill sizes={rest.sizes} className={className} />
  ) : (
    <Image src={src} alt={alt} width={rest.width} height={rest.height} className={className} />
  );
}

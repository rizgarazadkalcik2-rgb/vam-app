// META / OPEN GRAPH / CANONICAL — Next.js sayfaları için (App Router)
// ---------------------------------------------------------------------
// Bu dosyanın kendisi projeye eklenmiyor — her ilgili page.tsx dosyasının
// EN ÜSTÜNE, component'in dışına, aşağıdaki gibi bir `generateMetadata`
// (veya statik sayfalarda düz `export const metadata`) bloğu ekleniyor.
//
// Nereye ekleyeceksiniz:
//   app/destinations/page.tsx        -> örnek 1
//   app/destinations/[slug]/page.tsx -> örnek 2 (dinamik)
//   app/bundles/page.tsx             -> örnek 1 mantığıyla
//   app/bundles/[slug]/page.tsx      -> örnek 2 mantığıyla

import type { Metadata } from 'next'

// ---------------------------------------------------------------------
// ÖRNEK 1: Statik/listeleme sayfası (app/destinations/page.tsx içine)
// ---------------------------------------------------------------------
export const metadata: Metadata = {
  title: 'Destinasyonlar | VAM — Visit Anatolia and Mesopotamia',
  description:
    "Göbeklitepe'den Ani Harabeleri'ne, Anadolu ve Mezopotamya'nın 12.000 yıllık kadim duraklarını keşfedin. Küratörlü destinasyon rehberleri.",
  alternates: {
    canonical: 'https://visitvam.com/destinations',
  },
  openGraph: {
    title: 'Destinasyonlar | VAM',
    description:
      "Anadolu ve Mezopotamya'nın 12.000 yıllık kadim duraklarını keşfedin.",
    url: 'https://visitvam.com/destinations',
    siteName: 'VAM — Visit Anatolia and Mesopotamia',
    images: [
      {
        url: 'https://visitvam.com/og/destinations-og.jpg', // 1200x630 önerilir
        width: 1200,
        height: 630,
      },
    ],
    locale: 'tr_TR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Destinasyonlar | VAM',
    description:
      "Anadolu ve Mezopotamya'nın 12.000 yıllık kadim duraklarını keşfedin.",
    images: ['https://visitvam.com/og/destinations-og.jpg'],
  },
}

// ---------------------------------------------------------------------
// ÖRNEK 2: Dinamik sayfa (app/destinations/[slug]/page.tsx içine)
// generateMetadata, veritabanından çektiğiniz destinasyon verisini
// kullanarak her destinasyona ÖZEL meta üretir (bu, "içerik boşluğu"
// ve tekrarlayan/aynı meta sorununu da önler).
// ---------------------------------------------------------------------
type Props = {
  params: { slug: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  // Kendi veri çekme fonksiyonunuzu kullanın — bu sadece örnek:
  // const destination = await getDestinationBySlug(params.slug)
  const destination = {
    name: 'Örnek Destinasyon',
    description: 'Destinasyona özel açıklama buraya gelecek.',
    imageUrl: 'https://visitvam.com/images/destinations/ornek.jpg',
  }

  const title = `${destination.name} | VAM`
  const description = destination.description.slice(0, 155)
  const url = `https://visitvam.com/destinations/${params.slug}`

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: 'VAM — Visit Anatolia and Mesopotamia',
      images: [{ url: destination.imageUrl, width: 1200, height: 630 }],
      locale: 'tr_TR',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [destination.imageUrl],
    },
  }
}

// ---------------------------------------------------------------------
// KÖK LAYOUT (app/layout.tsx) İÇİN VARSAYILAN/FALLBACK METADATA
// Her sayfa kendi metadata'sını override etmezse bu kullanılır.
// Eğer layout.tsx'te zaten bir `metadata` export'u varsa, onu SİLMEYİN,
// aşağıdaki alanları içine BİRLEŞTİRİN.
// ---------------------------------------------------------------------
export const rootLayoutMetadata: Metadata = {
  metadataBase: new URL('https://visitvam.com'),
  title: {
    default: 'VAM — Visit Anatolia and Mesopotamia',
    template: '%s | VAM',
  },
  description:
    "Göbeklitepe'den Çatalhöyük'e — 12.000 yıllık kültürel mirasın içinden küratörlü deneyimler ve uzman rehberli bundle paketleri.",
  openGraph: {
    type: 'website',
    locale: 'tr_TR',
    siteName: 'VAM — Visit Anatolia and Mesopotamia',
    images: [
      {
        url: 'https://visitvam.com/og/default-og.jpg',
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
  },
}

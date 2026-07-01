import type { MetadataRoute } from 'next'

// Kopyala -> yapıştır: app/manifest.ts
// Next.js bu dosyadan otomatik olarak /manifest.webmanifest üretir ve
// <head>'e bağlar. "Ana ekrana ekle" (Add to Home Screen) özelliğini açar.
//
// NOT: icons altındaki dosya yollarını kendi public/ klasörünüzdeki
// gerçek logo dosyalarınıza göre güncelleyin (VAM logosu, siyah zemin).
// 192x192 ve 512x512 boyutlarında PNG önerilir.

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'VAM — Visit Anatolia and Mesopotamia',
    short_name: 'VAM',
    description: 'On bin yıllık topraklarda yeni çağın turizmi. Göbeklitepe\'den Çatalhöyük\'e küratörlü deneyimler ve rehberli bundle paketleri.',
    start_url: '/platform',
    display: 'standalone',
    background_color: '#1A1A1A',
    theme_color: '#1A1A1A',
    lang: 'tr',
    icons: [
      {
        src: '/logo/vam-logo-192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/logo/vam-logo-512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  }
}

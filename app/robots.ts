import type { MetadataRoute } from 'next'

// Next.js App Router: bu dosya /robots.txt'i otomatik üretir.
// Kopyala -> yapıştır: app/robots.ts (kök app klasörünüzün içine)
// Eğer projenizde farklı bir domain kullanıyorsanız BASE_URL'i güncelleyin.

const BASE_URL = 'https://visitvam.com'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/giris',        // yönetici/acente giriş sayfası indexlenmesin
          '/admin',        // admin paneli ve tüm alt sayfaları
          '/admin/',
          '/acente',       // acente paneli
          '/api/',         // API route'ları indexlenmesin
          '/rezervasyon/', // kişisel rezervasyon adımları indexlenmesin
        ],
      },
    ],
    sitemap: `${BASE_URL}/sitemap.xml`,
  }
}

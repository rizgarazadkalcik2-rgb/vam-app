import type { MetadataRoute } from 'next'

const BASE_URL = 'https://visitvam.com'

export default function robots(): MetadataRoute.Robots {
    return {
          rules: [
            {
                      userAgent: '*',
                      allow: '/',
                      disallow: ['/giris', '/admin', '/admin/', '/acente', '/api/', '/rezervasyon/'],
            },
                ],
          sitemap: `${BASE_URL}/sitemap.xml`,
    }
}

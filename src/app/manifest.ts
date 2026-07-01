import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
    return {
          name: 'VAM — Visit Anatolia and Mesopotamia',
          short_name: 'VAM',
          description: 'On bin yillik topraklarda yeni cagin turizmi.',
          start_url: '/platform',
          display: 'standalone',
          background_color: '#1A1A1A',
          theme_color: '#1A1A1A',
          lang: 'tr',
          icons: [
            { src: '/logo/vam-logo-192.png', sizes: '192x192', type: 'image/png' },
            { src: '/logo/vam-logo-512.png', sizes: '512x512', type: 'image/png' },
                ],
    }
}

import type { MetadataRoute } from 'next'
import { getLang } from '@/lib/i18n'
import { t } from '@/lib/dictionary'

const MANIFEST_LOCALES: Record<string, string> = {
  TR: 'tr', DE: 'de', EN: 'en', KU: 'ku', CKB: 'ckb',
}

export default async function manifest(): Promise<MetadataRoute.Manifest> {
    const lang = await getLang()
    return {
          name: 'VAM — Visit Anatolia and Mesopotamia',
          short_name: 'VAM',
          description: t('meta_site_desc', lang),
          start_url: '/',
          display: 'standalone',
          background_color: '#1A1A1A',
          theme_color: '#1A1A1A',
          lang: MANIFEST_LOCALES[lang] || 'tr',
          icons: [
            { src: '/logo/vam-logo-192.png', sizes: '192x192', type: 'image/png' },
            { src: '/logo/vam-logo-512.png', sizes: '512x512', type: 'image/png' },
                ],
    }
}

import type { MetadataRoute } from 'next'
import { sql } from '@vercel/postgres'
import { buildAbsoluteAlternates } from '@/lib/hreflang'

const BASE_URL = 'https://visitvam.com'

// Sitemap her istekte calisma aninda uretilir — admin'den eklenen icerik aninda gorunur
export const dynamic = 'force-dynamic'

async function getDestinationSlugs(): Promise<string[]> {
  try {
    const { rows } = await sql`SELECT slug FROM destinations WHERE status = 'active'`
    console.log(`sitemap: ${rows.length} destination slug bulundu`)
    return rows.map((r: any) => r.slug)
  } catch (e) {
    console.error('sitemap: destinations sorgusu basarisiz', e)
    return []
  }
}

async function getBundleSlugs(): Promise<string[]> {
  try {
    const { rows } = await sql`SELECT slug FROM bundles WHERE status = 'active'`
    console.log(`sitemap: ${rows.length} bundle slug bulundu`)
    return rows.map((r: any) => r.slug)
  } catch (e) {
    console.error('sitemap: bundles sorgusu basarisiz', e)
    return []
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [destinationSlugs, bundleSlugs] = await Promise.all([
    getDestinationSlugs(),
    getBundleSlugs(),
  ])

  const staticRoutes: MetadataRoute.Sitemap = [
    { path: '/', changeFrequency: 'weekly' as const, priority: 1.0 },
    { path: '/match-weekends', changeFrequency: 'weekly' as const, priority: 0.9 },
    { path: '/destinations', changeFrequency: 'weekly' as const, priority: 0.9 },
    { path: '/bundles', changeFrequency: 'weekly' as const, priority: 0.9 },
    { path: '/experiences', changeFrequency: 'weekly' as const, priority: 0.8 },
    { path: '/about', changeFrequency: 'monthly' as const, priority: 0.5 },
    { path: '/impressum', changeFrequency: 'yearly' as const, priority: 0.3 },
    { path: '/mesafeli-satis-sozlesmesi', changeFrequency: 'yearly' as const, priority: 0.2 },
    { path: '/gizlilik-politikasi', changeFrequency: 'yearly' as const, priority: 0.2 },
    { path: '/iptal-iade-politikasi', changeFrequency: 'yearly' as const, priority: 0.2 },
    { path: '/teslimat-hizmet-sartlari', changeFrequency: 'yearly' as const, priority: 0.2 },
  ].map(({ path, changeFrequency, priority }) => ({
    url: `${BASE_URL}${path}`,
    changeFrequency,
    priority,
    alternates: { languages: buildAbsoluteAlternates(path) },
  }))

  const destinationRoutes: MetadataRoute.Sitemap = destinationSlugs.map((slug) => ({
    url: `${BASE_URL}/destinations/${slug}`,
    changeFrequency: 'monthly',
    priority: 0.7,
    alternates: { languages: buildAbsoluteAlternates(`/destinations/${slug}`) },
  }))

  const bundleRoutes: MetadataRoute.Sitemap = bundleSlugs.map((slug) => ({
    url: `${BASE_URL}/bundles/${slug}`,
    changeFrequency: 'monthly',
    priority: 0.7,
    alternates: { languages: buildAbsoluteAlternates(`/bundles/${slug}`) },
  }))

  return [...staticRoutes, ...destinationRoutes, ...bundleRoutes]
}

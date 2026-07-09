import type { MetadataRoute } from 'next'
import { sql } from '@vercel/postgres'

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
    { url: `${BASE_URL}/platform`, changeFrequency: 'weekly', priority: 1.0 },
    { url: `${BASE_URL}/match-weekends`, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${BASE_URL}/destinations`, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${BASE_URL}/bundles`, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${BASE_URL}/experiences`, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${BASE_URL}/about`, changeFrequency: 'monthly', priority: 0.5 },
    { url: `${BASE_URL}/impressum`, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${BASE_URL}/mesafeli-satis-sozlesmesi`, changeFrequency: 'yearly', priority: 0.2 },
    { url: `${BASE_URL}/gizlilik-politikasi`, changeFrequency: 'yearly', priority: 0.2 },
    { url: `${BASE_URL}/iptal-iade-politikasi`, changeFrequency: 'yearly', priority: 0.2 },
    { url: `${BASE_URL}/teslimat-hizmet-sartlari`, changeFrequency: 'yearly', priority: 0.2 },
  ]

  const destinationRoutes: MetadataRoute.Sitemap = destinationSlugs.map((slug) => ({
    url: `${BASE_URL}/destinations/${slug}`,
    changeFrequency: 'monthly',
    priority: 0.7,
  }))

  const bundleRoutes: MetadataRoute.Sitemap = bundleSlugs.map((slug) => ({
    url: `${BASE_URL}/bundles/${slug}`,
    changeFrequency: 'monthly',
    priority: 0.7,
  }))

  return [...staticRoutes, ...destinationRoutes, ...bundleRoutes]
}

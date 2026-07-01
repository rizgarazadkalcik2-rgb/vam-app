import type { MetadataRoute } from 'next'
import { neon } from '@neondatabase/serverless'

const BASE_URL = 'https://visitvam.com'

async function getDestinationSlugs(): Promise<string[]> {
    try {
          const sql = neon(process.env.DATABASE_URL!)
          const rows = await sql`SELECT slug FROM destinations`
          return rows.map((r: any) => r.slug)
    } catch (e) {
          console.error('sitemap: destinations sorgusu basarisiz', e)
          return []
    }
}

async function getBundleSlugs(): Promise<string[]> {
    try {
          const sql = neon(process.env.DATABASE_URL!)
          const rows = await sql`SELECT slug FROM bundles`
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
    { url: `${BASE_URL}/destinations`, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${BASE_URL}/bundles`, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${BASE_URL}/experiences`, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${BASE_URL}/about`, changeFrequency: 'monthly', priority: 0.5 },
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

import type { MetadataRoute } from 'next'

// Kopyala -> yapıştır: app/sitemap.ts
// Bu dosya /sitemap.xml'i otomatik üretir.
//
// ÖNEMLİ: Aşağıdaki "getDestinationSlugs" ve "getBundleSlugs" fonksiyonları
// sizin mevcut Postgres bağlantı katmanınıza (Neon) göre uyarlanmalı.
// Muhtemelen zaten /destinations ve /bundles sayfalarınızda kullandığınız
// bir `db` veya `sql` client'ınız var (Neon serverless driver gibi) —
// onu buraya import edip aynı sorguyu kullanın.
//
// Aşağıda örnek olması için Neon'un `@neondatabase/serverless` paketiyle
// yazılmış bir versiyon var. Kendi bağlantı dosyanızdaki export'a göre
// `import { sql } from '@/lib/db'` satırını güncelleyin.

import { neon } from '@neondatabase/serverless'

const BASE_URL = 'https://visitvam.com'

async function getDestinationSlugs(): Promise<string[]> {
  try {
    const sql = neon(process.env.DATABASE_URL!)
    const rows = await sql`SELECT slug FROM destinations`
    return rows.map((r: any) => r.slug)
  } catch (e) {
    console.error('sitemap: destinations sorgusu başarısız', e)
    return []
  }
}

async function getBundleSlugs(): Promise<string[]> {
  try {
    const sql = neon(process.env.DATABASE_URL!)
    const rows = await sql`SELECT slug FROM bundles`
    return rows.map((r: any) => r.slug)
  } catch (e) {
    console.error('sitemap: bundles sorgusu başarısız', e)
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

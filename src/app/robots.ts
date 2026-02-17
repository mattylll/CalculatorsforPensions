import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/dashboard/', '/analysis/'],
      },
    ],
    sitemap: 'https://calculatorsforpensions.com/sitemap.xml',
  }
}

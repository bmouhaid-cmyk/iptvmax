import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = 'https://tv4watch.com'
    const languages = ['en', 'fr', 'es', 'ar']
    const routes = ['', '/pricing', '/auth/login', '/checkout']

    const sitemapEntries = routes.flatMap((route) =>
        languages.map((lang) => ({
            url: `${baseUrl}/${lang}${route}`,
            lastModified: new Date(),
            changeFrequency: 'daily' as const,
            priority: route === '' ? 1 : 0.8,
        }))
    )

    return [
        {
            url: baseUrl,
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 1,
        },
        ...sitemapEntries,
    ]
}

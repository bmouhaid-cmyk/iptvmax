import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
    return {
        rules: {
            userAgent: '*',
            allow: '/',
            disallow: ['/api/', '/admin/', '/ta7akom/'],
        },
        sitemap: 'https://tv4watch.com/sitemap.xml',
    }
}

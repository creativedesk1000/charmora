import { MetadataRoute } from 'next';
import prisma from "@/lib/db";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = 'https://www.cinderellazcharmora.com';

    // Static pages
    const staticPages = [
        '',
        '/shop',
        '/track',
        '/about',
        '/contact',
        '/shipping',
        '/return-policy',
        '/privacy',
        '/terms',
        '/care-instructions',
    ].map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date(),
        changeFrequency: (route === '' || route === '/shop' ? 'daily' : 'monthly') as 'daily' | 'monthly',
        priority: route === '' ? 1.0 : (route === '/shop' ? 0.9 : 0.6),
    }));

    try {
        // Fetch active products
        const products = await prisma.product.findMany({
            where: { status: 'ACTIVE' },
            select: { slug: true, updatedAt: true },
        });

        const productUrls = products.map((product) => ({
            url: `${baseUrl}/shop/${product.slug}`,
            lastModified: product.updatedAt,
            changeFrequency: 'weekly' as const,
            priority: 0.8,
        }));

        // Fetch categories
        const categories = await prisma.category.findMany({
            select: { slug: true, updatedAt: true },
        });

        const categoryUrls = categories.map((category) => ({
            url: `${baseUrl}/shop?category=${category.slug}`,
            lastModified: category.updatedAt,
            changeFrequency: 'weekly' as const,
            priority: 0.7,
        }));

        return [...staticPages, ...categoryUrls, ...productUrls];
    } catch (error) {
        console.error("Error generating dynamic sitemap:", error);
        // Fallback to static if db fails during build
        return staticPages;
    }
}

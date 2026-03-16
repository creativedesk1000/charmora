export const dynamic = "force-dynamic";

import prisma from "@/lib/db";
import ProductsClient from "@/app/admin/products/ProductsClient";

export default async function ProductsPage() {
    const products = await prisma.product.findMany({
        include: { category: true },
        orderBy: { createdAt: "desc" },
    });

    const categories = await prisma.category.findMany();

    return (
        <ProductsClient
            initialProducts={JSON.parse(JSON.stringify(products))}
            categories={categories}
        />
    );
}

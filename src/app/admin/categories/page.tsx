import prisma from "@/lib/db";
import CategoriesClient from "@/app/admin/categories/CategoriesClient";

export default async function CategoriesPage() {
    const categories = await prisma.category.findMany({
        include: {
            _count: {
                select: { products: true }
            }
        },
        orderBy: { name: "asc" }
    });

    return (
        <CategoriesClient
            initialCategories={JSON.parse(JSON.stringify(categories))}
        />
    );
}

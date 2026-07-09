import db from "@/lib/db";
import ShopByStyleClient from "@/components/ui/ShopByStyleClient";

export default async function ShopByCategory() {
    const categories = await db.category.findMany({
        include: {
            _count: {
                select: { products: true }
            }
        }
    });

    return (
        <ShopByStyleClient categories={categories} />
    );
}

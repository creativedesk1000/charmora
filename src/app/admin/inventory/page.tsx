import prisma from "@/lib/db";
import InventoryClient from "@/app/admin/inventory/InventoryClient";

export default async function InventoryPage() {
    const products = await prisma.product.findMany({
        include: { category: true },
        orderBy: { stock: "asc" }, // Show low stock first
    });

    return (
        <InventoryClient
            initialProducts={JSON.parse(JSON.stringify(products))}
        />
    );
}

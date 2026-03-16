export const dynamic = "force-dynamic";

import prisma from "@/lib/db";
import OrdersClient from "@/app/admin/orders/OrdersClient";

export default async function OrdersPage() {
    const orders = await prisma.order.findMany({
        include: {
            items: true
        },
        orderBy: { createdAt: "desc" }
    });

    return (
        <OrdersClient
            initialOrders={JSON.parse(JSON.stringify(orders))}
        />
    );
}

export const dynamic = "force-dynamic";

import prisma from "@/lib/db";
import DashboardClient from "@/app/admin/DashboardClient";

export default async function AdminDashboard() {
    let productCount = 0;
    let categoryCount = 0;
    let userCount = 0;
    let orders: any[] = [];

    try {
        const results = await Promise.all([
            prisma.product.count(),
            prisma.category.count(),
            prisma.user.count(),
            prisma.order.findMany({
                take: 5,
                orderBy: { createdAt: "desc" },
                include: { user: true }
            })
        ]);
        productCount = results[0];
        categoryCount = results[1];
        userCount = results[2];
        orders = results[3];
    } catch (error) {
        console.error("Failed to fetch dashboard stats:", error);
    }

    const totalRevenue = orders.reduce((acc: number, order: any) => acc + order.totalAmount, 0);

    const stats = [
        { label: "Total Revenue", value: `PKR ${totalRevenue.toLocaleString()}`, change: "+0%", icon: "DollarSign", color: "bg-emerald-500" },
        { label: "Total Orders", value: orders.length.toString(), change: "+0%", icon: "ShoppingBag", color: "bg-blue-500" },
        { label: "Total Products", value: productCount.toString(), change: "+0%", icon: "Package", color: "bg-amber-500" },
        { label: "Total Users", value: userCount.toString(), change: "+0%", icon: "Users", color: "bg-purple-500" },
    ];

    return (
        <DashboardClient
            stats={stats}
            recentOrders={JSON.parse(JSON.stringify(orders))}
        />
    );
}

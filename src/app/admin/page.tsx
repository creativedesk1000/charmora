export const dynamic = "force-dynamic";

import prisma from "@/lib/db";
import DashboardClient from "@/app/admin/DashboardClient";

export default async function AdminDashboard() {
    let productCount = 0;
    let categoryCount = 0;
    let userCount = 0;
    let orderCount = 0;
    let totalRevenue = 0;
    let recentOrders: any[] = [];

    try {
        const validOrderStatuses = ["PENDING", "PROCESSING", "SHIPPED", "DELIVERED"];
        
        const results = await Promise.all([
            prisma.product.count(),
            prisma.category.count(),
            prisma.user.count(),
            prisma.order.count({
                where: { status: { in: validOrderStatuses as any } }
            }),
            prisma.order.aggregate({
                _sum: { totalAmount: true },
                where: { status: { in: validOrderStatuses as any } }
            }),
            prisma.order.findMany({
                where: { status: { in: validOrderStatuses as any } },
                take: 5,
                orderBy: { createdAt: "desc" },
                include: { user: true }
            })
        ]);
        
        productCount = results[0];
        categoryCount = results[1];
        userCount = results[2];
        orderCount = results[3];
        totalRevenue = results[4]._sum.totalAmount || 0;
        recentOrders = results[5];
    } catch (error) {
        console.error("Failed to fetch dashboard stats:", error);
    }

    const stats = [
        { label: "Total Revenue", value: `PKR ${totalRevenue.toLocaleString()}`, change: "+0%", icon: "DollarSign", color: "bg-emerald-500" },
        { label: "Total Orders", value: orderCount.toString(), change: "+0%", icon: "ShoppingBag", color: "bg-blue-500" },
        { label: "Total Products", value: productCount.toString(), change: "+0%", icon: "Package", color: "bg-amber-500" },
        { label: "Total Users", value: userCount.toString(), change: "+0%", icon: "Users", color: "bg-purple-500" },
    ];

    return (
        <DashboardClient
            stats={stats}
            recentOrders={JSON.parse(JSON.stringify(recentOrders))}
        />
    );
}

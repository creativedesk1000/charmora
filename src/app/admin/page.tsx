import prisma from "@/lib/db";
import DashboardClient from "@/app/admin/DashboardClient";

export default async function AdminDashboard() {
    const [productCount, categoryCount, userCount, orders] = await Promise.all([
        prisma.product.count(),
        prisma.category.count(),
        prisma.user.count(),
        prisma.order.findMany({
            take: 5,
            orderBy: { createdAt: "desc" },
            include: { user: true }
        })
    ]);

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

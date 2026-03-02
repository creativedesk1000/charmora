"use client";

import React from "react";
import {
    Users,
    ShoppingBag,
    DollarSign,
    Package,
    TrendingUp,
    AlertCircle,
    Clock
} from "lucide-react";
import { motion } from "framer-motion";

const iconMap = {
    Users,
    ShoppingBag,
    DollarSign,
    Package
};

export default function DashboardClient({ stats, recentOrders }: { stats: any[], recentOrders: any[] }) {
    return (
        <div className="space-y-10 pb-12">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-serif font-bold text-neutral-900 leading-tight">Business Overview</h1>
                    <p className="text-neutral-500 text-sm mt-1 font-sans">Welcome back, Admin. Here's what's happening today.</p>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, index) => {
                    const Icon = iconMap[stat.icon as keyof typeof iconMap];
                    return (
                        <motion.div
                            key={stat.label}
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: index * 0.1 }}
                            className="bg-white p-6 rounded-3xl shadow-sm border border-neutral-100 hover:shadow-xl transition-all duration-300 group cursor-default"
                        >
                            <div className="flex items-center justify-between mb-4">
                                <div className={`p-3 rounded-2xl ${stat.color} text-white transition-transform`}>
                                    <Icon size={22} />
                                </div>
                                <div className="flex items-center gap-1 text-emerald-500 bg-emerald-50 px-2 py-1 rounded-full text-[10px] font-bold">
                                    <TrendingUp size={10} />
                                    {stat.change}
                                </div>
                            </div>
                            <h3 className="text-neutral-500 text-xs font-bold uppercase tracking-widest">{stat.label}</h3>
                            <p className="text-2xl font-serif font-bold text-neutral-900 mt-1">{stat.value}</p>
                        </motion.div>
                    );
                })}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Recent Orders Section */}
                <div className="lg:col-span-2 bg-white rounded-3xl border border-neutral-100 shadow-sm overflow-hidden flex flex-col">
                    <div className="p-6 border-b border-neutral-100 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-2xl bg-neutral-900 flex items-center justify-center text-white">
                                <Clock size={20} />
                            </div>
                            <h2 className="font-serif font-bold text-xl">Recent Orders</h2>
                        </div>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="bg-neutral-50/50 text-neutral-400 text-[10px] uppercase font-bold tracking-widest border-b border-neutral-100">
                                    <th className="px-6 py-4">Order ID</th>
                                    <th className="px-6 py-4">Customer</th>
                                    <th className="px-6 py-4">Status</th>
                                    <th className="px-6 py-4 text-right">Amount</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-neutral-100">
                                {recentOrders.length > 0 ? recentOrders.map((order) => (
                                    <tr key={order.id} className="group hover:bg-neutral-50 transition-colors cursor-pointer">
                                        <td className="px-6 py-4 font-mono text-xs font-bold text-neutral-500">{order.id.substring(0, 8)}</td>
                                        <td className="px-6 py-4 font-sans text-sm font-medium">{order.user?.name || "Guest"}</td>
                                        <td className="px-6 py-4">
                                            <span className="px-3 py-1 rounded-full text-[10px] font-bold bg-neutral-100 text-neutral-600">
                                                {order.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-right font-serif font-bold text-neutral-900">PKR {order.totalAmount.toLocaleString()}</td>
                                    </tr>
                                )) : (
                                    <tr>
                                        <td colSpan={4} className="px-6 py-10 text-center text-neutral-400 italic">No recent activity.</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Info Card */}
                <div className="space-y-6">
                    <div className="bg-charmora-purple rounded-3xl p-6 text-white shadow-2xl relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-8 opacity-10 blur-xl">
                            <ShoppingBag size={120} />
                        </div>
                        <h3 className="font-serif font-bold text-lg mb-4">Stock Integrity</h3>
                        <p className="text-white/60 text-xs mb-6 font-sans">Manage your artisan pieces and global collections from one centralized vault.</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

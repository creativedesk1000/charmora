"use client";

import React, { useState } from "react";
import {
    Eye,
    CheckCircle2,
    Clock,
    Truck,
    XCircle,
    PackageCheck
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const statusStyles = {
    PENDING: "bg-amber-100 text-amber-600 border-amber-200",
    PROCESSING: "bg-blue-100 text-blue-600 border-blue-200",
    SHIPPED: "bg-purple-100 text-purple-600 border-purple-200",
    DELIVERED: "bg-emerald-100 text-emerald-600 border-emerald-200",
    CANCELLED: "bg-red-100 text-red-600 border-red-200",
};

const statusIcons = {
    PENDING: Clock,
    PROCESSING: PackageCheck,
    SHIPPED: Truck,
    DELIVERED: CheckCircle2,
    CANCELLED: XCircle,
};

export default function OrdersClient({ initialOrders }: { initialOrders: any[] }) {
    const [activeTab, setActiveTab] = useState("All");
    const tabs = ["All", "PENDING", "PROCESSING", "SHIPPED", "DELIVERED", "CANCELLED"];

    const filteredOrders = activeTab === "All"
        ? initialOrders
        : initialOrders.filter(o => o.status === activeTab);

    return (
        <div className="space-y-8 pb-12">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h1 className="text-3xl font-serif font-bold text-neutral-900 leading-tight">Order Logistix</h1>
                    <p className="text-neutral-500 text-sm mt-1 font-sans">Track and fulfill your global luxury orders in real-time.</p>
                </div>
            </div>

            {/* Tabs */}
            <div className="flex flex-wrap items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
                {tabs.map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`px-6 py-3 rounded-2xl text-xs font-bold transition-all whitespace-nowrap ${activeTab === tab
                            ? "bg-neutral-900 text-white shadow-xl"
                            : "bg-white text-neutral-500 hover:text-neutral-900 border border-neutral-100"
                            }`}
                    >
                        {tab}
                    </button>
                ))}
            </div>

            {/* Table Section */}
            <div className="bg-white rounded-[2rem] border border-neutral-100 shadow-xl overflow-hidden flex flex-col">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-neutral-50/50 text-neutral-400 text-[10px] uppercase font-bold tracking-[0.2em] border-b border-neutral-100">
                                <th className="px-8 py-5">Order Reference</th>
                                <th className="px-6 py-5">Client Profile</th>
                                <th className="px-6 py-5">Items</th>
                                <th className="px-6 py-5">Status</th>
                                <th className="px-6 py-5 text-right">Value</th>
                                <th className="px-8 py-5 text-center">Inquiry</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-neutral-100">
                            <AnimatePresence mode="popLayout">
                                {filteredOrders.length > 0 ? filteredOrders.map((order, index) => (
                                    <motion.tr
                                        key={order.id}
                                        initial={{ opacity: 0, y: 5 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: index * 0.05 }}
                                        className="group hover:bg-neutral-50/50 transition-colors"
                                    >
                                        <td className="px-8 py-6">
                                            <span className="font-mono text-sm font-bold text-neutral-900">{order.id.substring(0, 8)}</span>
                                        </td>
                                        <td className="px-6 py-6 text-sm">
                                            <div className="flex flex-col">
                                                <span className="font-serif font-bold text-neutral-900">{order.customerName}</span>
                                                <span className="text-[10px] text-neutral-400">{order.customerEmail}</span>
                                                <span className="text-[10px] text-neutral-400">{order.phone}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-6 text-xs font-bold text-neutral-500">
                                            {order.items?.length || 0} Pieces
                                        </td>
                                        <td className="px-6 py-6">
                                            <select
                                                defaultValue={order.status}
                                                onChange={async (e) => {
                                                    const res = await fetch("/api/admin/orders/status", {
                                                        method: "POST",
                                                        body: JSON.stringify({ id: order.id, status: e.target.value })
                                                    });
                                                    if (res.ok) window.location.reload();
                                                }}
                                                className={`flex items-center gap-1.5 text-[9px] font-bold px-3 py-1.5 rounded-xl border w-fit uppercase tracking-widest outline-none ${statusStyles[order.status as keyof typeof statusStyles]}`}
                                            >
                                                {tabs.filter(t => t !== "All").map(t => (
                                                    <option key={t} value={t}>{t}</option>
                                                ))}
                                            </select>
                                        </td>
                                        <td className="px-6 py-6 text-right font-serif font-black text-neutral-900">
                                            PKR {order.totalAmount.toLocaleString()}
                                        </td>
                                        <td className="px-8 py-6 text-center">
                                            <div className="flex flex-col items-center">
                                                <button className="p-2.5 rounded-xl text-neutral-400 hover:text-neutral-900 transition-all">
                                                    <Eye size={18} />
                                                </button>
                                                <span className="text-[8px] text-neutral-400 mt-1 max-w-[100px] truncate">{order.address}</span>
                                            </div>
                                        </td>
                                    </motion.tr>
                                )) : (
                                    <tr>
                                        <td colSpan={6} className="px-8 py-20 text-center text-neutral-400 font-serif italic">
                                            No orders found in the vault.
                                        </td>
                                    </tr>
                                )}
                            </AnimatePresence>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

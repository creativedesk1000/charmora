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
import { updateOrder } from "@/lib/actions";
import { toast } from "sonner";

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
    const [orders, setOrders] = useState(initialOrders);
    const [activeTab, setActiveTab] = useState("All");
    const [editingOrder, setEditingOrder] = useState<any>(null);
    const tabs = ["All", "PENDING", "PROCESSING", "SHIPPED", "DELIVERED", "CANCELLED"];

    const filteredOrders = activeTab === "All"
        ? orders
        : orders.filter(o => o.status === activeTab);

    const handleUpdateStatus = async (id: string, status: string) => {
        const res = await updateOrder(id, { status });
        if (res.success) {
            setOrders(orders.map(o => o.id === id ? { ...o, status } : o));
            toast.success(`Order status updated to ${status}`);
        } else {
            toast.error("Failed to update status");
        }
    };

    const handleUpdateTracking = async (e: React.FormEvent) => {
        e.preventDefault();
        const res = await updateOrder(editingOrder.id, {
            courierName: editingOrder.courierName,
            trackingId: editingOrder.trackingId,
            status: editingOrder.status,
            statusNote: editingOrder.statusNote
        });
        if (res.success) {
            setOrders(orders.map(o => o.id === editingOrder.id ? { ...o, ...editingOrder } : o));
            toast.success("Tracking information updated");
            setEditingOrder(null);
        } else {
            toast.error(res.error || "Failed to update tracking info");
        }
    };

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
                                <th className="px-6 py-5">Courier Info</th>
                                <th className="px-6 py-5">Status</th>
                                <th className="px-6 py-5 text-right">Value</th>
                                <th className="px-8 py-5 text-center">Actions</th>
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
                                        <td className="px-6 py-6">
                                            <div className="flex flex-col gap-1">
                                                <span className="text-[10px] font-bold text-neutral-900">{order.courierName || "N/A"}</span>
                                                <span className="text-[9px] text-neutral-400 font-mono">{order.trackingId || "No Tracking ID"}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-6">
                                            <select
                                                value={order.status}
                                                onChange={(e) => handleUpdateStatus(order.id, e.target.value)}
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
                                            <div className="flex items-center justify-center gap-2">
                                                <button 
                                                    onClick={() => setEditingOrder(order)}
                                                    className="p-2.5 rounded-xl text-neutral-400 hover:text-neutral-900 hover:bg-neutral-100 transition-all"
                                                >
                                                    <Eye size={18} />
                                                </button>
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

            <AnimatePresence>
                {editingOrder && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 md:p-6">
                        <motion.div 
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="bg-white rounded-[2rem] w-full max-w-md shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
                        >
                            <div className="p-6 md:p-8 border-b border-neutral-100 flex justify-between items-center bg-neutral-50/50">
                                <h3 className="font-serif font-bold text-xl md:text-2xl text-neutral-900">Shipment Intel</h3>
                                <button onClick={() => setEditingOrder(null)} className="text-neutral-400 hover:text-neutral-900 transition-colors">
                                    <XCircle size={24} />
                                </button>
                            </div>
                            
                            <form onSubmit={handleUpdateTracking} className="p-6 md:p-8 space-y-5 overflow-y-auto">
                                <div className="space-y-3">
                                    <div className="grid grid-cols-2 gap-3">
                                        <div className="space-y-1">
                                            <label className="text-[9px] uppercase font-bold text-neutral-400 tracking-widest">Client</label>
                                            <p className="text-xs font-bold text-neutral-900 truncate">{editingOrder.customerName}</p>
                                        </div>
                                        <div className="space-y-1">
                                            <label className="text-[9px] uppercase font-bold text-neutral-400 tracking-widest">Total</label>
                                            <p className="text-xs font-bold text-neutral-900">PKR {editingOrder.totalAmount.toLocaleString()}</p>
                                        </div>
                                    </div>
                                    
                                    <div className="space-y-1">
                                        <label className="text-[9px] uppercase font-bold text-neutral-400 tracking-widest">Address</label>
                                        <p className="text-[10px] text-neutral-500 leading-tight">{editingOrder.address}, {editingOrder.city}</p>
                                    </div>
                                </div>

                                <div className="h-[1px] bg-neutral-100 w-full" />

                                <div className="space-y-4">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="space-y-1.5">
                                            <label className="text-[9px] uppercase font-bold text-neutral-400 tracking-widest">Provider</label>
                                            <input 
                                                type="text"
                                                value={editingOrder.courierName || ""}
                                                onChange={(e) => setEditingOrder({...editingOrder, courierName: e.target.value})}
                                                placeholder="DHL / TCS"
                                                className="w-full bg-neutral-50 border border-neutral-100 rounded-xl p-2.5 text-xs focus:outline-none focus:ring-2 focus:ring-neutral-200 transition-all"
                                            />
                                        </div>
                                        <div className="space-y-1.5">
                                            <label className="text-[9px] uppercase font-bold text-neutral-400 tracking-widest">Tracking ID</label>
                                            <input 
                                                type="text"
                                                value={editingOrder.trackingId || ""}
                                                onChange={(e) => setEditingOrder({...editingOrder, trackingId: e.target.value})}
                                                placeholder="ID#"
                                                className="w-full bg-neutral-50 border border-neutral-100 rounded-xl p-2.5 text-xs font-mono focus:outline-none focus:ring-2 focus:ring-neutral-200 transition-all"
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-1.5">
                                        <label className="text-[9px] uppercase font-bold text-neutral-400 tracking-widest">Fulfillment Status</label>
                                        <select
                                            value={editingOrder.status}
                                            onChange={(e) => setEditingOrder({...editingOrder, status: e.target.value})}
                                            className="w-full bg-neutral-50 border border-neutral-100 rounded-xl p-2.5 text-xs font-bold uppercase tracking-widest focus:outline-none"
                                        >
                                            {tabs.filter(t => t !== "All").map(t => (
                                                <option key={t} value={t}>{t}</option>
                                            ))}
                                        </select>
                                    </div>

                                    <div className="space-y-1.5">
                                        <label className="text-[9px] uppercase font-bold text-neutral-400 tracking-widest">Live Status Note</label>
                                        <textarea 
                                            value={editingOrder.statusNote || ""}
                                            onChange={(e) => setEditingOrder({...editingOrder, statusNote: e.target.value})}
                                            placeholder="Update for customer..."
                                            rows={3}
                                            className="w-full bg-neutral-50 border border-neutral-100 rounded-xl p-3 text-xs focus:outline-none focus:ring-2 focus:ring-neutral-200 transition-all resize-none"
                                        />
                                    </div>
                                </div>

                                <button 
                                    type="submit"
                                    className="w-full bg-neutral-900 text-white py-4 rounded-2xl font-bold text-xs uppercase tracking-[0.2em] hover:bg-black transition-all shadow-lg active:scale-[0.98]"
                                >
                                    Confirm Intelligence Update
                                </button>
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}

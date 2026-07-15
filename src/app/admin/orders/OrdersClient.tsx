"use client";

import React, { useState } from "react";
import {
    Eye,
    XCircle,
    Trash2,
    Download,
    CreditCard,
    ShieldCheck,
    Ban
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { updateOrder, deleteOrder, updatePaymentStatus } from "@/lib/actions";
import { toast } from "sonner";
import Image from "next/image";

const statusStyles = {
    PENDING: "bg-amber-100 text-amber-600 border-amber-200",
    PROCESSING: "bg-blue-100 text-blue-600 border-blue-200",
    SHIPPED: "bg-purple-100 text-purple-600 border-purple-200",
    DELIVERED: "bg-emerald-100 text-emerald-600 border-emerald-200",
    CANCELLED: "bg-red-100 text-red-600 border-red-200",
};

const paymentStatusStyles: Record<string, string> = {
    PENDING_PAYMENT_VERIFICATION: "bg-amber-100 text-amber-700 border-amber-200",
    PAYMENT_VERIFIED: "bg-emerald-100 text-emerald-700 border-emerald-200",
    PROCESSING: "bg-blue-100 text-blue-700 border-blue-200",
    COMPLETED: "bg-green-100 text-green-700 border-green-200",
    REJECTED: "bg-red-100 text-red-700 border-red-200",
};

const paymentStatusLabels: Record<string, string> = {
    PENDING_PAYMENT_VERIFICATION: "Pending Payment Verification",
    PAYMENT_VERIFIED: "Payment Verified",
    PROCESSING: "Processing",
    COMPLETED: "Completed",
    REJECTED: "Rejected",
};

const PAYMENT_STATUSES = [
    "PENDING_PAYMENT_VERIFICATION",
    "PAYMENT_VERIFIED",
    "PROCESSING",
    "COMPLETED",
    "REJECTED",
];

const canMoveToProcessing = (paymentStatus: string) =>
    ["PAYMENT_VERIFIED", "PROCESSING", "COMPLETED"].includes(paymentStatus);

export default function OrdersClient({ initialOrders }: { initialOrders: any[] }) {
    const [orders, setOrders] = useState(initialOrders);
    const [activeTab, setActiveTab] = useState("All");
    const [editingOrder, setEditingOrder] = useState<any>(null);
    const [rejectionReason, setRejectionReason] = useState("");
    const [paymentLoading, setPaymentLoading] = useState(false);
    const tabs = ["All", "PENDING", "PROCESSING", "SHIPPED", "DELIVERED", "CANCELLED"];

    const filteredOrders = activeTab === "All"
        ? orders
        : orders.filter(o => o.status === activeTab);

    const syncOrder = (updated: any) => {
        setOrders(orders.map(o => o.id === updated.id ? { ...o, ...updated } : o));
        if (editingOrder?.id === updated.id) {
            setEditingOrder({ ...editingOrder, ...updated });
        }
    };

    const handleUpdateStatus = async (id: string, status: string) => {
        const order = orders.find(o => o.id === id);
        if (status === "PROCESSING" && order && !canMoveToProcessing(order.paymentStatus)) {
            toast.error("Payment must be verified before moving to Processing.");
            return;
        }

        const res = await updateOrder(id, { status });
        if (res.success) {
            setOrders(orders.map(o => o.id === id ? { ...o, status } : o));
            toast.success(`Order status updated to ${status}`);
        } else {
            toast.error(res.error || "Failed to update status");
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to permanently delete this cancelled order?")) return;
        const res = await deleteOrder(id);
        if (res.success) {
            setOrders(orders.filter(o => o.id !== id));
            toast.success("Order deleted permanently");
        } else {
            toast.error(res.error || "Failed to delete order");
        }
    };

    const handleUpdateTracking = async (e: React.FormEvent) => {
        e.preventDefault();

        if (editingOrder.status === "PROCESSING" && !canMoveToProcessing(editingOrder.paymentStatus)) {
            toast.error("Payment must be verified before moving to Processing.");
            return;
        }

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

    const handlePaymentStatusUpdate = async (paymentStatus: string) => {
        if (!editingOrder) return;

        if (paymentStatus === "REJECTED" && !rejectionReason.trim()) {
            toast.error("Please provide a rejection reason.");
            return;
        }

        setPaymentLoading(true);
        const res = await updatePaymentStatus(editingOrder.id, {
            paymentStatus,
            rejectionReason: paymentStatus === "REJECTED" ? rejectionReason : undefined,
        });

        if (res.success && res.order) {
            syncOrder(res.order);
            if (paymentStatus !== "REJECTED") setRejectionReason("");
            toast.success(`Payment status updated to ${paymentStatusLabels[paymentStatus]}`);
        } else {
            toast.error(res.error || "Failed to update payment status");
        }
        setPaymentLoading(false);
    };

    const openOrderDetails = (order: any) => {
        setEditingOrder(order);
        setRejectionReason(order.rejectionReason || "");
    };

    const formatDate = (date: string | null) => {
        if (!date) return "N/A";
        return new Date(date).toLocaleString("en-PK", {
            dateStyle: "medium",
            timeStyle: "short",
        });
    };

    return (
        <div className="space-y-8 pb-12">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h1 className="text-3xl font-serif font-bold text-neutral-900 leading-tight">Order Logistix</h1>
                    <p className="text-neutral-500 text-sm mt-1 font-sans">Track and fulfill your global luxury orders in real-time.</p>
                </div>
            </div>

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

            <div className="bg-white rounded-[2rem] border border-neutral-100 shadow-xl overflow-hidden flex flex-col">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-neutral-50/50 text-neutral-400 text-[10px] uppercase font-bold tracking-[0.2em] border-b border-neutral-100">
                                <th className="px-8 py-5">Order Reference</th>
                                <th className="px-6 py-5">Client Profile</th>
                                <th className="px-6 py-5">Payment</th>
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
                                            <span className={`text-[9px] font-bold px-3 py-1.5 rounded-xl border w-fit uppercase tracking-widest inline-block ${paymentStatusStyles[order.paymentStatus] || "bg-neutral-100 text-neutral-500"}`}>
                                                {paymentStatusLabels[order.paymentStatus] || order.paymentStatus}
                                            </span>
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
                                                    <option key={t} value={t} disabled={t === "PROCESSING" && !canMoveToProcessing(order.paymentStatus)}>
                                                        {t}{t === "PROCESSING" && !canMoveToProcessing(order.paymentStatus) ? " (Payment Required)" : ""}
                                                    </option>
                                                ))}
                                            </select>
                                        </td>
                                        <td className="px-6 py-6 text-right font-serif font-black text-neutral-900">
                                            PKR {order.totalAmount.toLocaleString()}
                                        </td>
                                        <td className="px-8 py-6 text-center">
                                            <div className="flex items-center justify-center gap-2">
                                                <button
                                                    onClick={() => openOrderDetails(order)}
                                                    className="p-2.5 rounded-xl text-neutral-400 hover:text-neutral-900 hover:bg-neutral-100 transition-all"
                                                >
                                                    <Eye size={18} />
                                                </button>
                                                {order.status === "CANCELLED" && (
                                                    <button
                                                        onClick={() => handleDelete(order.id)}
                                                        title="Delete Cancelled Order Permanently"
                                                        className="p-2.5 rounded-xl text-red-400 hover:text-red-600 hover:bg-red-50 transition-all"
                                                    >
                                                        <Trash2 size={18} />
                                                    </button>
                                                )}
                                            </div>
                                        </td>
                                    </motion.tr>
                                )) : (
                                    <tr>
                                        <td colSpan={7} className="px-8 py-20 text-center text-neutral-400 font-serif italic">
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
                            className="bg-white rounded-[2rem] w-full max-w-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
                        >
                            <div className="p-6 md:p-8 border-b border-neutral-100 flex justify-between items-center bg-neutral-50/50">
                                <h3 className="font-serif font-bold text-xl md:text-2xl text-neutral-900">Order Details</h3>
                                <button onClick={() => setEditingOrder(null)} className="text-neutral-400 hover:text-neutral-900 transition-colors">
                                    <XCircle size={24} />
                                </button>
                            </div>

                            <div className="p-6 md:p-8 space-y-6 overflow-y-auto">
                                {/* Payment Receipt Section */}
                                <div className="bg-neutral-50 rounded-2xl p-6 space-y-5 border border-neutral-100">
                                    <div className="flex items-center gap-2">
                                        <CreditCard size={18} className="text-neutral-600" />
                                        <h4 className="font-serif font-bold text-lg text-neutral-900">Payment Receipt</h4>
                                    </div>

                                    <div className="flex items-center gap-2">
                                        <span className={`text-[9px] font-bold px-3 py-1.5 rounded-xl border uppercase tracking-widest ${paymentStatusStyles[editingOrder.paymentStatus]}`}>
                                            {paymentStatusLabels[editingOrder.paymentStatus]}
                                        </span>
                                        <span className="text-[10px] text-neutral-400">via {editingOrder.paymentMethod}</span>
                                    </div>

                                    {editingOrder.receiptImage ? (
                                        <div className="space-y-3">
                                            <div className="relative w-full h-56 rounded-xl overflow-hidden bg-white border border-neutral-200">
                                                <Image
                                                    src={editingOrder.receiptImage}
                                                    alt="Payment receipt"
                                                    fill
                                                    className="object-contain"
                                                />
                                            </div>
                                            <a
                                                href={editingOrder.receiptImage}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                download
                                                className="inline-flex items-center gap-2 text-xs font-bold text-neutral-600 hover:text-neutral-900 transition-colors"
                                            >
                                                <Download size={14} />
                                                Download Receipt
                                            </a>
                                        </div>
                                    ) : (
                                        <p className="text-xs text-neutral-400 italic">No receipt uploaded.</p>
                                    )}

                                    <div className="grid grid-cols-2 gap-4 text-xs">
                                        <div>
                                            <label className="text-[9px] uppercase font-bold text-neutral-400 tracking-widest">Customer</label>
                                            <p className="font-bold text-neutral-900">{editingOrder.customerName}</p>
                                            <p className="text-neutral-500">{editingOrder.customerEmail}</p>
                                            <p className="text-neutral-500">{editingOrder.phone}</p>
                                        </div>
                                        <div>
                                            <label className="text-[9px] uppercase font-bold text-neutral-400 tracking-widest">Amount</label>
                                            <p className="font-bold text-neutral-900 text-lg">PKR {editingOrder.totalAmount.toLocaleString()}</p>
                                            <p className="text-neutral-500 mt-1">Uploaded: {formatDate(editingOrder.receiptUploadedAt)}</p>
                                        </div>
                                    </div>

                                    <div>
                                        <label className="text-[9px] uppercase font-bold text-neutral-400 tracking-widest">Order Items</label>
                                        <div className="mt-2 space-y-2">
                                            {editingOrder.items?.map((item: any) => (
                                                <div key={item.id} className="flex justify-between text-xs">
                                                    <span>{item.product?.title || "Product"} × {item.quantity}</span>
                                                    <span className="font-bold">PKR {(item.price * item.quantity).toLocaleString()}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {editingOrder.verifiedAt && (
                                        <div className="text-xs text-emerald-700 bg-emerald-50 rounded-xl p-3">
                                            <ShieldCheck size={14} className="inline mr-1" />
                                            Verified on {formatDate(editingOrder.verifiedAt)}
                                            {editingOrder.verifiedBy && (
                                                <span> by {editingOrder.verifiedBy.name || editingOrder.verifiedBy.email}</span>
                                            )}
                                        </div>
                                    )}

                                    {editingOrder.rejectionReason && (
                                        <div className="text-xs text-red-700 bg-red-50 rounded-xl p-3">
                                            <Ban size={14} className="inline mr-1" />
                                            Rejection reason: {editingOrder.rejectionReason}
                                        </div>
                                    )}

                                    <div className="space-y-3 pt-2 border-t border-neutral-200">
                                        <label className="text-[9px] uppercase font-bold text-neutral-400 tracking-widest">Update Payment Status</label>
                                        <div className="flex flex-wrap gap-2">
                                            {PAYMENT_STATUSES.map((ps) => (
                                                <button
                                                    key={ps}
                                                    type="button"
                                                    disabled={paymentLoading || editingOrder.paymentStatus === ps}
                                                    onClick={() => {
                                                        if (ps === "REJECTED") return;
                                                        handlePaymentStatusUpdate(ps);
                                                    }}
                                                    className={`text-[9px] font-bold px-3 py-2 rounded-xl border uppercase tracking-widest transition-all disabled:opacity-40 ${paymentStatusStyles[ps]} ${editingOrder.paymentStatus === ps ? "ring-2 ring-neutral-400" : "hover:opacity-80"}`}
                                                >
                                                    {paymentStatusLabels[ps]}
                                                </button>
                                            ))}
                                        </div>

                                        <div className="space-y-2">
                                            <label className="text-[9px] uppercase font-bold text-neutral-400 tracking-widest">Rejection Reason (required if rejecting)</label>
                                            <textarea
                                                value={rejectionReason}
                                                onChange={(e) => setRejectionReason(e.target.value)}
                                                placeholder="Reason for payment rejection..."
                                                rows={2}
                                                className="w-full bg-white border border-neutral-200 rounded-xl p-3 text-xs focus:outline-none focus:ring-2 focus:ring-neutral-200 transition-all resize-none"
                                            />
                                            <button
                                                type="button"
                                                disabled={paymentLoading}
                                                onClick={() => handlePaymentStatusUpdate("REJECTED")}
                                                className="text-[9px] font-bold px-4 py-2 rounded-xl border uppercase tracking-widest bg-red-100 text-red-700 border-red-200 hover:opacity-80 transition-all disabled:opacity-40"
                                            >
                                                Reject Payment
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                <div className="h-[1px] bg-neutral-100 w-full" />

                                <form onSubmit={handleUpdateTracking} className="space-y-5">
                                    <h4 className="font-serif font-bold text-lg text-neutral-900">Shipment Intel</h4>

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

                                    <div className="space-y-4">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div className="space-y-1.5">
                                                <label className="text-[9px] uppercase font-bold text-neutral-400 tracking-widest">Provider</label>
                                                <input
                                                    type="text"
                                                    value={editingOrder.courierName || ""}
                                                    onChange={(e) => setEditingOrder({ ...editingOrder, courierName: e.target.value })}
                                                    placeholder="DHL / TCS"
                                                    className="w-full bg-neutral-50 border border-neutral-100 rounded-xl p-2.5 text-xs focus:outline-none focus:ring-2 focus:ring-neutral-200 transition-all"
                                                />
                                            </div>
                                            <div className="space-y-1.5">
                                                <label className="text-[9px] uppercase font-bold text-neutral-400 tracking-widest">Tracking ID</label>
                                                <input
                                                    type="text"
                                                    value={editingOrder.trackingId || ""}
                                                    onChange={(e) => setEditingOrder({ ...editingOrder, trackingId: e.target.value })}
                                                    placeholder="ID#"
                                                    className="w-full bg-neutral-50 border border-neutral-100 rounded-xl p-2.5 text-xs font-mono focus:outline-none focus:ring-2 focus:ring-neutral-200 transition-all"
                                                />
                                            </div>
                                        </div>

                                        <div className="space-y-1.5">
                                            <label className="text-[9px] uppercase font-bold text-neutral-400 tracking-widest">Fulfillment Status</label>
                                            <select
                                                value={editingOrder.status}
                                                onChange={(e) => setEditingOrder({ ...editingOrder, status: e.target.value })}
                                                className="w-full bg-neutral-50 border border-neutral-100 rounded-xl p-2.5 text-xs font-bold uppercase tracking-widest focus:outline-none"
                                            >
                                                {tabs.filter(t => t !== "All").map(t => (
                                                    <option key={t} value={t} disabled={t === "PROCESSING" && !canMoveToProcessing(editingOrder.paymentStatus)}>
                                                        {t}{t === "PROCESSING" && !canMoveToProcessing(editingOrder.paymentStatus) ? " (Payment Required)" : ""}
                                                    </option>
                                                ))}
                                            </select>
                                            {editingOrder.status === "PROCESSING" && !canMoveToProcessing(editingOrder.paymentStatus) && (
                                                <p className="text-[10px] text-amber-600">Payment must be verified before processing this order.</p>
                                            )}
                                        </div>

                                        <div className="space-y-1.5">
                                            <label className="text-[9px] uppercase font-bold text-neutral-400 tracking-widest">Live Status Note</label>
                                            <textarea
                                                value={editingOrder.statusNote || ""}
                                                onChange={(e) => setEditingOrder({ ...editingOrder, statusNote: e.target.value })}
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
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}

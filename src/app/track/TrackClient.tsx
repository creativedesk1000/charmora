"use client";
// Order tracking client component

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Package, Truck, CheckCircle2, Clock, MapPin, ExternalLink, ArrowRight } from "lucide-react";
import { getOrder } from "@/lib/actions";
import { toast } from "sonner";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

const steps = [
    { status: "PENDING", label: "Order Placed", icon: Clock, desc: "We've received your order and it's in the queue." },
    { status: "PROCESSING", label: "Crafting", icon: Package, desc: "Our artisans are preparing your exquisite pieces." },
    { status: "SHIPPED", label: "In Transit", icon: Truck, desc: "Your order has been handed over to our logistics partner." },
    { status: "DELIVERED", label: "Delivered", icon: CheckCircle2, desc: "Your luxury package has arrived at its destination." },
];

export default function TrackClient() {
    const searchParams = useSearchParams();
    const [orderId, setOrderId] = useState(searchParams.get("id") || "");
    const [loading, setLoading] = useState(false);
    const [order, setOrder] = useState<any>(null);

    useEffect(() => {
        if (searchParams.get("id")) {
            performSearch(searchParams.get("id")!);
        }
    }, [searchParams]);

    const performSearch = async (id: string) => {
        setLoading(true);
        const res = await getOrder(id.trim());
        if (res.success && res.order) {
            setOrder(res.order);
            toast.success("Order intelligence retrieved.");
        } else {
            setOrder(null);
            toast.error("We couldn't find an order with that reference.");
        }
        setLoading(false);
    };

    const handleSearch = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!orderId.trim()) return;
        performSearch(orderId);
    };

    const currentStepIndex = order ? steps.findIndex(s => s.status === order.status) : -1;
    const progressWidth = currentStepIndex >= 0 ? (currentStepIndex / (steps.length - 1)) * 100 : 0;

    return (
        <div className="min-h-screen pt-40 pb-24 px-6 md:px-12 bg-charmora-beige">
            <div className="max-w-3xl mx-auto">
                <div className="text-center mb-16">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="inline-block px-4 py-1.5 bg-charmora-pink/30 text-charmora-pink-dark text-[10px] uppercase tracking-[0.3em] font-bold rounded-full mb-6"
                    >
                        Logistics Portal
                    </motion.div>
                    <h1 className="text-4xl md:text-6xl text-charmora-purple font-serif mb-6 leading-tight">
                        Track Your <span className="italic">Masterpiece</span>
                    </h1>
                    <p className="text-sm text-charmora-purple/60 font-sans max-w-lg mx-auto">
                        Enter your order reference below to view real-time shipping intelligence and fulfillment status.
                    </p>
                </div>

                {/* Search Box */}
                <motion.form
                    onSubmit={handleSearch}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="relative mb-16 group"
                >
                    <input
                        type="text"
                        value={orderId}
                        onChange={(e) => setOrderId(e.target.value)}
                        placeholder="Enter Order Reference (e.g. clx...)"
                        className="w-full bg-white border border-charmora-pink-dark/10 rounded-[2rem] py-6 px-8 pr-20 text-lg md:text-xl font-sans focus:outline-none focus:ring-4 focus:ring-charmora-pink-dark/5 shadow-2xl transition-all group-hover:border-charmora-pink-dark/20"
                    />
                    <button
                        disabled={loading}
                        className="absolute right-4 top-1/2 -translate-y-1/2 p-4 bg-charmora-purple text-white rounded-2xl hover:bg-black transition-all active:scale-95 disabled:opacity-50"
                    >
                        {loading ? <Clock className="animate-spin" size={24} /> : <Search size={24} />}
                    </button>
                </motion.form>

                <AnimatePresence mode="wait">
                    {order ? (
                        <motion.div
                            key="order-result"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="space-y-8"
                        >
                            {/* Tracking Progress */}
                            <div className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-2xl border border-charmora-pink-dark/5">
                                <div className="flex justify-between items-start mb-12">
                                    <div>
                                        <h2 className="font-serif text-2xl text-charmora-purple mb-1">Status: {order.status}</h2>
                                        <p className="text-[10px] text-charmora-purple/40 uppercase tracking-widest font-bold">Ref: {order.id}</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-[10px] text-charmora-purple/40 uppercase tracking-widest font-bold mb-1">Order Date</p>
                                        <p className="text-sm font-bold text-charmora-purple">{new Date(order.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
                                    </div>
                                </div>

                                {/* Step Progress */}
                                <div className="relative flex justify-between">
                                    <div className="absolute top-6 left-0 w-full h-[2px] bg-neutral-100 -z-0" />
                                    <div
                                        className="absolute top-6 left-0 h-[2px] bg-charmora-pink-dark transition-all duration-1000 ease-out -z-0"
                                        style={{ width: `${progressWidth}%` }}
                                    />

                                    {steps.map((step, idx) => {
                                        const Icon = step.icon;
                                        const isActive = idx <= currentStepIndex;
                                        const isCurrent = idx === currentStepIndex;

                                        return (
                                            <div key={step.status} className="relative z-10 flex flex-col items-center group">
                                                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-500 ${isActive ? 'bg-charmora-purple text-white shadow-xl scale-110' : 'bg-white text-neutral-300 border-2 border-neutral-100'
                                                    }`}>
                                                    <Icon size={20} />
                                                </div>
                                                <div className="hidden md:block mt-4 text-center">
                                                    <p className={`text-[10px] uppercase font-bold tracking-widest mb-1 ${isActive ? 'text-charmora-purple' : 'text-neutral-300'}`}>
                                                        {step.label}
                                                    </p>
                                                    {isCurrent && (
                                                        <p className="text-[8px] text-charmora-purple/60 max-w-[100px] leading-relaxed animate-fade-in">
                                                            {step.desc}
                                                        </p>
                                                    )}
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>

                                {order.statusNote && (
                                    <motion.div 
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="mt-12 p-4 bg-charmora-pink/10 border border-charmora-pink-dark/10 rounded-2xl"
                                    >
                                        <p className="text-[10px] uppercase font-bold text-charmora-pink-dark tracking-widest mb-1">Live Update from Charmora</p>
                                        <p className="text-sm text-charmora-purple italic">"{order.statusNote}"</p>
                                    </motion.div>
                                )}
                            </div>

                            {/* Logistics Details */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <motion.div
                                    whileHover={{ y: -5 }}
                                    className="bg-white rounded-[2rem] p-8 shadow-xl border border-charmora-pink-dark/5"
                                >
                                    <div className="flex items-center gap-4 mb-6">
                                        <div className="p-3 bg-neutral-50 rounded-xl">
                                            <Truck className="text-charmora-purple" size={20} />
                                        </div>
                                        <h3 className="font-serif text-lg text-charmora-purple">Logistics Partner</h3>
                                    </div>
                                    {order.courierName ? (
                                        <div className="space-y-4">
                                            <div>
                                                <p className="text-[10px] uppercase font-bold text-neutral-400 tracking-widest mb-1">Provider</p>
                                                <p className="text-base font-bold text-charmora-purple">{order.courierName}</p>
                                            </div>
                                            <div>
                                                <p className="text-[10px] uppercase font-bold text-neutral-400 tracking-widest mb-1">Tracking Number</p>
                                                <div className="flex items-center justify-between group/id">
                                                    <p className="text-sm font-mono font-bold text-charmora-purple">{order.trackingId}</p>
                                                    <button
                                                        onClick={() => toast.info("Copying to clipboard...")}
                                                        className="p-1.5 rounded-lg hover:bg-neutral-50 text-neutral-400 hover:text-charmora-purple transition-colors"
                                                    >
                                                        <ExternalLink size={14} />
                                                    </button>
                                                </div>
                                            </div>
                                            <div className="pt-4">
                                                <a
                                                    href={`https://www.google.com/search?q=${order.courierName}+tracking+${order.trackingId}`}
                                                    target="_blank"
                                                    className="flex items-center justify-center gap-2 w-full py-3 bg-neutral-50 hover:bg-neutral-100 text-charmora-purple rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all"
                                                >
                                                    Track on Partner Website
                                                    <ArrowRight size={12} />
                                                </a>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="py-6 text-center">
                                            <p className="text-sm italic text-neutral-400">Logistics assignment in progress.</p>
                                        </div>
                                    )}
                                </motion.div>

                                <motion.div
                                    whileHover={{ y: -5 }}
                                    className="bg-white rounded-[2rem] p-8 shadow-xl border border-charmora-pink-dark/5"
                                >
                                    <div className="flex items-center gap-4 mb-6">
                                        <div className="p-3 bg-neutral-50 rounded-xl">
                                            <MapPin className="text-charmora-purple" size={20} />
                                        </div>
                                        <h3 className="font-serif text-lg text-charmora-purple">Destination</h3>
                                    </div>
                                    <div className="space-y-4">
                                        <div>
                                            <p className="text-[10px] uppercase font-bold text-neutral-400 tracking-widest mb-1">Customer</p>
                                            <p className="text-base font-bold text-charmora-purple">{order.customerName}</p>
                                        </div>
                                        <div>
                                            <p className="text-[10px] uppercase font-bold text-neutral-400 tracking-widest mb-1">Shipping Address</p>
                                            <p className="text-xs text-neutral-600 leading-relaxed">
                                                {order.address},<br />
                                                {order.city}
                                            </p>
                                        </div>
                                    </div>
                                </motion.div>
                            </div>
                        </motion.div>
                    ) : !loading && orderId ? (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="text-center py-20"
                        >
                            <div className="w-20 h-20 bg-neutral-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                <Search className="text-neutral-300" size={32} />
                            </div>
                            <p className="font-serif text-xl text-charmora-purple/40 italic">Waiting for reference search...</p>
                        </motion.div>
                    ) : null}
                </AnimatePresence>
            </div>
        </div>
    );
}

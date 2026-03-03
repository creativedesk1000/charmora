"use client";

import React, { useState } from "react";
import AppLayout from "@/components/layout";
import { useCart } from "@/context/CartContext";
import { placeOrder } from "@/lib/actions";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/ui/Button";

export default function CheckoutPage() {
    const { cart, totalPrice, clearCart } = useCart();
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        address: "",
        city: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (cart.length === 0) return;

        setLoading(true);
        const result = await placeOrder({
            ...formData,
            total: totalPrice,
            items: cart
        });

        if (result.success) {
            toast.success("Order Placed Successfully!");
            clearCart();
            router.push(`/checkout/success?id=${result.orderId}`);
        } else {
            toast.error(result.error);
        }
        setLoading(false);
    };

    if (cart.length === 0) {
        return (
            <AppLayout>
                <div className="pt-40 pb-24 text-center">
                    <h1 className="text-3xl font-serif text-charmora-purple mb-6">Your bag is empty</h1>
                    <Button onClick={() => router.push("/shop")} variant="primary">Return to Shop</Button>
                </div>
            </AppLayout>
        );
    }

    return (
        <AppLayout>
            <div className="pt-40 pb-24 px-6 md:px-12 bg-charmora-beige min-h-screen">
                <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16">
                    {/* Form */}
                    <div className="bg-white p-8 md:p-12 rounded-[2rem] shadow-sm">
                        <h2 className="text-3xl font-serif text-charmora-purple mb-8">Shipping Information</h2>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-[10px] uppercase tracking-widest text-charmora-purple/60 font-bold">Full Name</label>
                                    <input required name="name" value={formData.name} onChange={handleChange} type="text" className="w-full bg-[#f8f9fa] border-none rounded-xl p-4 text-sm" placeholder="John Doe" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] uppercase tracking-widest text-charmora-purple/60 font-bold">Email Address</label>
                                    <input required name="email" value={formData.email} onChange={handleChange} type="email" className="w-full bg-[#f8f9fa] border-none rounded-xl p-4 text-sm" placeholder="john@example.com" />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] uppercase tracking-widest text-charmora-purple/60 font-bold">Phone Number</label>
                                <input required name="phone" value={formData.phone} onChange={handleChange} type="tel" className="w-full bg-[#f8f9fa] border-none rounded-xl p-4 text-sm" placeholder="+92 300 1234567" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] uppercase tracking-widest text-charmora-purple/60 font-bold">Shipping Address</label>
                                <textarea required name="address" value={formData.address} onChange={handleChange} rows={3} className="w-full bg-[#f8f9fa] border-none rounded-xl p-4 text-sm" placeholder="House #, Street Name, Area..." />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] uppercase tracking-widest text-charmora-purple/60 font-bold">City</label>
                                <input required name="city" value={formData.city} onChange={handleChange} type="text" className="w-full bg-[#f8f9fa] border-none rounded-xl p-4 text-sm" placeholder="Karachi" />
                            </div>

                            <div className="pt-4">
                                <p className="text-xs text-charmora-purple/40 mb-6 italic">* We currently only accept Cash on Delivery (COD).</p>
                                <Button type="submit" className="w-full py-6 rounded-2xl text-lg tracking-widest" disabled={loading}>
                                    {loading ? "Processing..." : "Confirm My Order"}
                                </Button>
                            </div>
                        </form>
                    </div>

                    {/* Summary */}
                    <div className="space-y-8">
                        <div className="bg-charmora-purple text-white p-8 md:p-12 rounded-[2rem] shadow-xl">
                            <h2 className="text-2xl font-serif mb-8">Order Summary</h2>
                            <div className="space-y-6 max-h-[400px] overflow-y-auto pr-4 mb-8 custom-scrollbar">
                                {cart.map((item) => (
                                    <div key={item.id} className="flex gap-4 items-center">
                                        <div className="relative w-16 h-16 rounded-xl overflow-hidden bg-white/10">
                                            <Image src={item.image} alt={item.title} fill className="object-cover" />
                                        </div>
                                        <div className="flex-grow">
                                            <h4 className="text-sm font-serif">{item.title}</h4>
                                            <p className="text-xs text-white/60">Qty: {item.quantity}</p>
                                        </div>
                                        <p className="text-sm font-bold">{(item.price * item.quantity).toLocaleString()} PKR</p>
                                    </div>
                                ))}
                            </div>
                            <div className="border-t border-white/10 pt-6 space-y-4">
                                <div className="flex justify-between text-sm">
                                    <span className="text-white/60">Subtotal</span>
                                    <span>{totalPrice.toLocaleString()} PKR</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-white/60">Shipping</span>
                                    <span className="text-charmora-pink-dark font-bold uppercase tracking-tighter">Free</span>
                                </div>
                                <div className="flex justify-between text-xl font-serif pt-4 border-t border-white/10">
                                    <span>Total</span>
                                    <span>{totalPrice.toLocaleString()} PKR</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}

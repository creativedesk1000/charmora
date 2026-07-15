"use client";

import React, { useState, useRef, useEffect } from "react";
import AppLayout from "@/components/layout";
import { useCart } from "@/context/CartContext";
import { placeOrder, uploadPaymentReceipt, getSiteConfig } from "@/lib/actions";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { AlertCircle, Upload, ArrowLeft, Copy, Check, Trash2, Plus, Minus, RefreshCcw, ShoppingBag } from "lucide-react";

const EASYPAISA_DETAILS = {
    accountName: "Warda Riaz",
    phoneNumber: "03463688458",
    accountNumber: "PK37TMFB0000000080290160",
};

export default function CheckoutPage() {
    const { cart, totalPrice, clearCart, updateQuantity, removeFromCart } = useCart();
    const [loading, setLoading] = useState(false);
    const [step, setStep] = useState<"shipping" | "payment">("shipping");
    const [receiptFile, setReceiptFile] = useState<File | null>(null);
    const [receiptPreview, setReceiptPreview] = useState<string | null>(null);
    const [receiptError, setReceiptError] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const router = useRouter();

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        address: "",
        city: "",
        state: "",
    });

    const [deliveryCharges, setDeliveryCharges] = useState(250);
    const [paymentMethods, setPaymentMethods] = useState<any[]>([]);
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<any>(null);

    const [paymentMethod, setPaymentMethod] = useState<"easypaisa" | "cod">("easypaisa");
    const [copiedField, setCopiedField] = useState<string | null>(null);

    const handleCopy = (text: string, field: string) => {
        navigator.clipboard.writeText(text);
        setCopiedField(field);
        toast.success(`${field} copied!`);
        setTimeout(() => setCopiedField(null), 2000);
    };

    useEffect(() => {
        getSiteConfig().then((res) => {
            if (res.success && res.config) {
                const config = res.config as any;
                setDeliveryCharges(config.deliveryCharges ?? 250);
            }
        });
    }, []);

    const grandTotal = totalPrice + deliveryCharges;
    const advanceAmount = Math.ceil(grandTotal / 2);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleShippingSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (cart.length === 0) return;
        setStep("payment");
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const handleReceiptChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
        if (!allowedTypes.includes(file.type)) {
            toast.error("Please upload a valid image file (JPG, PNG, or WebP).");
            return;
        }
        
        if (file.size > 1024 * 1024) {
            toast.error("Image is too large! Please upload an image smaller than 1 MB.");
            return;
        }

        setReceiptFile(file);
        setReceiptPreview(URL.createObjectURL(file));
        setReceiptError(false);
    };

    const handlePlaceOrder = async (e: React.FormEvent) => {
        e.preventDefault();
        if (cart.length === 0) return;

        if (!receiptFile) {
            setReceiptError(true);
            toast.error("Please upload your payment receipt before placing the order.");
            return;
        }

        setReceiptError(false);
        setLoading(true);

        try {
            const uploadFormData = new FormData();
            uploadFormData.append("file", receiptFile);
            const uploadResult = await uploadPaymentReceipt(uploadFormData);

            if (!uploadResult.success || !uploadResult.url) {
                toast.error(uploadResult.error || "Failed to upload receipt.");
                setLoading(false);
                return;
            }

            const uploadedUrl = uploadResult.url;

            const result = await placeOrder({
                ...formData,
                total: grandTotal,
                items: cart,
                receiptImage: uploadedUrl,
                paymentMethod: paymentMethod === "easypaisa" ? "EASYPAISA" : "COD (50% Advance)",
            });

            if (result.success) {
                toast.success("Order Placed Successfully!");
                clearCart();
                router.push(`/checkout/success?id=${result.orderId}`);
            } else {
                toast.error(result.error);
            }
        } catch (error: any) {
            console.error("Order placement error:", error);
            toast.error(error.message || "An unexpected error occurred. Please try again or use a smaller image file.");
        } finally {
            setLoading(false);
        }
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

    const orderSummary = (
        <div className="space-y-8">
            <div className="bg-charmora-purple text-white p-8 md:p-12 rounded-[2rem] shadow-xl relative">
                <div className="flex justify-between items-center mb-8">
                    <h2 className="text-2xl font-serif">Order Summary</h2>
                    <button 
                        onClick={clearCart}
                        className="text-white/60 hover:text-white transition-colors flex items-center gap-2 text-xs uppercase tracking-widest font-bold bg-white/5 px-3 py-2 rounded-lg"
                    >
                        <RefreshCcw size={14} />
                        Reset
                    </button>
                </div>
                <div className="space-y-6 max-h-[400px] overflow-y-auto pr-4 mb-8 custom-scrollbar">
                    {cart.map((item) => (
                        <div key={item.id} className="flex flex-col md:flex-row gap-4 items-start md:items-center bg-white/5 p-4 rounded-2xl relative group">
                            <div className="relative w-full md:w-24 h-48 md:h-24 rounded-xl overflow-hidden bg-white/10 shrink-0">
                                <Image src={item.image} alt={item.title} fill className="object-cover" />
                            </div>
                            <div className="flex-grow min-w-0 pr-8 md:pr-10 w-full">
                                <h4 className="text-base md:text-sm font-serif truncate !text-white" style={{ color: 'white' }} title={item.title}>{item.title}</h4>
                                <div className="flex flex-wrap items-center justify-between gap-3 mt-3 md:mt-2">
                                    <div className="flex items-center bg-white/10 rounded-lg px-2 py-1">
                                        <button 
                                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                            className="text-white/60 hover:text-white p-1 transition-colors"
                                            disabled={item.quantity <= 1}
                                        >
                                            <Minus size={14} />
                                        </button>
                                        <span className="text-sm font-bold w-8 text-center">{item.quantity}</span>
                                        <button 
                                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                            className="text-white/60 hover:text-white p-1 transition-colors"
                                        >
                                            <Plus size={14} />
                                        </button>
                                    </div>
                                    <p className="text-sm md:text-base font-bold whitespace-nowrap">{(item.price * item.quantity).toLocaleString()} PKR</p>
                                </div>
                            </div>
                            <button
                                onClick={() => removeFromCart(item.id)}
                                className="absolute right-4 top-4 md:top-1/2 md:-translate-y-1/2 p-2.5 md:p-2 bg-red-500/20 md:bg-transparent text-red-300 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-colors opacity-100 lg:opacity-0 lg:group-hover:opacity-100 flex items-center justify-center"
                                title="Remove item"
                            >
                                <Trash2 size={18} />
                            </button>
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
                        <span className="text-charmora-pink-dark font-bold uppercase tracking-tighter">{deliveryCharges === 0 ? "Free" : `${deliveryCharges} PKR`}</span>
                    </div>
                    <div className="flex justify-between text-xl font-serif pt-4 border-t border-white/10">
                        <span>Total</span>
                        <span>{grandTotal.toLocaleString()} PKR</span>
                    </div>
                </div>
                <div className="mt-8 pt-6 border-t border-white/10">
                    <button
                        onClick={() => router.push("/shop")}
                        className="w-full flex items-center justify-center gap-2 py-4 bg-white/10 hover:bg-white/20 text-white rounded-2xl transition-colors font-bold tracking-widest uppercase text-sm"
                    >
                        <ShoppingBag size={18} />
                        Add More Items
                    </button>
                </div>
            </div>
        </div>
    );

    return (
        <AppLayout>
            <div className="pt-40 pb-24 px-6 md:px-12 bg-charmora-beige min-h-screen">
                <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16">
                    <div className="bg-white p-8 md:p-12 rounded-[2rem] shadow-sm">
                        {step === "shipping" ? (
                            <>
                                <h2 className="text-3xl font-serif text-charmora-purple mb-8">Shipping Information</h2>
                                <form onSubmit={handleShippingSubmit} className="space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label className="text-[10px] uppercase tracking-widest text-charmora-purple/60 font-bold">Full Name</label>
                                            <input required name="name" value={formData.name} onChange={handleChange} type="text" className="w-full bg-[#f8f9fa] border-none rounded-xl p-4 text-sm" placeholder="Your name here" />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[10px] uppercase tracking-widest text-charmora-purple/60 font-bold">Email Address</label>
                                            <input required name="email" value={formData.email} onChange={handleChange} type="email" className="w-full bg-[#f8f9fa] border-none rounded-xl p-4 text-sm" placeholder="Your email address" />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] uppercase tracking-widest text-charmora-purple/60 font-bold">Phone Number</label>
                                        <input required name="phone" value={formData.phone} onChange={handleChange} type="tel" className="w-full bg-[#f8f9fa] border-none rounded-xl p-4 text-sm" placeholder="Your phone number here" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] uppercase tracking-widest text-charmora-purple/60 font-bold">Shipping Address</label>
                                        <textarea required name="address" value={formData.address} onChange={handleChange} rows={3} className="w-full bg-[#f8f9fa] border-none rounded-xl p-4 text-sm" placeholder="Your full address here" />
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label className="text-[10px] uppercase tracking-widest text-charmora-purple/60 font-bold">City</label>
                                            <input required name="city" value={formData.city} onChange={handleChange} type="text" className="w-full bg-[#f8f9fa] border-none rounded-xl p-4 text-sm" placeholder="Your city here" />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[10px] uppercase tracking-widest text-charmora-purple/60 font-bold">State/Province</label>
                                            <select required name="state" value={formData.state} onChange={handleChange} className="w-full bg-[#f8f9fa] border-none rounded-xl p-4 text-sm outline-none text-charmora-purple appearance-none cursor-pointer">
                                                <option value="" disabled>Select your province</option>
                                                <option value="Punjab">Punjab</option>
                                                <option value="Sindh">Sindh</option>
                                                <option value="Khyber Pakhtunkhwa (KPK)">Khyber Pakhtunkhwa (KPK)</option>
                                                <option value="Balochistan">Balochistan</option>
                                                <option value="Islamabad Capital Territory (ICT)">Islamabad Capital Territory (ICT)</option>
                                                <option value="Azad Jammu & Kashmir (AJK)">Azad Jammu & Kashmir (AJK)</option>
                                                <option value="Gilgit-Baltistan (GB)">Gilgit-Baltistan (GB)</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div className="pt-4">
                                        <Button type="submit" className="w-full py-6 rounded-2xl text-lg tracking-widest">
                                            Continue to Payment
                                        </Button>
                                    </div>
                                </form>
                            </>
                        ) : (
                            <>
                                <button
                                    type="button"
                                    onClick={() => setStep("shipping")}
                                    className="flex items-center gap-2 text-sm text-charmora-purple/60 hover:text-charmora-purple mb-6 transition-colors"
                                >
                                    <ArrowLeft size={16} />
                                    Back to Shipping
                                </button>

                                <h2 className="text-3xl font-serif text-charmora-purple mb-2">Payment</h2>
                                <p className="text-sm text-charmora-purple/50 mb-8">Choose your payment method below.</p>

                                <form onSubmit={handlePlaceOrder} className="space-y-6">
                                    {/* Mobile order total */}
                                    <div className="lg:hidden bg-charmora-purple/5 rounded-2xl p-6 space-y-2">
                                        <div className="flex justify-between text-sm">
                                            <span className="text-charmora-purple/60">Cart Subtotal</span>
                                            <span>{totalPrice.toLocaleString()} PKR</span>
                                        </div>
                                        <div className="flex justify-between text-sm">
                                            <span className="text-charmora-purple/60">Shipping</span>
                                            <span>{deliveryCharges === 0 ? "Free" : `${deliveryCharges} PKR`}</span>
                                        </div>
                                        <div className="flex justify-between text-lg font-serif font-bold text-charmora-purple pt-2 border-t border-charmora-purple/10">
                                            <span>Order Total</span>
                                            <span>{grandTotal.toLocaleString()} PKR</span>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div 
                                            className={`border rounded-2xl p-4 cursor-pointer transition-colors ${paymentMethod === "easypaisa" ? "border-charmora-purple bg-charmora-purple/5" : "border-neutral-200 hover:border-charmora-purple/30"}`}
                                            onClick={() => setPaymentMethod("easypaisa")}
                                        >
                                            <div className="flex items-center gap-3">
                                                <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${paymentMethod === "easypaisa" ? "border-charmora-purple" : "border-neutral-300"}`}>
                                                    {paymentMethod === "easypaisa" && <div className="w-2 h-2 rounded-full bg-charmora-purple" />}
                                                </div>
                                                <span className="font-bold text-charmora-purple">EasyPaisa (Online Payment)</span>
                                            </div>
                                            <p className="mt-2 ml-7 text-xs text-charmora-purple/70">Pay 100% upfront.</p>
                                        </div>

                                        <div 
                                            className={`border rounded-2xl p-4 cursor-pointer transition-colors ${paymentMethod === "cod" ? "border-charmora-purple bg-charmora-purple/5" : "border-neutral-200 hover:border-charmora-purple/30"}`}
                                            onClick={() => setPaymentMethod("cod")}
                                        >
                                            <div className="flex items-center gap-3">
                                                <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${paymentMethod === "cod" ? "border-charmora-purple" : "border-neutral-300"}`}>
                                                    {paymentMethod === "cod" && <div className="w-2 h-2 rounded-full bg-charmora-purple" />}
                                                </div>
                                                <span className="font-bold text-charmora-purple">Cash on Delivery</span>
                                            </div>
                                            <p className="mt-2 ml-7 text-xs text-charmora-purple/70">50% Advance required via EasyPaisa.</p>
                                        </div>
                                    </div>

                                    <div className="border border-neutral-200 rounded-2xl p-6 md:p-8 space-y-5">
                                        <div className="flex justify-center">
                                            <Image
                                                src="/images/easypaisa-logo.svg"
                                                alt="EasyPaisa"
                                                width={160}
                                                height={48}
                                                className="h-12 w-auto"
                                            />
                                        </div>
                                        <h3 className="text-lg font-serif text-charmora-purple text-center">Our EasyPaisa Details</h3>
                                        <div className="space-y-3 text-sm">
                                            <div className="flex justify-between items-center bg-neutral-50 p-3 rounded-xl">
                                                <div>
                                                    <span className="font-bold text-charmora-purple block text-xs mb-0.5">Account Name</span>
                                                    <span>{EASYPAISA_DETAILS.accountName}</span>
                                                </div>
                                                <button type="button" onClick={() => handleCopy(EASYPAISA_DETAILS.accountName, "Account Name")} className="p-2 bg-white rounded-md border border-neutral-200 text-charmora-purple/60 hover:text-charmora-purple hover:bg-neutral-50 transition-colors" title="Copy">
                                                    {copiedField === "Account Name" ? <Check size={16} className="text-emerald-500" /> : <Copy size={16} />}
                                                </button>
                                            </div>
                                            <div className="flex justify-between items-center bg-neutral-50 p-3 rounded-xl">
                                                <div>
                                                    <span className="font-bold text-charmora-purple block text-xs mb-0.5">Phone Number</span>
                                                    <span>{EASYPAISA_DETAILS.phoneNumber}</span>
                                                </div>
                                                <button type="button" onClick={() => handleCopy(EASYPAISA_DETAILS.phoneNumber, "Phone Number")} className="p-2 bg-white rounded-md border border-neutral-200 text-charmora-purple/60 hover:text-charmora-purple hover:bg-neutral-50 transition-colors" title="Copy">
                                                    {copiedField === "Phone Number" ? <Check size={16} className="text-emerald-500" /> : <Copy size={16} />}
                                                </button>
                                            </div>
                                            <div className="flex justify-between items-center bg-neutral-50 p-3 rounded-xl">
                                                <div className="max-w-[80%]">
                                                    <span className="font-bold text-charmora-purple block text-xs mb-0.5">Account Number / IBAN</span>
                                                    <span className="font-mono text-xs break-all">{EASYPAISA_DETAILS.accountNumber}</span>
                                                </div>
                                                <button type="button" onClick={() => handleCopy(EASYPAISA_DETAILS.accountNumber, "Account Number")} className="p-2 bg-white rounded-md border border-neutral-200 text-charmora-purple/60 hover:text-charmora-purple hover:bg-neutral-50 transition-colors" title="Copy">
                                                    {copiedField === "Account Number" ? <Check size={16} className="text-emerald-500" /> : <Copy size={16} />}
                                                </button>
                                            </div>
                                            <div className="pt-2 border-t border-neutral-100">
                                                <span className="font-bold text-charmora-purple">Amount to Transfer: </span>
                                                <span className="text-lg font-serif font-bold text-charmora-pink-dark">
                                                    {paymentMethod === "cod" ? advanceAmount.toLocaleString() : grandTotal.toLocaleString()} PKR
                                                </span>
                                                {paymentMethod === "cod" && <span className="text-xs text-charmora-purple/60 ml-2">(50% Advance)</span>}
                                            </div>
                                        </div>
                                        <div className="flex items-start gap-3 bg-neutral-50 rounded-xl p-4">
                                            <AlertCircle size={18} className="text-amber-500 shrink-0 mt-0.5" />
                                            <p className="text-xs text-charmora-purple/70 italic leading-relaxed">
                                                Please transfer the exact amount of <strong>{paymentMethod === "cod" ? advanceAmount.toLocaleString() : grandTotal.toLocaleString()} PKR</strong> to the above EasyPaisa account and attach the payment proof below.
                                            </p>
                                        </div>
                                    </div>

                                    <div
                                        className={`border-2 border-dashed ${receiptError ? "border-red-500 bg-red-50/50" : "border-neutral-200"} rounded-2xl p-6 space-y-4 cursor-pointer hover:border-charmora-purple/30 transition-colors`}
                                        onClick={() => fileInputRef.current?.click()}
                                    >
                                            <div className="flex justify-between items-center">
                                                <div>
                                                    <p className={`font-bold text-sm ${receiptError ? "text-red-600" : "text-charmora-purple"}`}>Upload Payment Proof:</p>
                                                    <p className="text-xs text-charmora-purple/60 mt-1">Please upload an image smaller than 1 MB.</p>
                                                </div>
                                                {receiptError && <span className="text-xs font-bold text-red-600 bg-red-100 px-2 py-1 rounded-md h-fit">Required</span>}
                                            </div>
                                            <input
                                                ref={fileInputRef}
                                                type="file"
                                                accept="image/jpeg,image/jpg,image/png,image/webp"
                                                onChange={handleReceiptChange}
                                                className="hidden"
                                            />
                                            <div className="flex items-center gap-3">
                                                <div className="flex items-center gap-2 px-4 py-2 bg-neutral-100 rounded-lg text-xs font-bold text-charmora-purple">
                                                    <Upload size={14} />
                                                    Choose File
                                                </div>
                                                <span className="text-xs text-charmora-purple/50">
                                                    {receiptFile ? receiptFile.name : "No file chosen"}
                                                </span>
                                            </div>
                                            {receiptPreview && (
                                                <div className="relative w-full h-48 rounded-xl overflow-hidden bg-neutral-50 mt-2">
                                                    <Image
                                                        src={receiptPreview}
                                                        alt="Receipt preview"
                                                        fill
                                                        className="object-contain"
                                                    />
                                                </div>
                                            )}
                                    </div>

                                    <Button type="submit" className="w-full py-6 rounded-2xl text-lg tracking-widest" disabled={loading}>
                                        {loading ? "Processing..." : "Place Order"}
                                    </Button>
                                </form>
                            </>
                        )}
                    </div>

                    {orderSummary}
                </div>
            </div>
        </AppLayout>
    );
}

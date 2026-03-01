"use client";

import AppLayout from "@/components/layout";
import { products } from "@/lib/data";
import { Button } from "@/components/ui/Button";
import ProductCard from "@/components/ui/ProductCard";
import { motion } from "framer-motion";
import Image from "next/image";
import { Plus, Minus, Heart, Share2 } from "lucide-react";
import { useParams } from "next/navigation";
import { useState } from "react";

export default function ProductDetail() {
    const { slug } = useParams();
    const product = products.find(p => p.id === slug) || products[0];
    const relatedProducts = products.filter(p => p.id !== product.id).slice(0, 4);
    const [quantity, setQuantity] = useState(1);

    return (
        <AppLayout>
            <section className="pt-20 pb-24 px-6 md:px-12 bg-luxury-ivory">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 mb-24">

                        {/* Gallery */}
                        <div className="space-y-6">
                            <motion.div
                                initial={{ opacity: 0, scale: 0.98 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="aspect-square bg-white relative rounded-2xl overflow-hidden border border-luxury-charcoal/5 shadow-sm"
                            >
                                <Image
                                    src={product.image}
                                    alt={product.name}
                                    fill
                                    className="object-cover"
                                    priority
                                />
                            </motion.div>
                            <div className="grid grid-cols-4 gap-4">
                                {[1, 2, 3, 4].map((i) => (
                                    <div key={i} className="aspect-square bg-white border border-luxury-charcoal/10 rounded-lg relative cursor-pointer hover:border-luxury-amber transition-colors overflow-hidden">
                                        <Image
                                            src={product.image}
                                            alt={`${product.name} view ${i}`}
                                            fill
                                            className="object-cover opacity-60 hover:opacity-100 transition-opacity"
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Info */}
                        <div className="flex flex-col pt-4">
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.8 }}
                            >
                                <h1 className="text-4xl md:text-5xl text-luxury-charcoal font-serif font-bold mb-4">{product.name}</h1>
                                <p className="text-2xl text-luxury-amber font-sans font-bold mb-8">{product.price.toLocaleString()} PKR</p>

                                <div className="space-y-6 mb-10">
                                    <div className="flex flex-col gap-3">
                                        <span className="text-[10px] uppercase tracking-widest text-luxury-charcoal font-bold">Quantity</span>
                                        <div className="flex items-center border border-luxury-charcoal/10 rounded-sm h-12 w-32 bg-white">
                                            <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="flex-1 flex items-center justify-center text-luxury-charcoal/40 hover:text-luxury-amber transition-colors border-r border-luxury-charcoal/10 h-full"><Minus size={14} /></button>
                                            <span className="flex-1 text-center text-sm font-sans font-bold text-luxury-charcoal">{quantity}</span>
                                            <button onClick={() => setQuantity(quantity + 1)} className="flex-1 flex items-center justify-center text-luxury-charcoal/40 hover:text-luxury-amber transition-colors border-l border-luxury-charcoal/10 h-full"><Plus size={14} /></button>
                                        </div>
                                    </div>

                                    <div className="flex flex-col gap-3">
                                        <label className="text-[10px] uppercase tracking-widest text-luxury-charcoal font-bold">Customization (if any)</label>
                                        <input
                                            type="text"
                                            placeholder="Optional"
                                            className="w-full bg-[#f8f9fa] border border-luxury-charcoal/10 rounded-sm py-3 px-4 text-sm focus:border-luxury-amber outline-none transition-colors"
                                        />
                                    </div>
                                </div>

                                <div className="flex flex-col gap-4 mb-12">
                                    <div className="flex gap-4">
                                        <Button variant="primary" className="h-14 flex-grow tracking-[0.2em] font-bold shadow-xl">Add to Bag</Button>
                                        <button className="flex items-center justify-center w-14 h-14 rounded-sm border border-luxury-charcoal/10 hover:border-luxury-amber hover:text-luxury-amber transition-all text-luxury-charcoal/40 bg-white">
                                            <Heart size={20} />
                                        </button>
                                    </div>
                                    <Button variant="dark" className="h-14 w-full tracking-[0.2em] font-bold">Buy It Now</Button>
                                </div>

                                <div className="prose prose-sm text-luxury-charcoal/70 leading-relaxed font-sans border-t border-luxury-charcoal/5 pt-10">
                                    <h3 className="text-xl font-serif text-luxury-charcoal mb-4 font-bold">Description</h3>
                                    <p className="mb-4">{product.description}</p>
                                    <ul className="list-disc pl-5 space-y-2">
                                        <li>Material: {product.materials}</li>
                                        <li>Size: Adjustable Standard</li>
                                        <li>Hand-finished and inspected</li>
                                    </ul>
                                </div>
                            </motion.div>
                        </div>
                    </div>

                    {/* Related Products */}
                    <div className="pt-24 border-t border-luxury-charcoal/5">
                        <h2 className="text-3xl font-serif text-luxury-charcoal font-bold text-center mb-16">Recommended Pieces</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                            {relatedProducts.map(p => (
                                <ProductCard key={p.id} {...p} />
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        </AppLayout>
    );
}

"use client";

import AppLayout from "@/components/layout";
import ProductCard from "@/components/ui/ProductCard";
import { products } from "@/lib/data";
import { motion } from "framer-motion";
import { SlidersHorizontal, ChevronDown } from "lucide-react";
import { useSearchParams, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

export default function ShopPage() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const currentCategory = searchParams.get("category") || "All";

    const filteredProducts = currentCategory === "All"
        ? products
        : products.filter(p => p.category.toLowerCase() === currentCategory.toLowerCase());

    const categories = ["All", "Necklaces", "Bracelets", "Artisan Pieces"];

    const handleCategoryChange = (category: string) => {
        if (category === "All") {
            router.push("/shop");
        } else {
            router.push(`/shop?category=${category.toLowerCase()}`);
        }
    };

    return (
        <AppLayout>
            <section className="pt-40 pb-24 px-6 md:px-12 bg-luxury-ivory">
                <div className="max-w-7xl mx-auto">
                    {/* Header */}
                    <div className="text-center mb-20">
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-4xl md:text-6xl text-luxury-charcoal font-serif mb-6"
                        >
                            {currentCategory === "All" ? "The Collections" : currentCategory}
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.2 }}
                            className="text-sm text-luxury-charcoal/60 uppercase tracking-[0.2em] font-sans"
                        >
                            Exquisite handmade artisan jewelry
                        </motion.p>
                    </div>

                    {/* Filters UI */}
                    <div className="flex flex-col md:flex-row items-center justify-between py-6 border-y border-luxury-gold/10 mb-16 gap-6">
                        <div className="flex items-center gap-8">
                            <button className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-luxury-charcoal hover:text-luxury-gold transition-colors font-sans">
                                <SlidersHorizontal size={14} />
                                Filters
                            </button>
                            <div className="hidden md:flex gap-6 items-center">
                                {categories.map((cat) => (
                                    <button
                                        key={cat}
                                        onClick={() => handleCategoryChange(cat)}
                                        className={cn(
                                            "text-[10px] uppercase tracking-widest transition-colors font-sans border-b border-transparent hover:text-luxury-gold",
                                            currentCategory.toLowerCase() === cat.toLowerCase()
                                                ? "text-luxury-gold border-luxury-gold/30"
                                                : "text-luxury-charcoal/40"
                                        )}
                                    >
                                        {cat}
                                    </button>
                                ))}
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="text-[10px] uppercase tracking-widest text-luxury-charcoal/40 font-sans">Sort By:</span>
                            <button className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-luxury-charcoal font-sans">
                                New Arrivals
                                <ChevronDown size={14} strokeWidth={1.5} />
                            </button>
                        </div>
                    </div>

                    {/* Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16 lg:gap-x-12 lg:gap-y-24">
                        {filteredProducts.map((product) => (
                            <ProductCard
                                key={product.id}
                                {...product}
                            />
                        ))}
                    </div>

                    {filteredProducts.length === 0 && (
                        <div className="py-24 text-center">
                            <p className="text-luxury-charcoal/40 font-serif text-xl italic">No pieces found in this collection.</p>
                        </div>
                    )}

                    {/* Load More Placeholder */}
                    {filteredProducts.length > 0 && (
                        <div className="mt-24 text-center">
                            <button className="group text-[10px] uppercase tracking-[0.3em] text-luxury-gold font-sans flex flex-col items-center mx-auto">
                                Show More
                                <div className="mt-4 w-10 h-[1px] bg-luxury-gold group-hover:w-20 transition-all duration-500" />
                            </button>
                        </div>
                    )}
                </div>
            </section>
        </AppLayout>
    );
}

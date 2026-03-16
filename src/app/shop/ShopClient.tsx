"use client";

import { motion } from "framer-motion";
import { SlidersHorizontal, ChevronDown } from "lucide-react";
import { useSearchParams, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import ProductCard from "@/components/ui/ProductCard";
import { Product, Category } from "@prisma/client";

interface ShopClientProps {
    products: (Product & { category: Category })[];
    categories: Category[];
}

export default function ShopClient({ products, categories }: ShopClientProps) {
    const searchParams = useSearchParams();
    const router = useRouter();
    const currentCategorySlug = searchParams.get("category") || "all";

    const filteredProducts = currentCategorySlug === "all"
        ? products
        : products.filter(p => p.category.slug.toLowerCase() === currentCategorySlug.toLowerCase());

    const handleCategoryChange = (slug: string) => {
        if (slug === "all") {
            router.push("/shop");
        } else {
            router.push(`/shop?category=${slug}`);
        }
    };

    const currentCategoryName = currentCategorySlug === "all" 
        ? "The Collections" 
        : categories.find(c => c.slug === currentCategorySlug)?.name || "The Collections";

    return (
        <section className="pt-40 pb-24 px-6 md:px-12 bg-charmora-beige">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="text-center mb-20">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-4xl md:text-6xl text-charmora-purple font-serif mb-6"
                    >
                        {currentCategoryName}
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="text-sm text-charmora-purple/60 uppercase tracking-[0.2em] font-sans"
                    >
                        Exquisite handmade artisan jewelry
                    </motion.p>
                </div>

                {/* Filters UI */}
                <div className="flex flex-col md:flex-row items-center justify-between py-6 border-y border-charmora-pink-dark/10 mb-16 gap-6">
                    <div className="flex items-center gap-8">
                        <button className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-charmora-purple hover:text-charmora-pink-dark transition-colors font-sans">
                            <SlidersHorizontal size={14} />
                            Filters
                        </button>
                        <div className="hidden md:flex gap-6 items-center">
                            <button
                                onClick={() => handleCategoryChange("all")}
                                className={cn(
                                    "text-[10px] uppercase tracking-widest transition-colors font-sans border-b border-transparent hover:text-charmora-pink-dark",
                                    currentCategorySlug === "all"
                                        ? "text-charmora-pink-dark border-charmora-pink-dark/30"
                                        : "text-charmora-purple/40"
                                )}
                            >
                                All
                            </button>
                            {categories.map((cat) => (
                                <button
                                    key={cat.id}
                                    onClick={() => handleCategoryChange(cat.slug)}
                                    className={cn(
                                        "text-[10px] uppercase tracking-widest transition-colors font-sans border-b border-transparent hover:text-charmora-pink-dark",
                                        currentCategorySlug === cat.slug
                                            ? "text-charmora-pink-dark border-charmora-pink-dark/30"
                                            : "text-charmora-purple/40"
                                    )}
                                >
                                    {cat.name}
                                </button>
                            ))}
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="text-[10px] uppercase tracking-widest text-charmora-purple/40 font-sans">Sort By:</span>
                        <button className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-charmora-purple font-sans">
                            New Arrivals
                            <ChevronDown size={14} strokeWidth={1.5} />
                        </button>
                    </div>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-10 md:gap-x-12 md:gap-y-24">
                    {filteredProducts.map((product) => (
                        <ProductCard
                            key={product.id}
                            id={product.id}
                            slug={product.slug}
                            name={product.title}
                            price={product.price}
                            image={product.image || "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=1000"}
                            category={product.category.name}
                        />
                    ))}
                </div>

                {filteredProducts.length === 0 && (
                    <div className="py-24 text-center">
                        <p className="text-charmora-purple/40 font-serif text-xl italic">No pieces found in this collection.</p>
                    </div>
                )}

                {/* Load More Placeholder */}
                {filteredProducts.length > 0 && (
                    <div className="mt-24 text-center">
                        <button className="group text-[10px] uppercase tracking-[0.3em] text-charmora-pink-dark font-sans flex flex-col items-center mx-auto">
                            Show More
                            <div className="mt-4 w-10 h-[1px] bg-charmora-pink-dark group-hover:w-20 transition-all duration-500" />
                        </button>
                    </div>
                )}
            </div>
        </section>
    );
}

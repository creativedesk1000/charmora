"use client";

import { motion } from "framer-motion";
import ProductCard from "@/components/ui/ProductCard";
import { products } from "@/lib/data";
import Link from "next/link";

export default function FeaturedCollection() {
    const featured = products.slice(0, 4);

    return (
        <section className="py-24 px-6 md:px-12 bg-luxury-ivory">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-4xl md:text-5xl text-luxury-charcoal font-serif font-semibold mb-4"
                    >
                        Our Best Sellers
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="text-sm text-luxury-charcoal/60 max-w-2xl mx-auto font-sans"
                    >
                        Discover our most loved pieces, handcrafted with precision and passion.
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {featured.map((product, index) => (
                        <ProductCard
                            key={product.id}
                            {...product}
                            isBestseller={index === 0}
                        />
                    ))}
                </div>

                <div className="mt-20 text-center">
                    <Link
                        href="/shop"
                        className="inline-block amber-gradient text-white px-10 py-4 rounded-[2px] text-xs uppercase tracking-[0.2em] font-bold hover:opacity-90 transition-opacity shadow-lg"
                    >
                        View All Collections
                    </Link>
                </div>
            </div>
        </section>
    );
}

"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface ProductCardProps {
    id: string;
    name: string;
    price: number;
    image: string;
    category: string;
    className?: string;
    isBestseller?: boolean;
}

export default function ProductCard({ id, name, price, image, category, className, isBestseller }: ProductCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className={cn("group relative", className)}
        >
            <Link href={`/shop/${id}`} className="block">
                <div className="aspect-square overflow-hidden bg-white relative mb-5 rounded-2xl shadow-sm border border-luxury-charcoal/5">
                    <Image
                        src={image}
                        alt={name}
                        fill
                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                        draggable={false}
                    />
                    {isBestseller && (
                        <div className="absolute top-4 left-4 bg-[#EA580C] text-white text-[10px] uppercase tracking-widest px-3 py-1 rounded-sm font-bold shadow-lg">
                            Bestseller
                        </div>
                    )}
                </div>
            </Link>

            <div className="space-y-1">
                <Link href={`/shop/${id}`}>
                    <h3 className="text-xl font-serif text-luxury-charcoal group-hover:text-luxury-amber transition-colors duration-300 font-semibold leading-tight">
                        {name}
                    </h3>
                </Link>
                <p className="text-lg text-luxury-amber font-sans font-bold">
                    {price.toLocaleString()} PKR
                </p>
            </div>
        </motion.div>
    );
}

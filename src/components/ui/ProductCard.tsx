"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useCart } from "@/context/CartContext";
import { ShoppingBag, Zap } from "lucide-react";
import { useRouter } from "next/navigation";

interface ProductCardProps {
    id: string;
    slug: string;
    name: string;
    price: number;
    image: string;
    category: string;
    className?: string;
    isBestseller?: boolean;
}

export default function ProductCard({ id, slug, name, price, image, category, className, isBestseller }: ProductCardProps) {
    const { addToCart } = useCart();
    const router = useRouter();

    const handleAddToCart = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        addToCart({
            id,
            title: name,
            price,
            image,
            quantity: 1
        });
    };

    const handleBuyNow = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        addToCart({
            id,
            title: name,
            price,
            image,
            quantity: 1
        });
        router.push("/checkout");
    };

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className={cn("group relative bg-white rounded-2xl border border-charmora-purple/5 shadow-sm hover:shadow-xl hover:shadow-charmora-pink-dark/10 transition-all duration-500 overflow-hidden", className)}
        >
            <Link href={`/shop/${slug}`} className="block relative aspect-[4/5] overflow-hidden">
                <Image
                    src={image}
                    alt={name}
                    fill
                    className="object-cover transition-transform duration-1000 ease-out group-hover:scale-110"
                    draggable={false}
                />
                
                {/* Status Badges */}
                <div className="absolute top-3 left-3 flex flex-col gap-2 z-10">
                    {isBestseller && (
                        <span className="bg-charmora-pink-dark text-white text-[9px] uppercase tracking-widest px-2 py-1 rounded-full font-bold shadow-lg backdrop-blur-md">
                            Bestseller
                        </span>
                    )}
                </div>

                {/* Hover Overlay Actions */}
                <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2">
                    <button 
                        onClick={handleAddToCart}
                        className="p-3 bg-white text-charmora-purple rounded-full shadow-lg hover:bg-charmora-pink-dark hover:text-white transition-all duration-300 transform translate-y-4 group-hover:translate-y-0 active:scale-90"
                        title="Add to Bag"
                    >
                        <ShoppingBag size={18} />
                    </button>
                </div>
            </Link>

            <div className="p-3 space-y-2">
                <Link href={`/shop/${slug}`}>
                    <h3 className="text-xs md:text-sm font-serif text-charmora-purple group-hover:text-charmora-pink-dark transition-colors duration-300 font-bold leading-tight truncate">
                        {name}
                    </h3>
                </Link>
                
                <div className="flex items-center justify-between">
                    <p className="text-xs md:text-sm text-charmora-pink-dark font-sans font-bold">
                        {price.toLocaleString()} <span className="text-[10px] opacity-60">PKR</span>
                    </p>
                </div>

                {/* Quick Buttons */}
                <div className="grid grid-cols-2 gap-2 pt-1 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-500">
                    <button 
                        onClick={handleAddToCart}
                        className="flex items-center justify-center gap-1 py-1.5 px-1 bg-neutral-50 text-charmora-purple rounded-lg text-[8px] font-bold border border-neutral-100 hover:bg-neutral-100 transition-colors"
                    >
                        <ShoppingBag size={10} />
                        BAG
                    </button>
                    <button 
                        onClick={handleBuyNow}
                        className="flex items-center justify-center gap-1 py-1.5 px-1 bg-charmora-pink-dark text-white rounded-lg text-[8px] font-bold shadow-lg shadow-pink-100 hover:bg-[#A03800] transition-colors"
                    >
                        <Zap size={10} fill="currentColor" />
                        BUY
                    </button>
                </div>
            </div>
        </motion.div>
    );
}


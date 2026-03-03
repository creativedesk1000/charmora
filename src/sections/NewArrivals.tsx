"use client";

import Image from "next/image";
import Link from "next/link";
import { products } from "@/lib/data";

export default function NewArrivals() {
    // Take the first 4 products as new arrivals
    const newArrivals = products.slice(0, 4);

    return (
        <section className="py-16 md:py-24 px-6 md:px-12 bg-white">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-12 md:mb-16">
                    <h2 className="text-3xl md:text-4xl font-serif text-charmora-purple flex items-center justify-center gap-2">
                        New Arrival <span className="text-charmora-pink-dark">✨</span>
                    </h2>
                    <p className="text-xs md:text-sm text-gray-500 mt-2 font-sans tracking-wide">
                        Freshly added — our latest handcrafted pieces. Updated automatically.
                    </p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
                    {newArrivals.map((product) => (
                        <Link key={product.id} href={`/shop/${product.id}`} className="group">
                            <div className="relative aspect-square overflow-hidden rounded-lg bg-gray-100 mb-4 shadow-sm border border-gray-100 group-hover:shadow-md transition-shadow duration-300">
                                <Image
                                    src={product.image}
                                    alt={product.name}
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                                />
                            </div>
                            <div className="space-y-1">
                                <h3 className="text-sm md:text-base font-semibold text-charmora-purple leading-tight group-hover:text-charmora-pink-dark transition-colors duration-300">
                                    {product.name}
                                </h3>
                                <p className="text-sm md:text-base text-[#C04800] font-medium">
                                    {product.price.toLocaleString()} PKR
                                </p>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}


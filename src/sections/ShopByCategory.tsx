"use client";

import Image from "next/image";
import Link from "next/link";

const categories = [
    { name: "Bracelet", image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?q=80&w=600&auto=format&fit=crop" },
    { name: "Earring", image: "https://images.unsplash.com/photo-mbSmroQl_V0?q=80&w=600&auto=format&fit=crop" },
    { name: "Necklace", image: "https://images.unsplash.com/photo-1599643477877-530eb83abc8e?q=80&w=600&auto=format&fit=crop" },
    { name: "Bag", image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=600&auto=format&fit=crop" },
    { name: "Others", image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=600&auto=format&fit=crop" },
    { name: "Ringlet", image: "https://images.unsplash.com/photo-3_YP8_mh-Kg?q=80&w=600&auto=format&fit=crop" },
    { name: "Anklet", image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=600&auto=format&fit=crop" },
    { name: "Rings", image: "https://images.unsplash.com/photo-yEJwDxAoHc0?q=80&w=600&auto=format&fit=crop" },
    { name: "Headpiece", image: "https://images.unsplash.com/photo-1531995811006-35cb42e1a022?q=80&w=600&auto=format&fit=crop" },
];

export default function ShopByCategory() {
    return (
        <section className="py-16 md:py-24 px-6 md:px-12 bg-white overflow-hidden">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-12 md:mb-16">
                    <h2 className="text-3xl md:text-4xl font-serif text-charmora-purple flex items-center justify-center gap-2">
                        Shop By Category <span className="text-charmora-pink-dark">✨</span>
                    </h2>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-3 gap-y-12 gap-x-8 md:gap-x-12">
                    {categories.map((category) => (
                        <Link
                            key={category.name}
                            href={`/shop?category=${category.name.toLowerCase()}`}
                            className="group flex flex-col items-center gap-4"
                        >
                            <div className="relative w-32 h-32 md:w-48 md:h-48 rounded-full overflow-hidden border-2 border-charmora-pink/30 group-hover:border-charmora-pink-dark transition-colors duration-500 shadow-lg">
                                <Image
                                    src={category.image}
                                    alt={category.name}
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                            </div>
                            <span className="text-sm md:text-base font-medium text-charmora-purple group-hover:text-charmora-pink-dark transition-colors duration-300">
                                {category.name}
                            </span>
                        </Link>
                    ))}
                </div>

                <div className="mt-16 text-center">
                    <Link
                        href="/shop"
                        className="inline-flex items-center gap-2 px-8 py-3 bg-[#C04800] text-white rounded-full hover:bg-[#A03800] transition-colors duration-300 font-medium"
                    >
                        View All Collections <span className="text-lg">→</span>
                    </Link>
                </div>
            </div>
        </section>
    );
}

import Image from "next/image";
import Link from "next/link";
import prisma from "@/lib/db";

export default async function Bestsellers() {
    const bestsellers = await prisma.product.findMany({
        where: { isBestseller: true, status: "ACTIVE" },
        take: 4,
        orderBy: { updatedAt: "desc" },
    });

    return (
        <section className="py-16 md:py-24 px-6 md:px-12 bg-white">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-12 md:mb-16">
                    <div className="inline-block px-3 py-1 bg-[#FFF5E6] text-[#C04800] text-[10px] uppercase tracking-widest font-bold rounded-full mb-4">
                        ● Customer Favorites
                    </div>
                    <h2 className="text-3xl md:text-4xl font-serif text-charmora-purple flex items-center justify-center gap-2">
                        Our Bestsellers <span className="text-[#C04800]">🎀</span>
                    </h2>
                    <p className="text-xs md:text-sm text-gray-500 mt-2 font-sans tracking-wide">
                        Discover our most loved pieces — updated automatically.
                    </p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
                    {bestsellers.map((product) => (
                        <Link key={product.id} href={`/shop/${product.id}`} className="group relative">
                            <div className="relative aspect-square overflow-hidden rounded-lg bg-gray-100 mb-4 shadow-sm border border-gray-100 group-hover:shadow-md transition-shadow duration-300">
                                <div className="absolute top-2 left-2 z-10 px-2 py-1 bg-[#EE8E3B] text-white text-[10px] font-bold rounded-md flex items-center gap-1">
                                    Bestseller
                                </div>
                                <Image
                                    src={product.image || "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=600&auto=format&fit=crop"}
                                    alt={product.title}
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                                />
                            </div>
                            <div className="space-y-1">
                                <h3 className="text-sm md:text-base font-semibold text-charmora-purple leading-tight group-hover:text-charmora-pink-dark transition-colors duration-300">
                                    {product.title}
                                </h3>
                                <p className="text-sm md:text-base text-[#C04800] font-medium">
                                    {product.price.toLocaleString()} PKR
                                </p>
                            </div>
                        </Link>
                    ))}
                </div>

                <div className="mt-16 text-center">
                    <Link
                        href="/shop"
                        className="inline-flex items-center gap-2 px-8 py-3 bg-[#EE8E3B] text-white rounded-full hover:bg-[#D07E2E] transition-colors duration-300 font-medium"
                    >
                        View All Bestsellers
                    </Link>
                </div>
            </div>
        </section>
    );
}



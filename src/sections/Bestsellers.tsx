import prisma from "@/lib/db";
import ProductCard from "@/components/ui/ProductCard";
import Link from "next/link";

export default async function Bestsellers() {
    let bestsellers: any[] = [];
    try {
        bestsellers = await prisma.product.findMany({
            where: { isBestseller: true, status: "ACTIVE" },
            take: 4,
            orderBy: { updatedAt: "desc" },
            include: { category: true }
        });
    } catch (error) {
        console.error("Failed to fetch bestsellers:", error);
    }

    return (
        <section className="py-16 md:py-24 px-6 md:px-12 bg-white overflow-hidden">
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

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
                    {bestsellers.length > 0 ? (
                        bestsellers.map((product) => (
                            <ProductCard
                                key={product.id}
                                id={product.id}
                                slug={product.slug}
                                name={product.title}
                                price={product.price}
                                image={product.image || "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=600&auto=format&fit=crop"}
                                category={product.category?.name || "General"}
                                isBestseller={product.isBestseller}
                            />
                        ))
                    ) : (
                        <div className="col-span-full py-12 text-center text-gray-400 font-serif italic">
                            Our bestsellers are being restocked...
                        </div>
                    )}
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



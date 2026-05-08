import prisma from "@/lib/db";
import ProductCard from "@/components/ui/ProductCard";

export default async function NewArrivals() {
    let newArrivals: any[] = [];
    try {
        newArrivals = await prisma.product.findMany({
            where: { isNewArrival: true, status: "ACTIVE" },
            take: 4,
            orderBy: { createdAt: "desc" },
            include: { category: true }
        });
    } catch (error) {
        console.error("Failed to fetch new arrivals:", error);
    }

    return (
        <section className="py-16 md:py-24 px-6 md:px-12 bg-white overflow-hidden">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-12 md:mb-16">
                    <h2 className="text-3xl md:text-4xl font-serif text-charmora-purple flex items-center justify-center gap-2">
                        New Arrival <span className="text-charmora-pink-dark">✨</span>
                    </h2>
                    <p className="text-xs md:text-sm text-gray-500 mt-2 font-sans tracking-wide">
                        Freshly added — our latest handcrafted pieces. Updated automatically.
                    </p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
                    {newArrivals.length > 0 ? (
                        newArrivals.map((product) => (
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
                            New collection arriving soon...
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}



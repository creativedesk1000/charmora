import Image from "next/image";
import Link from "next/link";
import prisma from "@/lib/db";

export default async function ShopByCategory() {
    const categories = await prisma.category.findMany();

    return (
        <section className="py-24 px-6 md:px-12 bg-[#FFFDFB]">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <span className="text-xs uppercase tracking-[0.4em] text-charmora-pink-dark font-medium mb-4 block font-sans">Curated Collections</span>
                    <h2 className="text-4xl md:text-5xl font-serif text-charmora-purple">Shop by Category</h2>
                </div>

                <div className="grid grid-cols-3 md:grid-cols-5 lg:grid-cols-9 gap-4 md:gap-8">
                    {categories.map((category) => (
                        <Link
                            key={category.id}
                            href={`/shop?category=${category.slug}`}
                            className="group flex flex-col items-center gap-4 transition-all"
                        >
                            <div className="relative w-16 h-16 md:w-24 md:h-24 rounded-full overflow-hidden border-2 border-transparent group-hover:border-charmora-pink/30 transition-all shadow-sm group-hover:shadow-md">
                                <Image
                                    src={(category as any).image || "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=600&auto=format&fit=crop"}
                                    alt={category.name}
                                    fill
                                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                                />
                            </div>
                            <span className="text-[10px] md:text-xs uppercase tracking-widest text-charmora-purple/60 group-hover:text-charmora-pink-dark font-sans font-bold transition-colors">
                                {category.name}
                            </span>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}

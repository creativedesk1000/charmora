import Image from "next/image";
import Link from "next/link";
import db from "@/lib/db";

export default async function ShopByCategory() {
    const categories = await db.category.findMany({
        include: {
            _count: {
                select: { products: true }
            }
        }
    });

    return (
        <section id="collections" className="py-24 px-6 md:px-12 bg-charmora-beige overflow-hidden">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
                    <div>
                        <h2 className="text-sm font-sans uppercase tracking-[0.3em] text-charmora-purple/60 mb-4">The Collections</h2>
                        <p className="text-4xl md:text-5xl lg:text-6xl text-charmora-purple font-serif leading-tight">
                            Shop by <span className="italic">Category</span>
                        </p>
                    </div>
                    <Link
                        href="/shop"
                        className="text-[10px] uppercase tracking-widest text-charmora-pink-dark font-bold border-b border-charmora-pink-dark/20 pb-1 hover:border-charmora-pink-dark transition-colors"
                    >
                        View All Collections
                    </Link>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">
                    {categories.map((category) => (
                        <Link
                            key={category.id}
                            href={`/shop?category=${category.slug}`}
                            className="group relative h-40 md:h-56 rounded-3xl overflow-hidden bg-white/50 backdrop-blur-sm border border-charmora-pink-dark/5 p-6 flex flex-col justify-between hover:bg-white hover:shadow-xl hover:shadow-charmora-pink-dark/5 transition-all duration-500"
                        >
                            <div className="flex flex-col h-full justify-between relative z-10">
                                <div className="flex flex-col gap-3">
                                    <div className="text-[10px] font-sans font-bold text-charmora-purple/40 uppercase tracking-widest">
                                        {category._count.products} Pieces
                                    </div>
                                    <div className="w-12 h-12 rounded-xl overflow-hidden border border-charmora-pink-dark/10 shadow-sm">
                                        {category.image ? (
                                            <img 
                                                src={category.image} 
                                                alt={category.name} 
                                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                                            />
                                        ) : (
                                            <div className="w-full h-full bg-charmora-pink/20 text-charmora-purple flex items-center justify-center font-bold text-xs">
                                                {category.name.charAt(0)}
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <div>
                                    <h3 className="text-xl text-charmora-purple font-serif mb-2">{category.name}</h3>
                                    <div className="w-8 h-[1px] bg-charmora-pink-dark/30 group-hover:w-full transition-all duration-700" />
                                </div>
                            </div>
                            
                            {/* Subtle Background Accent */}
                            {category.image && (
                                <div 
                                    className="absolute inset-0 opacity-[0.03] grayscale transition-opacity group-hover:opacity-[0.07]"
                                    style={{ 
                                        backgroundImage: `url(${category.image})`,
                                        backgroundSize: 'cover',
                                        backgroundPosition: 'center'
                                    }}
                                />
                            )}
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}

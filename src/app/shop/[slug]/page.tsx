export const dynamic = "force-dynamic";

import AppLayout from "@/components/layout";
import { Button } from "@/components/ui/Button";
import ProductCard from "@/components/ui/ProductCard";
import Image from "next/image";
import { Plus, Minus, Heart, Share2 } from "lucide-react";
import prisma from "@/lib/db";
import { notFound } from "next/navigation";
import ProductClient from "./ProductClient";
import ProductGallery from "./ProductGallery";

export default async function ProductDetail({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    let product: any = null;
    let relatedProducts: any[] = [];

    try {
        product = await prisma.product.findUnique({
            where: { slug: slug },
            include: { category: true }
        });

        if (product) {
            relatedProducts = await prisma.product.findMany({
                where: {
                    categoryId: product.categoryId,
                    id: { not: product.id },
                    status: "ACTIVE"
                },
                include: { category: true },
                take: 4
            });
        }
    } catch (error) {
        console.error("Failed to fetch product detail:", error);
    }

    if (!product) {
        notFound();
    }

    return (
        <AppLayout>
            <section className="pt-20 pb-24 px-6 md:px-12 bg-charmora-beige">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 mb-24">

                        {/* Gallery */}
                        <ProductGallery 
                            mainImage={product.image || "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=1000"} 
                            images={product.images || []} 
                            title={product.title} 
                        />

                        {/* Info */}
                        <div className="flex flex-col pt-4">
                            <h1 className="text-4xl md:text-5xl text-charmora-purple font-serif font-bold mb-4">{product.title}</h1>
                            <p className="text-2xl text-charmora-pink-dark font-sans font-bold mb-8">{product.price.toLocaleString()} PKR</p>

                            <ProductClient
                                id={product.id}
                                title={product.title}
                                price={product.price}
                                description={product.description}
                                image={product.image || "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=1000"}
                            />

                        </div>
                    </div>

                    {/* Related Products */}
                    <div className="pt-24 border-t border-charmora-purple/5">
                        <h2 className="text-3xl font-serif text-charmora-purple font-bold text-center mb-16">Recommended Pieces</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                            {relatedProducts.map(p => (
                                <ProductCard
                                    key={p.id}
                                    id={p.id}
                                    slug={p.slug}
                                    name={p.title}
                                    price={p.price}
                                    image={p.image || ""}
                                    category={p.category.name}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        </AppLayout>
    );
}


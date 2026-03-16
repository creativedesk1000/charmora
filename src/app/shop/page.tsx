export const dynamic = "force-dynamic";

import AppLayout from "@/components/layout";
import prisma from "@/lib/db";
import { Suspense } from "react";
import ShopClient from "./ShopClient";

export default async function ShopPage() {
    let products: any[] = [];
    let categories: any[] = [];

    try {
        products = await prisma.product.findMany({
            where: { status: "ACTIVE" },
            include: { category: true },
            orderBy: { createdAt: "desc" }
        });

        categories = await prisma.category.findMany({
            orderBy: { name: "asc" }
        });
    } catch (error) {
        console.error("Failed to fetch shop data:", error);
    }

    return (
        <AppLayout>
            <Suspense fallback={
                <div className="pt-40 pb-24 text-center bg-charmora-beige min-h-screen">
                    <p className="text-charmora-purple/40 font-serif text-xl animate-pulse italic">Loading collections...</p>
                </div>
            }>
                <ShopClient products={products} categories={categories} />
            </Suspense>
        </AppLayout>
    );
}



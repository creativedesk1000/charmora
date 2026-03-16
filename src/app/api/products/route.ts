import { NextResponse } from "next/server";
import prisma from "@/lib/db";
import { slugify } from "@/lib/utils";

// GET all products
export async function GET() {
    try {
        const products = await prisma.product.findMany({
            include: { category: true },
            orderBy: { createdAt: "desc" },
        });
        return NextResponse.json(products);
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 });
    }
}

// POST new product
export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { title, description, price, stock, categoryId, image } = body;

        const product = await prisma.product.create({
            data: {
                title,
                description,
                price: parseFloat(price),
                stock: parseInt(stock),
                image,
                slug: `${slugify(title)}-${Date.now()}`,
                category: {
                    connect: { id: categoryId }
                }
            },
        });

        return NextResponse.json(product, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: "Failed to create product" }, { status: 500 });
    }
}

"use server";

import prisma from "@/lib/db";
import { revalidatePath } from "next/cache";

// Product Actions
export async function createProduct(data: any) {
    try {
        const product = await prisma.product.create({
            data: {
                title: data.name,
                description: data.description,
                price: parseFloat(data.price),
                stock: parseInt(data.stock),
                categoryId: data.categoryId,
                image: data.image || "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=1000",
                isBestseller: !!data.isBestseller,
                isNewArrival: !!data.isNewArrival,
                isFeatured: !!data.isFeatured,
            }
        });
        revalidatePath("/admin/products");
        return { success: true, product };
    } catch (error) {
        console.error("Create Product Error:", error);
        return { success: false, error: "Failed to create masterpiece." };
    }
}

export async function updateProduct(id: string, data: any) {
    try {
        const product = await prisma.product.update({
            where: { id },
            data: {
                title: data.name,
                description: data.description,
                price: parseFloat(data.price),
                stock: parseInt(data.stock),
                categoryId: data.categoryId,
                image: data.image,
                isBestseller: !!data.isBestseller,
                isNewArrival: !!data.isNewArrival,
                isFeatured: !!data.isFeatured,
            }
        });
        revalidatePath("/admin/products");
        return { success: true, product };
    } catch (error) {
        console.error("Update Product Error:", error);
        return { success: false, error: "Failed to update centerpiece." };
    }
}

export async function deleteProduct(id: string) {
    try {
        await prisma.product.delete({ where: { id } });
        revalidatePath("/admin/products");
        return { success: true };
    } catch (error) {
        console.error("Delete Product Error:", error);
        return { success: false, error: "Archival failed." };
    }
}

// Category Actions
export async function createCategory(data: any) {
    try {
        const category = await prisma.category.create({ data });
        revalidatePath("/admin/categories");
        return { success: true, category };
    } catch (error) {
        return { success: false, error: "Collection creation failed." };
    }
}

export async function updateCategory(id: string, data: any) {
    try {
        const category = await prisma.category.update({
            where: { id },
            data
        });
        revalidatePath("/admin/categories");
        return { success: true, category };
    } catch (error) {
        return { success: false, error: "Collection update failed." };
    }
}

export async function deleteCategory(id: string) {
    try {
        await prisma.category.delete({ where: { id } });
        revalidatePath("/admin/categories");
        return { success: true };
    } catch (error) {
        return { success: false, error: "Archive failed. Ensure collection is empty." };
    }
}

// User Actions
export async function toggleUserRole(id: string, currentRole: string) {
    try {
        const newRole = currentRole === "ADMIN" ? "USER" : "ADMIN";
        await prisma.user.update({
            where: { id },
            data: { role: newRole as any }
        });
        revalidatePath("/admin/users");
        return { success: true };
    } catch (error) {
        return { success: false, error: "Security clearance update failed." };
    }
}

export async function toggleUserStatus(id: string, currentStatus: string) {
    try {
        // Note: status is not in schema yet, but for future proofing or role toggle
        // For now we'll just revalidate
        revalidatePath("/admin/users");
        return { success: true };
    } catch (error) {
        return { success: false };
    }
}
// Order Actions
export async function placeOrder(data: any) {
    try {
        const { items, ...customerInfo } = data;

        const order = await prisma.$transaction(async (tx) => {
            const newOrder = await tx.order.create({
                data: {
                    customerName: customerInfo.name,
                    customerEmail: customerInfo.email,
                    phone: customerInfo.phone,
                    address: customerInfo.address,
                    city: customerInfo.city,
                    totalAmount: parseFloat(customerInfo.total),
                    paymentMethod: "COD",
                    status: "PENDING",
                    items: {
                        create: items.map((item: any) => ({
                            productId: item.id,
                            quantity: item.quantity,
                            price: parseFloat(item.price),
                        })),
                    },
                },
            });

            // Reduce stock
            for (const item of items) {
                await tx.product.update({
                    where: { id: item.id },
                    data: {
                        stock: {
                            decrement: item.quantity,
                        },
                    },
                });
            }

            return newOrder;
        });

        revalidatePath("/admin/orders");
        return { success: true, orderId: order.id };
    } catch (error) {
        console.error("Place Order Error:", error);
        return { success: false, error: "Failed to process your order. Please try again." };
    }
}

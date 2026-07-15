"use server";

import prisma from "@/lib/db";
import { revalidatePath } from "next/cache";
import { supabase } from "@/lib/supabase";
import { sendOrderConfirmation, sendOrderStatusUpdate, sendPaymentStatusEmail } from "@/lib/email";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

// Product Actions
export async function uploadProductImage(formData: FormData) {
    try {
        const file = formData.get("file") as File;
        if (!file) throw new Error("No file provided");

        const fileExt = file.name.split(".").pop();
        const fileName = `${Math.random().toString(36).substring(2)}-${Date.now()}.${fileExt}`;
        const filePath = `${fileName}`;

        // Convert File to ArrayBuffer for Supabase upload on server
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        const { error: uploadError } = await supabase.storage
            .from("products")
            .upload(filePath, buffer, {
                contentType: file.type,
                upsert: true,
            });

        if (uploadError) throw uploadError;

        const { data: { publicUrl } } = supabase.storage
            .from("products")
            .getPublicUrl(filePath);

        return { success: true, url: publicUrl };
    } catch (error: any) {
        console.error("Upload Image Error:", error);
        return { success: false, error: error.message || "Failed to upload image." };
    }
}

// Category image upload
export async function uploadCategoryImage(formData: FormData) {
    try {
        const file = formData.get("file") as File;
        if (!file) throw new Error("No file provided");
        const fileExt = file.name.split(".").pop();
        const fileName = `${Math.random().toString(36).substring(2)}-${Date.now()}.${fileExt}`;
        const filePath = `categories/${fileName}`; // Use a subfolder in the products bucket
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);
        const { error: uploadError } = await supabase.storage
            .from("products") // Use the existing 'products' bucket
            .upload(filePath, buffer, {
                contentType: file.type,
                upsert: true,
            });
        if (uploadError) throw uploadError;
        const { data: { publicUrl } } = supabase.storage
            .from("products")
            .getPublicUrl(filePath);
        return { success: true, url: publicUrl };
    } catch (error: any) {
        console.error("Upload Category Image Error:", error);
        return { success: false, error: error.message || "Failed to upload category image." };
    }
}

// Product Actions continued...
export async function createProduct(data: any) {
    try {
        const slug = data.slug || data.name.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');
        const product = await prisma.product.create({
            data: {
                title: data.name,
                slug: slug,
                description: data.description,
                price: parseFloat(data.price),
                stock: parseInt(data.stock),
                category: { connect: { id: data.categoryId } },
                image: data.image || "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=1000",
                images: data.images || [],
                isBestseller: !!data.isBestseller,
                isNewArrival: !!data.isNewArrival,
                isFeatured: !!data.isFeatured,
            }
        });
        revalidatePath("/admin/products");
        revalidatePath("/shop");
        return { success: true, product };
    } catch (error) {
        console.error("Create Product Error:", error);
        return { success: false, error: "Failed to create masterpiece." };
    }
}

export async function updateProduct(id: string, data: any) {
    try {
        const slug = data.slug || data.name.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');
        const product = await prisma.product.update({
            where: { id },
            data: {
                title: data.name,
                slug: slug,
                description: data.description,
                price: parseFloat(data.price),
                stock: parseInt(data.stock),
                category: { connect: { id: data.categoryId } },
                image: data.image,
                images: data.images || [],
                isBestseller: !!data.isBestseller,
                isNewArrival: !!data.isNewArrival,
                isFeatured: !!data.isFeatured,
            }
        });
        revalidatePath("/admin/products");
        revalidatePath("/shop");
        revalidatePath(`/shop/${slug}`);
        return { success: true, product };
    } catch (error) {
        console.error("Update Product Error:", error);
        return { success: false, error: "Failed to update centerpiece." };
    }
}

export async function updateProductStock(id: string, stock: number) {
    try {
        const product = await prisma.product.update({
            where: { id },
            data: { stock }
        });
        revalidatePath("/admin/inventory");
        revalidatePath("/admin/products");
        revalidatePath("/shop");
        revalidatePath(`/shop/${product.slug}`);
        return { success: true, product };
    } catch (error) {
        console.error("Update Stock Error:", error);
        return { success: false, error: "Failed to update stock." };
    }
}

export async function deleteProduct(id: string) {
    try {
        await prisma.product.delete({
            where: { id }
        });

        revalidatePath("/admin/products");
        revalidatePath("/admin/inventory");
        revalidatePath("/shop");
        return { success: true };
    } catch (error) {
        console.error("Delete Product Error:", error);
        return { success: false, error: "Deletion failed. Product may be linked to existing orders." };
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
export async function uploadPaymentReceipt(formData: FormData) {
    try {
        const file = formData.get("file") as File;
        if (!file) throw new Error("No file provided");

        const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
        if (!allowedTypes.includes(file.type)) {
            throw new Error("Please upload a valid image file (JPG, PNG, or WebP).");
        }

        const fileExt = file.name.split(".").pop();
        const fileName = `${Math.random().toString(36).substring(2)}-${Date.now()}.${fileExt}`;
        const filePath = `receipts/${fileName}`;

        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        const { error: uploadError } = await supabase.storage
            .from("products")
            .upload(filePath, buffer, {
                contentType: file.type,
                upsert: true,
            });

        if (uploadError) throw uploadError;

        const { data: { publicUrl } } = supabase.storage
            .from("products")
            .getPublicUrl(filePath);

        return { success: true, url: publicUrl };
    } catch (error: any) {
        console.error("Upload Payment Receipt Error:", error);
        return { success: false, error: error.message || "Failed to upload payment receipt." };
    }
}

export async function placeOrder(data: any) {
    try {
        const { items, receiptImage, ...customerInfo } = data;

        if (!receiptImage) {
            return { success: false, error: "Please upload your payment receipt before placing the order." };
        }

        const order = await prisma.$transaction(async (tx) => {
            const newOrder = await tx.order.create({
                data: {
                    customerName: customerInfo.name,
                    customerEmail: customerInfo.email,
                    phone: customerInfo.phone,
                    address: customerInfo.address + (customerInfo.state ? `\nState: ${customerInfo.state}` : ""),
                    city: customerInfo.city,
                    totalAmount: parseFloat(customerInfo.total),
                    paymentMethod: "EASYPAISA",
                    paymentStatus: "PENDING_PAYMENT_VERIFICATION",
                    receiptImage,
                    receiptUploadedAt: new Date(),
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

        // Send Email Confirmations before returning
        await sendOrderConfirmation(order);

        revalidatePath("/admin/orders");
        return { success: true, orderId: order.id };
    } catch (error) {
        console.error("Place Order Error:", error);
        return { success: false, error: "Failed to process your order. Please try again." };
    }
}

export async function updateOrder(id: string, data: any) {
    try {
        console.log("Updating order intelligence:", id, data);

        if (data.status === "PROCESSING") {
            const existing = await prisma.order.findUnique({ where: { id } });
            if (!existing) {
                return { success: false, error: "Order not found." };
            }
            const allowedPaymentStatuses = ["PAYMENT_VERIFIED", "PROCESSING", "COMPLETED"];
            if (!allowedPaymentStatuses.includes(existing.paymentStatus)) {
                return {
                    success: false,
                    error: "Payment must be verified before moving this order to Processing.",
                };
            }
        }

        const updated = await prisma.order.update({
            where: { id },
            data
        });
        
        // Send email update
        await sendOrderStatusUpdate(updated);

        console.log("Order intelligence updated successfully:", updated.id);
        revalidatePath("/admin/orders");
        return { success: true };
    } catch (error: any) {
        console.error("Update Order Error Details:", error);
        return { 
            success: false, 
            error: error.message || "Failed to update order status." 
        };
    }
}

export async function updatePaymentStatus(
    id: string,
    data: { paymentStatus: string; rejectionReason?: string }
) {
    try {
        const session = await getServerSession(authOptions);
        if (!session || (session.user as any).role !== "ADMIN") {
            return { success: false, error: "Unauthorized." };
        }

        const existing = await prisma.order.findUnique({ where: { id } });
        if (!existing) {
            return { success: false, error: "Order not found." };
        }

        if (data.paymentStatus === "REJECTED" && !data.rejectionReason?.trim()) {
            return { success: false, error: "Please provide a rejection reason." };
        }

        const updateData: Record<string, unknown> = {
            paymentStatus: data.paymentStatus,
        };

        if (data.paymentStatus === "PAYMENT_VERIFIED") {
            updateData.verifiedAt = new Date();
            updateData.verifiedById = (session.user as any).id;
            updateData.rejectionReason = null;
        } else if (data.paymentStatus === "REJECTED") {
            updateData.rejectionReason = data.rejectionReason?.trim();
        }

        const updated = await prisma.order.update({
            where: { id },
            data: updateData,
            include: {
                verifiedBy: { select: { name: true, email: true } },
                items: { include: { product: true } },
            },
        });
        
        // Send payment status email
        await sendPaymentStatusEmail(updated);

        revalidatePath("/admin/orders");
        return { success: true, order: updated };
    } catch (error: any) {
        console.error("Update Payment Status Error:", error);
        return {
            success: false,
            error: error.message || "Failed to update payment status.",
        };
    }
}

export async function deleteOrder(id: string) {
    try {
        // First delete associated OrderItems
        await prisma.orderItem.deleteMany({
            where: { orderId: id }
        });
        
        // Then delete associated Payment if exists
        await prisma.payment.deleteMany({
            where: { orderId: id }
        });

        // Finally delete the Order
        await prisma.order.delete({
            where: { id }
        });
        
        revalidatePath("/admin/orders");
        return { success: true };
    } catch (error: any) {
        console.error("Delete Order Error:", error);
        return { 
            success: false, 
            error: error.message || "Failed to delete order permanently." 
        };
    }
}

export async function getOrder(id: string) {  
    try {  
        const order = await prisma.order.findUnique({  
            where: { id },  
            include: {  
                items: {  
                    include: {  
                        product: true  
                    }  
                }  
            }  
        });  
        return { success: true, order };  
    } catch (error) {
        return { success: false, error: "Order not found." };
    }
}

// Site Configuration Actions
export async function uploadLogoImage(formData: FormData) {
    try {
        const file = formData.get("file") as File;
        if (!file) throw new Error("No file provided");
        
        const fileExt = file.name.split(".").pop();
        const fileName = `logo-${Date.now()}.${fileExt}`;
        const filePath = `site/${fileName}`;
        
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);
        
        const { error: uploadError } = await supabase.storage
            .from("products") // Using same public bucket for simplicity
            .upload(filePath, buffer, {
                contentType: file.type,
                upsert: true,
            });
            
        if (uploadError) throw uploadError;
        
        const { data: { publicUrl } } = supabase.storage
            .from("products")
            .getPublicUrl(filePath);
            
        return { success: true, url: publicUrl };
    } catch (error: any) {
        console.error("Upload Logo Error:", error);
        return { success: false, error: error.message || "Failed to upload logo." };
    }
}

export async function updateSiteConfig(data: any) {
    try {
        // Upsert because it might not exist yet
        const config = await prisma.siteConfig.upsert({
            where: { id: "default" },
            update: data,
            create: {
                id: "default",
                ...data
            }
        });
        
        revalidatePath("/");
        revalidatePath("/admin/website");
        return { success: true, config };
    } catch (error: any) {
        console.error("Update Site Config Error:", error);
        return { success: false, error: "Failed to update website configuration." };
    }
}

export async function getSiteConfig() {
    try {
        const config = await prisma.siteConfig.findUnique({
            where: { id: "default" }
        });
        return { success: true, config };
    } catch (error) {
        return { success: false, error: "Failed to fetch site config." };
    }
}

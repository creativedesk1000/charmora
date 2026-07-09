"use client";

import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface ProductGalleryProps {
    mainImage: string;
    images: string[];
    title: string;
}

export default function ProductGallery({ mainImage, images, title }: ProductGalleryProps) {
    const allImages = [mainImage, ...images].filter(Boolean);
    // Remove duplicates just in case
    const uniqueImages = Array.from(new Set(allImages));
    const [activeImage, setActiveImage] = useState(uniqueImages[0]);

    return (
        <div className="space-y-6">
            <div className="aspect-square bg-white relative rounded-2xl overflow-hidden border border-charmora-purple/5 shadow-sm">
                <Image
                    src={activeImage || "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=1000"}
                    alt={title}
                    fill
                    className="object-cover transition-opacity duration-500"
                    priority
                />
            </div>
            {uniqueImages.length > 1 && (
                <div className="grid grid-cols-4 gap-4">
                    {uniqueImages.map((img, i) => (
                        <div 
                            key={i} 
                            onClick={() => setActiveImage(img)}
                            className={cn(
                                "aspect-square bg-white border rounded-lg relative cursor-pointer transition-all overflow-hidden",
                                activeImage === img ? "border-charmora-pink-dark shadow-md ring-2 ring-charmora-pink-dark/20" : "border-charmora-purple/10 hover:border-charmora-purple/30"
                            )}
                        >
                            <Image
                                src={img}
                                alt={`${title} view ${i + 1}`}
                                fill
                                className={cn(
                                    "object-cover transition-opacity",
                                    activeImage === img ? "opacity-100" : "opacity-60 hover:opacity-100"
                                )}
                            />
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

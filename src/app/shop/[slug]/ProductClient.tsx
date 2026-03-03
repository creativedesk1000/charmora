"use client";

import { useState } from "react";
import { Plus, Minus, Heart } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { motion } from "framer-motion";
import { toast } from "sonner";

interface ProductClientProps {
    id: string;
    title: string;
    price: number;
    description: string;
}

import { useCart } from "@/context/CartContext";

interface ProductClientProps {
    id: string;
    title: string;
    price: number;
    description: string;
    image: string;
}

export default function ProductClient({ id, title, price, description, image }: ProductClientProps) {
    const [quantity, setQuantity] = useState(1);
    const { addToCart } = useCart();

    const handleAddToCart = () => {
        addToCart({
            id,
            title,
            price,
            image,
            quantity
        });
    };

    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
        >
            <div className="space-y-6 mb-10">
                <div className="flex flex-col gap-3">
                    <span className="text-[10px] uppercase tracking-widest text-charmora-purple font-bold">Quantity</span>
                    <div className="flex items-center border border-charmora-purple/10 rounded-sm h-12 w-32 bg-white">
                        <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="flex-1 flex items-center justify-center text-charmora-purple/40 hover:text-charmora-pink-dark transition-colors border-r border-charmora-purple/10 h-full"><Minus size={14} /></button>
                        <span className="flex-1 text-center text-sm font-sans font-bold text-charmora-purple">{quantity}</span>
                        <button onClick={() => setQuantity(quantity + 1)} className="flex-1 flex items-center justify-center text-charmora-purple/40 hover:text-charmora-pink-dark transition-colors border-l border-charmora-purple/10 h-full"><Plus size={14} /></button>
                    </div>
                </div>

                <div className="flex flex-col gap-3">
                    <label className="text-[10px] uppercase tracking-widest text-charmora-purple font-bold">Customization (if any)</label>
                    <input
                        type="text"
                        placeholder="Optional"
                        className="w-full bg-[#f8f9fa] border border-charmora-purple/10 rounded-sm py-3 px-4 text-sm focus:border-charmora-pink-dark outline-none transition-colors"
                    />
                </div>
            </div>

            <div className="flex flex-col gap-4 mb-12">
                <div className="flex gap-4">
                    <Button onClick={handleAddToCart} variant="primary" className="h-14 flex-grow tracking-[0.2em] font-bold shadow-xl">Add to Bag</Button>
                    <button className="flex items-center justify-center w-14 h-14 rounded-sm border border-charmora-purple/10 hover:border-charmora-pink-dark hover:text-charmora-pink-dark transition-all text-charmora-purple/40 bg-white">
                        <Heart size={20} />
                    </button>
                </div>
                <Button variant="dark" className="h-14 w-full tracking-[0.2em] font-bold">Buy It Now</Button>
            </div>

            <div className="prose prose-sm text-charmora-purple/70 leading-relaxed font-sans border-t border-charmora-purple/5 pt-10">
                <h3 className="text-xl font-serif text-charmora-purple mb-4 font-bold">Description</h3>
                <p className="mb-4">{description}</p>
                <ul className="list-disc pl-5 space-y-2">
                    <li>Material: Hand-finished materials</li>
                    <li>Size: Adjustable Standard</li>
                    <li>Hand-finished and inspected</li>
                </ul>
            </div>
        </motion.div>
    );
}

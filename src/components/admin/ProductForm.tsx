import React, { useState } from "react";
import { X, Save, Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import { createProduct, updateProduct } from "@/lib/actions";
import { toast } from "sonner";

interface ProductFormProps {
    onClose: () => void;
    onSuccess: () => void;
    product?: any;
    categories: any[];
}

export default function ProductForm({ onClose, onSuccess, product, categories }: ProductFormProps) {
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: product?.title || "",
        description: product?.description || "",
        price: product?.price || "",
        stock: product?.stock || "",
        categoryId: product?.categoryId || (categories.length > 0 ? categories[0].id : ""),
        image: product?.image || "",
        isBestseller: product?.isBestseller || false,
        isNewArrival: product?.isNewArrival || false,
        isFeatured: product?.isFeatured || false,
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        const res = product
            ? await updateProduct(product.id, formData)
            : await createProduct(formData);

        if (res.success) {
            toast.success(product ? "Masterpiece updated." : "New masterpiece added.");
            onSuccess();
            onClose();
        } else {
            toast.error(res.error);
        }
        setLoading(false);
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 bg-neutral-900/40 backdrop-blur-sm z-[100] flex items-center justify-center p-6"
        >
            <motion.div
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                className="bg-white w-full max-w-2xl rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
            >
                <form onSubmit={handleSubmit} className="flex flex-col h-full">
                    {/* Header */}
                    <div className="p-8 border-b border-neutral-100 flex items-center justify-between bg-neutral-50/50">
                        <div>
                            <h2 className="text-2xl font-serif font-bold text-neutral-900">{product ? "Edit Masterpiece" : "New Creation"}</h2>
                            <p className="text-xs text-neutral-500 font-sans mt-1 uppercase tracking-widest font-bold">Catalog Entry: {product?.id?.substring(0, 8) || "Auto-Generated"}</p>
                        </div>
                        <button type="button" onClick={onClose} className="p-3 rounded-2xl bg-white shadow-sm border border-neutral-100 hover:bg-neutral-50 transition-colors">
                            <X size={20} />
                        </button>
                    </div>

                    {/* Form Body */}
                    <div className="p-8 overflow-y-auto space-y-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-[10px] uppercase font-bold text-neutral-400 tracking-widest pl-1">Piece Title</label>
                                <input
                                    type="text"
                                    required
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    className="w-full bg-neutral-50 border border-transparent focus:border-neutral-200 focus:bg-white outline-none rounded-2xl p-4 text-sm font-sans transition-all"
                                    placeholder="e.g. Moonlit Cascade"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] uppercase font-bold text-neutral-400 tracking-widest pl-1">Category</label>
                                <select
                                    value={formData.categoryId}
                                    onChange={(e) => setFormData({ ...formData, categoryId: e.target.value })}
                                    className="w-full bg-neutral-50 border border-transparent focus:border-neutral-200 focus:bg-white outline-none rounded-2xl p-4 text-sm font-sans appearance-none cursor-pointer"
                                >
                                    {categories.map(cat => (
                                        <option key={cat.id} value={cat.id}>{cat.name}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="space-y-2">
                                <label className="text-[10px] uppercase font-bold text-neutral-400 tracking-widest pl-1">Price (PKR)</label>
                                <input
                                    type="number"
                                    required
                                    value={formData.price}
                                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                                    className="w-full bg-neutral-50 border border-transparent focus:border-neutral-200 focus:bg-white outline-none rounded-2xl p-4 text-sm font-sans"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] uppercase font-bold text-neutral-400 tracking-widest pl-1">Stock Level</label>
                                <input
                                    type="number"
                                    required
                                    value={formData.stock}
                                    onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                                    className="w-full bg-neutral-50 border border-transparent focus:border-neutral-200 focus:bg-white outline-none rounded-2xl p-4 text-sm font-sans"
                                    placeholder="0"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] uppercase font-bold text-neutral-400 tracking-widest pl-1">Image URL</label>
                                <input
                                    type="text"
                                    value={formData.image}
                                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                                    placeholder="https://..."
                                    className="w-full bg-neutral-50 border border-transparent focus:border-neutral-200 focus:bg-white outline-none rounded-2xl p-4 text-sm font-sans"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] uppercase font-bold text-neutral-400 tracking-widest pl-1">Artisan Description</label>
                            <textarea
                                className="w-full bg-neutral-50 border border-transparent focus:border-neutral-200 focus:bg-white outline-none rounded-2xl p-4 text-sm font-sans min-h-[120px]"
                                value={formData.description}
                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                placeholder="The story behind this piece..."
                            />
                        </div>
                    </div>

                    {/* Footer Actions */}
                    <div className="p-8 border-t border-neutral-100 bg-neutral-50/50 flex items-center justify-end gap-4">
                        <button type="button" onClick={onClose} className="px-6 py-3 rounded-xl font-bold text-sm text-neutral-500 hover:text-neutral-900 transition-colors">Abort</button>
                        <button
                            type="submit"
                            disabled={loading}
                            className="bg-charmora-purple text-white px-10 py-4 rounded-2xl font-bold shadow-xl shadow-purple-100 flex items-center gap-2 hover:scale-102 transition-all active:scale-98 disabled:opacity-50 disabled:scale-100"
                        >
                            {loading ? <Loader2 className="animate-spin" size={18} /> : <Save size={18} />}
                            <span>{product ? "Update Piece" : "Preserve Piece"}</span>
                        </button>
                    </div>
                </form>
            </motion.div>
        </motion.div>
    );
}

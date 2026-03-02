"use client";

import React, { useState } from "react";
import {
    Search,
    Plus,
    Edit2,
    Trash2,
    ArrowLeft,
    ArrowRight,
    Filter
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import ProductForm from "@/components/admin/ProductForm";
import ConfirmModal from "@/components/admin/ConfirmModal";
import { toast } from "sonner";
import { deleteProduct as deleteProductAction } from "@/lib/actions";

export default function ProductsClient({ initialProducts, categories }: { initialProducts: any[], categories: any[] }) {
    const [products, setProducts] = useState(initialProducts);
    const [searchTerm, setSearchTerm] = useState("");
    const [showForm, setShowForm] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState<any>(null);

    const filteredProducts = products.filter(p =>
        p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.category?.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleDelete = async () => {
        if (!selectedProduct) return;
        const res = await deleteProductAction(selectedProduct.id);
        if (res.success) {
            toast.success("Masterpiece successfully archived.");
            setProducts(products.filter(p => p.id !== selectedProduct.id));
            setShowConfirm(false);
        } else {
            toast.error(res.error);
        }
    };

    return (
        <div className="space-y-8 pb-12">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h1 className="text-3xl font-serif font-bold text-neutral-900 leading-tight">Product Gallery</h1>
                    <p className="text-neutral-500 text-sm mt-1 font-sans">Curate and manage your global jewelry collections.</p>
                </div>
                <button
                    onClick={() => { setSelectedProduct(null); setShowForm(true); }}
                    className="flex items-center gap-2 bg-charmora-purple text-white px-6 py-3 rounded-2xl font-bold shadow-xl shadow-purple-100 hover:scale-105 transition-all active:scale-95 group"
                >
                    <Plus size={20} className="group-hover:rotate-90 transition-transform duration-300" />
                    <span>New Masterpiece</span>
                </button>
            </div>

            {/* Filters & Search */}
            <div className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-grow group">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400 group-focus-within:text-charmora-purple transition-colors" size={20} />
                    <input
                        type="text"
                        placeholder="Search within collections..."
                        className="w-full bg-white border border-neutral-100 rounded-2xl py-3.5 pl-12 pr-4 outline-none focus:ring-4 focus:ring-purple-50 hover:shadow-md transition-all font-sans text-sm"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <button className="flex items-center gap-2 bg-white border border-neutral-100 px-6 py-3.5 rounded-2xl text-neutral-500 hover:text-neutral-900 hover:shadow-md transition-all font-bold text-sm">
                    <Filter size={18} />
                    <span>Refine</span>
                </button>
            </div>

            {/* Table Section */}
            <div className="bg-white rounded-[2rem] border border-neutral-100 shadow-xl overflow-hidden flex flex-col">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-neutral-50/50 text-neutral-400 text-[10px] uppercase font-bold tracking-[0.2em] border-b border-neutral-100">
                                <th className="px-8 py-5">Piece</th>
                                <th className="px-6 py-5">Collection</th>
                                <th className="px-6 py-5">Stock</th>
                                <th className="px-6 py-5 text-right">Price</th>
                                <th className="px-8 py-5 text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-neutral-100">
                            <AnimatePresence mode="popLayout">
                                {filteredProducts.map((product, index) => (
                                    <motion.tr
                                        key={product.id}
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: index * 0.05 }}
                                        className="group hover:bg-neutral-50/50 transition-colors cursor-default"
                                    >
                                        <td className="px-8 py-4">
                                            <div className="flex items-center gap-4">
                                                <div className="w-14 h-14 rounded-2xl overflow-hidden bg-neutral-100 border border-neutral-200 shadow-sm transition-transform group-hover:scale-110">
                                                    <img src={product.image} alt={product.title} className="w-full h-full object-cover" />
                                                </div>
                                                <div className="flex flex-col">
                                                    <span className="font-serif font-bold text-neutral-900 text-sm group-hover:text-charmora-purple transition-colors">{product.title}</span>
                                                    <span className="text-[10px] text-neutral-400 font-mono mt-0.5 uppercase tracking-tighter">{product.id.substring(0, 8)}</span>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="text-xs font-bold text-neutral-500 bg-neutral-100 px-3 py-1 rounded-full uppercase tracking-widest">{product.category?.name}</span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="text-sm font-bold text-neutral-900">{product.stock}</span>
                                        </td>
                                        <td className="px-6 py-4 text-right font-serif font-black text-neutral-900">
                                            PKR {product.price.toLocaleString()}
                                        </td>
                                        <td className="px-8 py-4 text-center">
                                            <div className="flex items-center justify-center gap-3">
                                                <button
                                                    onClick={() => { setSelectedProduct(product); setShowForm(true); }}
                                                    className="p-2 rounded-xl text-neutral-400 hover:text-charmora-purple hover:bg-purple-50 transition-all border border-transparent hover:border-purple-100"
                                                >
                                                    <Edit2 size={16} />
                                                </button>
                                                <button
                                                    onClick={() => { setSelectedProduct(product); setShowConfirm(true); }}
                                                    className="p-2 rounded-xl text-neutral-400 hover:text-red-500 hover:bg-red-50 transition-all border border-transparent hover:border-red-100"
                                                >
                                                    <Trash2 size={16} />
                                                </button>
                                            </div>
                                        </td>
                                    </motion.tr>
                                ))}
                            </AnimatePresence>
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Overlays */}
            <AnimatePresence>
                {showForm && (
                    <ProductForm
                        product={selectedProduct}
                        categories={categories}
                        onClose={() => setShowForm(false)}
                        onSuccess={() => {
                            // In a real app, revalidatePath handles this, 
                            // but for direct UI feedback we could refresh or mutate.
                            window.location.reload();
                        }}
                    />
                )}
                {showConfirm && (
                    <ConfirmModal
                        title="Archive Masterpiece?"
                        message="This action will remove the piece from global circulation."
                        onConfirm={handleDelete}
                        onCancel={() => setShowConfirm(false)}
                    />
                )}
            </AnimatePresence>
        </div>
    );
}

"use client";

import React, { useState } from "react";
import {
    Plus,
    Search,
    Edit2,
    Trash2,
    FolderOpen
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { createCategory, deleteCategory as deleteCategoryAction } from "@/lib/actions";
import { toast } from "sonner";
import ConfirmModal from "@/components/admin/ConfirmModal";

export default function CategoriesClient({ initialCategories }: { initialCategories: any[] }) {
    const [categories, setCategories] = useState(initialCategories);
    const [searchTerm, setSearchTerm] = useState("");
    const [newCat, setNewCat] = useState({ name: "", slug: "" });
    const [loading, setLoading] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState<any>(null);

    const filteredCategories = categories.filter(c =>
        c.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleDelete = async () => {
        if (!selectedCategory) return;
        const res = await deleteCategoryAction(selectedCategory.id);
        if (res.success) {
            toast.success("Collection successfully archived.");
            setCategories(categories.filter(c => c.id !== selectedCategory.id));
            setShowConfirm(false);
        } else {
            toast.error(res.error);
        }
    };

    const handleCreate = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newCat.name || !newCat.slug) return;
        setLoading(true);
        const res = await createCategory(newCat);
        if (res.success) {
            toast.success("Collection sealed and cataloged.");
            setCategories([...categories, { ...res.category, _count: { products: 0 } }]);
            setNewCat({ name: "", slug: "" });
        } else {
            toast.error(res.error);
        }
        setLoading(false);
    };

    return (
        <div className="space-y-8 pb-12">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h1 className="text-3xl font-serif font-bold text-neutral-900 leading-tight">Collection House</h1>
                    <p className="text-neutral-500 text-sm mt-1 font-sans">Organize your masterpieces into exquisite collections.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Categories Table */}
                <div className="lg:col-span-2 bg-white rounded-[2rem] border border-neutral-100 shadow-xl overflow-hidden flex flex-col">
                    <div className="p-6 border-b border-neutral-100">
                        <div className="relative group">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400 group-focus-within:text-neutral-900 transition-colors" size={18} />
                            <input
                                type="text"
                                placeholder="Find a collection..."
                                className="w-full bg-neutral-50 border border-transparent focus:border-neutral-200 outline-none rounded-xl py-2.5 pl-12 pr-4 text-sm font-sans transition-all"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="bg-neutral-50/50 text-neutral-400 text-[10px] uppercase font-bold tracking-widest border-b border-neutral-100">
                                    <th className="px-8 py-5">Collection Name</th>
                                    <th className="px-6 py-5">Slug</th>
                                    <th className="px-6 py-5">Pieces</th>
                                    <th className="px-8 py-5 text-center">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-neutral-100">
                                <AnimatePresence mode="popLayout">
                                    {filteredCategories.map((category, index) => (
                                        <motion.tr
                                            key={category.id}
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: index * 0.05 }}
                                            className="group hover:bg-neutral-50/50 transition-colors"
                                        >
                                            <td className="px-8 py-5">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-8 h-8 rounded-lg bg-charmora-pink text-charmora-purple flex items-center justify-center font-bold text-xs shadow-sm">
                                                        {category.name.charAt(0)}
                                                    </div>
                                                    <span className="font-serif font-bold text-neutral-900">{category.name}</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-5">
                                                <span className="font-mono text-[10px] text-neutral-400 uppercase tracking-tighter">/{category.slug}</span>
                                            </td>
                                            <td className="px-6 py-5">
                                                <div className="flex items-center gap-2">
                                                    <FolderOpen size={14} className="text-neutral-300" />
                                                    <span className="text-xs font-bold text-neutral-900">{category._count?.products || 0}</span>
                                                </div>
                                            </td>
                                            <td className="px-8 py-5 text-center">
                                                <div className="flex items-center justify-center gap-2">
                                                    <button className="p-2 rounded-lg text-neutral-400 hover:text-neutral-900 hover:bg-neutral-100 transition-all active:scale-90">
                                                        <Edit2 size={16} />
                                                    </button>
                                                    <button
                                                        onClick={() => { setSelectedCategory(category); setShowConfirm(true); }}
                                                        className="p-2 rounded-lg text-neutral-400 hover:text-red-500 hover:bg-red-50 transition-all active:scale-90"
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

                {/* Create Form */}
                <div className="space-y-6">
                    <div className="bg-white rounded-[2rem] p-8 border border-neutral-100 shadow-xl">
                        <h3 className="font-serif font-bold text-xl mb-6 text-neutral-900 border-b border-neutral-50 pb-4">Instant Category</h3>
                        <form className="space-y-5" onSubmit={handleCreate}>
                            <div className="space-y-2">
                                <label className="text-[10px] uppercase font-bold text-neutral-400 tracking-widest pl-1">Category Name</label>
                                <input
                                    type="text"
                                    required
                                    value={newCat.name}
                                    onChange={(e) => setNewCat({ ...newCat, name: e.target.value, slug: e.target.value.toLowerCase().replace(/ /g, '-') })}
                                    className="w-full bg-neutral-50 border border-transparent focus:border-neutral-200 focus:bg-white outline-none rounded-2xl p-4 text-sm font-sans transition-all"
                                    placeholder="e.g. Diamond Collection"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] uppercase font-bold text-neutral-400 tracking-widest pl-1">Slug URL</label>
                                <input
                                    type="text"
                                    required
                                    value={newCat.slug}
                                    onChange={(e) => setNewCat({ ...newCat, slug: e.target.value })}
                                    className="w-full bg-neutral-50 border border-transparent focus:border-neutral-200 focus:bg-white outline-none rounded-2xl p-4 text-sm font-mono transition-all text-neutral-500"
                                    placeholder="diamond-collection"
                                />
                            </div>
                            <button
                                disabled={loading}
                                className="w-full bg-charmora-pink text-charmora-purple py-4 rounded-2xl font-bold text-sm shadow-lg shadow-pink-100 hover:scale-102 transition-all active:scale-98 mt-4 uppercase tracking-widest disabled:opacity-50"
                            >
                                {loading ? "Sealing..." : "Seal Collection"}
                            </button>
                        </form>
                    </div>
                </div>
            </div>

            <AnimatePresence>
                {showConfirm && (
                    <ConfirmModal
                        title="Archive Collection?"
                        message="Ensuring this collection is empty before archival is recommended."
                        onConfirm={handleDelete}
                        onCancel={() => setShowConfirm(false)}
                    />
                )}
            </AnimatePresence>
        </div>
    );
}

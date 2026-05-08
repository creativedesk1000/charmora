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
import { createCategory, deleteCategory as deleteCategoryAction, updateCategory, uploadCategoryImage } from "@/lib/actions";
import { toast } from "sonner";
import ConfirmModal from "@/components/admin/ConfirmModal";
import { X } from "lucide-react";

export default function CategoriesClient({ initialCategories }: { initialCategories: any[] }) {
    const [categories, setCategories] = useState(initialCategories);
    const [searchTerm, setSearchTerm] = useState("");
    const [newCat, setNewCat] = useState({ name: "", slug: "", image: "" });
    const [editingCat, setEditingCat] = useState<any>(null);
    const [loading, setLoading] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState<any>(null);
    const [uploading, setUploading] = useState(false);

    const filteredCategories = categories.filter(c =>
        c.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, isEditing = false) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setUploading(true);
        const formData = new FormData();
        formData.append("file", file);

        const res = await uploadCategoryImage(formData);
        if (res.success && res.url) {
            if (isEditing) {
                setEditingCat({ ...editingCat, image: res.url });
            } else {
                setNewCat({ ...newCat, image: res.url });
            }
            toast.success("Image uploaded successfully");
        } else {
            toast.error(res.error || "Upload failed");
        }
        setUploading(false);
    };

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
            setNewCat({ name: "", slug: "", image: "" });
        } else {
            toast.error(res.error);
        }
        setLoading(false);
    };

    const handleUpdate = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!editingCat.name || !editingCat.slug) return;
        setLoading(true);
        const res = await updateCategory(editingCat.id, {
            name: editingCat.name,
            slug: editingCat.slug,
            image: editingCat.image
        });
        if (res.success) {
            toast.success("Collection updated successfully.");
            setCategories(categories.map(c => c.id === editingCat.id ? { ...c, ...editingCat } : c));
            setEditingCat(null);
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
                                    <th className="px-8 py-5">Image</th>
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
                                                {category.image ? (
                                                    <img src={category.image} alt={category.name} className="w-12 h-12 rounded-lg object-cover border border-neutral-100" />
                                                ) : (
                                                    <div className="w-12 h-12 rounded-lg bg-neutral-100 text-neutral-400 flex items-center justify-center text-xs">
                                                        No Image
                                                    </div>
                                                )}
                                            </td>
                                            <td className="px-8 py-5">
                                                <span className="font-serif font-bold text-neutral-900">{category.name}</span>
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
                                                    <button 
                                                        onClick={() => setEditingCat(category)}
                                                        className="p-2 rounded-lg text-neutral-400 hover:text-neutral-900 hover:bg-neutral-100 transition-all active:scale-90"
                                                    >
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

                {/* Forms Section */}
                <div className="space-y-6">
                    {/* Create / Edit Form */}
                    <div className="bg-white rounded-[2rem] p-8 border border-neutral-100 shadow-xl">
                        <div className="flex items-center justify-between mb-6 border-b border-neutral-50 pb-4">
                            <h3 className="font-serif font-bold text-xl text-neutral-900">
                                {editingCat ? "Edit Collection" : "Instant Category"}
                            </h3>
                            {editingCat && (
                                <button 
                                    onClick={() => setEditingCat(null)}
                                    className="p-2 hover:bg-neutral-100 rounded-full text-neutral-400 transition-colors"
                                >
                                    <X size={18} />
                                </button>
                            )}
                        </div>
                        
                        <form className="space-y-5" onSubmit={editingCat ? handleUpdate : handleCreate}>
                            <div className="space-y-2">
                                <label className="text-[10px] uppercase font-bold text-neutral-400 tracking-widest pl-1">Category Image</label>
                                <div className="flex items-center gap-4">
                                    <div className="w-20 h-20 rounded-2xl bg-neutral-50 border-2 border-dashed border-neutral-200 flex items-center justify-center overflow-hidden relative group">
                                        {(editingCat?.image || newCat.image) ? (
                                            <>
                                                <img 
                                                    src={editingCat ? editingCat.image : newCat.image} 
                                                    alt="Preview" 
                                                    className="w-full h-full object-cover"
                                                />
                                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                                    <Plus className="text-white rotate-45" size={20} />
                                                </div>
                                            </>
                                        ) : (
                                            <Plus className="text-neutral-300" size={24} />
                                        )}
                                        <input 
                                            type="file" 
                                            className="absolute inset-0 opacity-0 cursor-pointer"
                                            onChange={(e) => handleImageUpload(e, !!editingCat)}
                                            accept="image/*"
                                        />
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-[10px] text-neutral-400 font-medium">Click to upload collection cover</p>
                                        <p className="text-[9px] text-neutral-300 mt-1">Recommended: 800x800px</p>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] uppercase font-bold text-neutral-400 tracking-widest pl-1">Category Name</label>
                                <input
                                    type="text"
                                    required
                                    value={editingCat ? editingCat.name : newCat.name}
                                    onChange={(e) => {
                                        if (editingCat) {
                                            setEditingCat({ ...editingCat, name: e.target.value, slug: e.target.value.toLowerCase().replace(/ /g, '-') });
                                        } else {
                                            setNewCat({ ...newCat, name: e.target.value, slug: e.target.value.toLowerCase().replace(/ /g, '-') });
                                        }
                                    }}
                                    className="w-full bg-neutral-50 border border-transparent focus:border-neutral-200 focus:bg-white outline-none rounded-2xl p-4 text-sm font-sans transition-all"
                                    placeholder="e.g. Diamond Collection"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] uppercase font-bold text-neutral-400 tracking-widest pl-1">Slug URL</label>
                                <input
                                    type="text"
                                    required
                                    value={editingCat ? editingCat.slug : newCat.slug}
                                    onChange={(e) => {
                                        if (editingCat) {
                                            setEditingCat({ ...editingCat, slug: e.target.value });
                                        } else {
                                            setNewCat({ ...newCat, slug: e.target.value });
                                        }
                                    }}
                                    className="w-full bg-neutral-50 border border-transparent focus:border-neutral-200 focus:bg-white outline-none rounded-2xl p-4 text-sm font-mono transition-all text-neutral-500"
                                    placeholder="diamond-collection"
                                />
                            </div>
                            <button
                                disabled={loading || uploading}
                                className="w-full bg-charmora-pink text-charmora-purple py-4 rounded-2xl font-bold text-sm shadow-lg shadow-pink-100 hover:scale-102 transition-all active:scale-98 mt-4 uppercase tracking-widest disabled:opacity-50"
                            >
                                {loading ? "Saving..." : (editingCat ? "Update Collection" : "Seal Collection")}
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

import React, { useState, useRef } from "react";
import { X, Save, Loader2, Upload, Trash2 } from "lucide-react";
import { motion } from "framer-motion";
import { createProduct, updateProduct, uploadProductImage } from "@/lib/actions";
import { toast } from "sonner";

interface ProductFormProps {
    onClose: () => void;
    onSuccess: () => void;
    product?: any;
    categories: any[];
}

export default function ProductForm({ onClose, onSuccess, product, categories }: ProductFormProps) {
    const [loading, setLoading] = useState(false);
    const [uploading, setUploading] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [formData, setFormData] = useState({
        name: product?.title || "",
        slug: product?.slug || "",
        description: product?.description || "",
        price: product?.price || "",
        stock: product?.stock || "",
        categoryId: product?.categoryId || (categories.length > 0 ? categories[0].id : ""),
        image: product?.image || "",
        images: product?.images || [],
        isBestseller: product?.isBestseller || false,
        isNewArrival: product?.isNewArrival || false,
        isFeatured: product?.isFeatured || false,
    });

    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files || []);
        if (files.length === 0) return;

        try {
            setUploading(true);
            const newImageUrls: string[] = [];

            for (const file of files) {
                const uploadData = new FormData();
                uploadData.append("file", file);
                const res = await uploadProductImage(uploadData);
                if (res.success && res.url) {
                    newImageUrls.push(res.url);
                } else {
                    toast.error(res.error || `Failed to upload ${file.name}`);
                }
            }

            if (newImageUrls.length > 0) {
                setFormData(prev => {
                    const updated = { ...prev };
                    if (!updated.image) {
                        // First image becomes primary
                        updated.image = newImageUrls[0];
                        updated.images = [...prev.images, ...newImageUrls.slice(1)];
                    } else {
                        updated.images = [...prev.images, ...newImageUrls];
                    }
                    return updated;
                });
                toast.success("Images uploaded successfully.");
            }
        } catch (error: any) {
            toast.error(error.message || "Error uploading images");
        } finally {
            setUploading(false);
            if (fileInputRef.current) fileInputRef.current.value = "";
        }
    };

    const removeImage = (url: string, isPrimary: boolean) => {
        setFormData(prev => {
            if (isPrimary) {
                // If primary is removed, promote the first gallery image if exists
                if (prev.images.length > 0) {
                    return { ...prev, image: prev.images[0], images: prev.images.slice(1) };
                }
                return { ...prev, image: "" };
            }
            return { ...prev, images: prev.images.filter(img => img !== url) };
        });
    };

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
            className="fixed inset-0 bg-neutral-900/60 backdrop-blur-md z-[100] flex items-center justify-center p-4 md:p-6"
        >
            <motion.div
                initial={{ scale: 0.95, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                className="bg-white w-full max-w-2xl rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col h-[85vh] md:h-auto md:max-h-[90vh]"
            >
                <form onSubmit={handleSubmit} className="flex flex-col h-full overflow-hidden">
                    {/* Header - Fixed */}
                    <div className="p-6 md:p-8 border-b border-neutral-100 flex items-center justify-between bg-neutral-50/50 flex-shrink-0">
                        <div>
                            <h2 className="text-2xl font-serif font-bold text-neutral-900">{product ? "Edit Masterpiece" : "New Creation"}</h2>
                            <p className="text-[10px] text-neutral-400 font-sans mt-0.5 uppercase tracking-widest font-bold">Catalog Entry: {product?.id?.substring(0, 8) || "Auto-Generated"}</p>
                        </div>
                        <button type="button" onClick={onClose} className="p-3 rounded-2xl bg-white shadow-sm border border-neutral-100 hover:bg-neutral-50 transition-colors">
                            <X size={20} />
                        </button>
                    </div>

                    {/* Form Body - Scrollable */}
                    <div className="p-6 md:p-8 overflow-y-auto space-y-8 flex-grow">
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
                                <label className="text-[10px] uppercase font-bold text-neutral-400 tracking-widest pl-1">Slug (URL Path)</label>
                                <input
                                    type="text"
                                    value={formData.slug}
                                    onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                                    className="w-full bg-neutral-50 border border-transparent focus:border-neutral-200 focus:bg-white outline-none rounded-2xl p-4 text-sm font-sans transition-all"
                                    placeholder="auto-generated"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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

                        {/* Media Upload Section */}
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <label className="text-[10px] uppercase font-bold text-neutral-400 tracking-widest pl-1">Product Images</label>
                                <button
                                    type="button"
                                    onClick={() => fileInputRef.current?.click()}
                                    disabled={uploading}
                                    className="text-xs font-bold bg-charmora-purple text-white px-3 py-1.5 rounded-lg hover:bg-[#4a2a44] transition-colors flex items-center gap-1"
                                >
                                    {uploading ? <Loader2 className="animate-spin" size={14} /> : <Upload size={14} />}
                                    Upload Multiple
                                </button>
                                <input
                                    type="file"
                                    multiple
                                    ref={fileInputRef}
                                    onChange={handleFileUpload}
                                    className="hidden"
                                    accept="image/*"
                                />
                            </div>
                            
                            {/* Gallery Preview */}
                            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-4">
                                {formData.image && (
                                    <div className="relative aspect-square rounded-xl overflow-hidden group border-2 border-charmora-pink-dark">
                                        <img src={formData.image} alt="Primary" className="w-full h-full object-cover" />
                                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                                            <button type="button" onClick={() => removeImage(formData.image, true)} className="p-1.5 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors">
                                                <Trash2 size={14} />
                                            </button>
                                        </div>
                                        <span className="absolute bottom-1 right-1 bg-black/60 text-white text-[8px] uppercase tracking-wider px-1.5 py-0.5 rounded">Primary</span>
                                    </div>
                                )}
                                {formData.images.map((img, idx) => (
                                    <div key={idx} className="relative aspect-square rounded-xl overflow-hidden group border border-neutral-200">
                                        <img src={img} alt={`Gallery ${idx}`} className="w-full h-full object-cover" />
                                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                                            <button type="button" onClick={() => removeImage(img, false)} className="p-1.5 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors">
                                                <Trash2 size={14} />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            {(!formData.image && formData.images.length === 0) && (
                                <div className="w-full h-32 border-2 border-dashed border-neutral-200 rounded-2xl flex flex-col items-center justify-center text-neutral-400">
                                    <Upload size={24} className="mb-2 opacity-50" />
                                    <span className="text-xs font-medium">No images uploaded yet</span>
                                </div>
                            )}
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] uppercase font-bold text-neutral-400 tracking-widest pl-1">Story of the Piece</label>
                            <textarea
                                className="w-full bg-neutral-50 border border-transparent focus:border-neutral-200 focus:bg-white outline-none rounded-2xl p-4 text-sm font-sans min-h-[100px]"
                                value={formData.description}
                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                placeholder="Once upon a time..."
                            />
                        </div>

                        {/* Toggles */}
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                            <label className="flex items-center gap-3 p-4 bg-neutral-50 rounded-2xl cursor-pointer hover:bg-neutral-100 transition-colors">
                                <input
                                    type="checkbox"
                                    checked={formData.isBestseller}
                                    onChange={(e) => setFormData({ ...formData, isBestseller: e.target.checked })}
                                    className="w-5 h-5 accent-charmora-purple"
                                />
                                <span className="text-[10px] font-bold text-neutral-600 uppercase">Best Seller</span>
                            </label>
                            <label className="flex items-center gap-3 p-4 bg-neutral-50 rounded-2xl cursor-pointer hover:bg-neutral-100 transition-colors">
                                <input
                                    type="checkbox"
                                    checked={formData.isNewArrival}
                                    onChange={(e) => setFormData({ ...formData, isNewArrival: e.target.checked })}
                                    className="w-5 h-5 accent-charmora-purple"
                                />
                                <span className="text-[10px] font-bold text-neutral-600 uppercase">New Arrival</span>
                            </label>
                            <label className="flex items-center gap-3 p-4 bg-neutral-50 rounded-2xl cursor-pointer hover:bg-neutral-100 transition-colors">
                                <input
                                    type="checkbox"
                                    checked={formData.isFeatured}
                                    onChange={(e) => setFormData({ ...formData, isFeatured: e.target.checked })}
                                    className="w-5 h-5 accent-charmora-purple"
                                />
                                <span className="text-[10px] font-bold text-neutral-600 uppercase">Featured</span>
                            </label>
                        </div>
                    </div>

                    {/* Footer - Fixed */}
                    <div className="p-6 md:p-8 border-t border-neutral-100 bg-neutral-50/50 flex items-center justify-end gap-4 flex-shrink-0">
                        <button type="button" onClick={onClose} className="px-6 py-3 rounded-2xl font-bold text-sm text-neutral-500 hover:text-neutral-900 transition-colors">Abort</button>
                        <button
                            type="submit"
                            disabled={loading || uploading}
                            className="bg-charmora-purple text-white px-10 py-4 rounded-2xl font-bold shadow-xl shadow-purple-100 flex items-center gap-2 hover:scale-105 transition-all active:scale-95 disabled:opacity-50 disabled:scale-100 disabled:shadow-none"
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

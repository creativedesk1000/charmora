"use client";

import React, { useState } from "react";
import { updateSiteConfig, uploadLogoImage } from "@/lib/actions";
import { toast } from "sonner";
import { Save, Plus, Trash2, GripVertical, Image as ImageIcon } from "lucide-react";
import Image from "next/image";

export default function WebsiteEditorClient({ initialConfig }: { initialConfig: any }) {
    const [config, setConfig] = useState(initialConfig);
    const [activeTab, setActiveTab] = useState("Menu");
    const [isSaving, setIsSaving] = useState(false);
    const [uploadingLogo, setUploadingLogo] = useState(false);

    const handleSave = async () => {
        setIsSaving(true);
        const res = await updateSiteConfig({
            logoUrl: config.logoUrl,
            navMenu: config.navMenu,
            footer: config.footer
        });
        if (res.success) {
            toast.success("Website configuration saved!");
        } else {
            toast.error(res.error || "Failed to save configuration");
        }
        setIsSaving(false);
    };

    const handleLogoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files || e.target.files.length === 0) return;
        const file = e.target.files[0];
        setUploadingLogo(true);
        const formData = new FormData();
        formData.append("file", file);
        
        const res = await uploadLogoImage(formData);
        if (res.success) {
            setConfig({ ...config, logoUrl: res.url });
            toast.success("Logo uploaded successfully");
        } else {
            toast.error(res.error || "Failed to upload logo");
        }
        setUploadingLogo(false);
    };

    // Menu Handlers
    const addMenuItem = () => {
        const newMenu = [...(config.navMenu || []), { name: "New Link", href: "/", order: config.navMenu?.length || 0 }];
        setConfig({ ...config, navMenu: newMenu });
    };

    const updateMenuItem = (index: number, field: string, value: string) => {
        const newMenu = [...config.navMenu];
        newMenu[index] = { ...newMenu[index], [field]: value };
        setConfig({ ...config, navMenu: newMenu });
    };

    const removeMenuItem = (index: number) => {
        const newMenu = [...config.navMenu];
        newMenu.splice(index, 1);
        setConfig({ ...config, navMenu: newMenu });
    };

    // Footer Links Handlers
    const addFooterLink = () => {
        const newLinks = [...(config.footer?.links || []), { name: "New Link", href: "/" }];
        setConfig({ ...config, footer: { ...config.footer, links: newLinks } });
    };

    const updateFooterLink = (index: number, field: string, value: string) => {
        const newLinks = [...config.footer.links];
        newLinks[index] = { ...newLinks[index], [field]: value };
        setConfig({ ...config, footer: { ...config.footer, links: newLinks } });
    };

    const removeFooterLink = (index: number) => {
        const newLinks = [...config.footer.links];
        newLinks.splice(index, 1);
        setConfig({ ...config, footer: { ...config.footer, links: newLinks } });
    };

    return (
        <div className="space-y-8 pb-12 max-w-5xl">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h1 className="text-3xl font-serif font-bold text-neutral-900 leading-tight">Edit Website</h1>
                    <p className="text-neutral-500 text-sm mt-1 font-sans">Customize your storefront's navigation, branding, and footer.</p>
                </div>
                <button 
                    onClick={handleSave}
                    disabled={isSaving}
                    className="bg-neutral-900 text-white px-6 py-3 rounded-2xl font-bold text-xs uppercase tracking-widest hover:bg-black transition-all flex items-center gap-2"
                >
                    <Save size={16} />
                    {isSaving ? "Saving..." : "Save Changes"}
                </button>
            </div>

            <div className="flex gap-2 border-b border-neutral-100 pb-2">
                {["Menu", "Logo", "Footer"].map(tab => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`px-6 py-3 rounded-2xl text-xs font-bold transition-all ${
                            activeTab === tab 
                                ? "bg-neutral-900 text-white" 
                                : "bg-neutral-50 text-neutral-500 hover:text-neutral-900"
                        }`}
                    >
                        {tab}
                    </button>
                ))}
            </div>

            <div className="bg-white rounded-[2rem] border border-neutral-100 shadow-xl p-8">
                {activeTab === "Menu" && (
                    <div className="space-y-6">
                        <div className="flex justify-between items-center">
                            <h3 className="font-serif font-bold text-xl text-neutral-900">Navigation Menu</h3>
                            <button onClick={addMenuItem} className="flex items-center gap-1 text-xs font-bold text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-xl hover:bg-emerald-100">
                                <Plus size={14} /> Add Link
                            </button>
                        </div>
                        
                        <div className="space-y-3">
                            {(config.navMenu || []).map((item: any, i: number) => (
                                <div key={i} className="flex items-center gap-4 bg-neutral-50 p-4 rounded-2xl border border-neutral-100">
                                    <GripVertical size={20} className="text-neutral-400 cursor-grab" />
                                    <input 
                                        type="text" 
                                        value={item.name} 
                                        onChange={(e) => updateMenuItem(i, "name", e.target.value)}
                                        placeholder="Link Name"
                                        className="flex-1 bg-white border border-neutral-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-neutral-900"
                                    />
                                    <input 
                                        type="text" 
                                        value={item.href} 
                                        onChange={(e) => updateMenuItem(i, "href", e.target.value)}
                                        placeholder="URL (/shop)"
                                        className="flex-1 bg-white border border-neutral-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-neutral-900"
                                    />
                                    <button onClick={() => removeMenuItem(i)} className="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-colors">
                                        <Trash2 size={18} />
                                    </button>
                                </div>
                            ))}
                            {(!config.navMenu || config.navMenu.length === 0) && (
                                <p className="text-sm text-neutral-400 italic">No menu items added.</p>
                            )}
                        </div>
                    </div>
                )}

                {activeTab === "Logo" && (
                    <div className="space-y-6">
                        <h3 className="font-serif font-bold text-xl text-neutral-900">Brand Logo</h3>
                        
                        <div className="flex flex-col items-start gap-6">
                            <div className="w-full max-w-sm h-48 border-2 border-dashed border-neutral-200 rounded-[2rem] flex flex-col items-center justify-center bg-neutral-50 overflow-hidden relative">
                                {config.logoUrl ? (
                                    <div className="relative w-full h-full p-4 flex items-center justify-center">
                                        <Image src={config.logoUrl} alt="Logo Preview" fill className="object-contain p-4" />
                                    </div>
                                ) : (
                                    <div className="text-neutral-400 flex flex-col items-center">
                                        <ImageIcon size={32} className="mb-2" />
                                        <span className="text-sm">No logo uploaded</span>
                                    </div>
                                )}
                            </div>
                            
                            <div className="flex gap-3">
                                <label className="bg-neutral-900 text-white px-5 py-2.5 rounded-xl text-xs font-bold cursor-pointer hover:bg-black transition-colors">
                                    {uploadingLogo ? "Uploading..." : "Upload New Logo"}
                                    <input type="file" accept="image/*" className="hidden" onChange={handleLogoUpload} disabled={uploadingLogo} />
                                </label>
                                {config.logoUrl && (
                                    <button 
                                        onClick={() => setConfig({...config, logoUrl: null})}
                                        className="bg-red-50 text-red-600 px-5 py-2.5 rounded-xl text-xs font-bold hover:bg-red-100 transition-colors"
                                    >
                                        Remove Logo
                                    </button>
                                )}
                            </div>
                            <p className="text-xs text-neutral-500">Recommended: Transparent PNG or WebP, max 2MB. If no logo is uploaded, the site will use text-based branding.</p>
                        </div>
                    </div>
                )}

                {activeTab === "Footer" && (
                    <div className="space-y-8">
                        <div>
                            <h3 className="font-serif font-bold text-xl text-neutral-900 mb-4">Footer Text</h3>
                            <textarea 
                                value={config.footer?.text || ""}
                                onChange={(e) => setConfig({...config, footer: {...config.footer, text: e.target.value}})}
                                rows={3}
                                placeholder="Crafted with Love..."
                                className="w-full bg-neutral-50 border border-neutral-200 rounded-2xl p-4 text-sm focus:outline-none focus:border-neutral-900 resize-none"
                            />
                        </div>

                        <div>
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="font-serif font-bold text-xl text-neutral-900">Quick Links</h3>
                                <button onClick={addFooterLink} className="flex items-center gap-1 text-xs font-bold text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-xl hover:bg-emerald-100">
                                    <Plus size={14} /> Add Link
                                </button>
                            </div>
                            
                            <div className="space-y-3">
                                {(config.footer?.links || []).map((item: any, i: number) => (
                                    <div key={i} className="flex items-center gap-4 bg-neutral-50 p-4 rounded-2xl border border-neutral-100">
                                        <input 
                                            type="text" 
                                            value={item.name} 
                                            onChange={(e) => updateFooterLink(i, "name", e.target.value)}
                                            placeholder="Link Name"
                                            className="flex-1 bg-white border border-neutral-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-neutral-900"
                                        />
                                        <input 
                                            type="text" 
                                            value={item.href} 
                                            onChange={(e) => updateFooterLink(i, "href", e.target.value)}
                                            placeholder="URL"
                                            className="flex-1 bg-white border border-neutral-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-neutral-900"
                                        />
                                        <button onClick={() => removeFooterLink(i)} className="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-colors">
                                            <Trash2 size={18} />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

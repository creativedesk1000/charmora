"use client";

import React, { useState } from "react";
import { Search, AlertTriangle, ArrowUpRight, Package } from "lucide-react";
import { motion } from "framer-motion";

export default function InventoryClient({ initialProducts }: { initialProducts: any[] }) {
    const [products] = useState(initialProducts);
    const [searchTerm, setSearchTerm] = useState("");

    const filtered = products.filter(p =>
        p.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-8 pb-12">
            <div>
                <h1 className="text-3xl font-serif font-bold text-neutral-900 leading-tight">Inventory Monitor</h1>
                <p className="text-neutral-500 text-sm mt-1 font-sans">Track and replenish your handcrafted stock levels.</p>
            </div>

            <div className="relative group">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400" size={20} />
                <input
                    type="text"
                    placeholder="Search inventory..."
                    className="w-full bg-white border border-neutral-100 rounded-2xl py-3.5 pl-12 pr-4 outline-none focus:ring-4 focus:ring-purple-50 transition-all font-sans text-sm"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-3xl border border-neutral-100 shadow-sm">
                    <div className="flex items-center gap-4 mb-4">
                        <div className="p-3 bg-red-50 text-red-500 rounded-2xl">
                            <AlertTriangle size={24} />
                        </div>
                        <h3 className="font-bold text-neutral-900">Critical Stock</h3>
                    </div>
                    <p className="text-3xl font-black text-red-500">{products.filter(p => p.stock <= 5).length}</p>
                    <p className="text-xs text-neutral-400 mt-1 uppercase font-bold tracking-widest">Items under 5 units</p>
                </div>
            </div>

            <div className="bg-white rounded-[2rem] border border-neutral-100 shadow-xl overflow-hidden">
                <table className="w-full text-left">
                    <thead>
                        <tr className="bg-neutral-50/50 text-neutral-400 text-[10px] uppercase font-bold tracking-[0.2em] border-b border-neutral-100">
                            <th className="px-8 py-5">Piece</th>
                            <th className="px-6 py-5 text-center">In Stock</th>
                            <th className="px-6 py-5">Status</th>
                            <th className="px-8 py-5 text-right">Action</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-neutral-100 text-sm">
                        {filtered.map((product) => (
                            <tr key={product.id} className="hover:bg-neutral-50/50 transition-colors">
                                <td className="px-8 py-4">
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 rounded-xl overflow-hidden bg-neutral-100">
                                            <img src={product.image} alt="" className="w-full h-full object-cover" />
                                        </div>
                                        <span className="font-bold text-neutral-900">{product.title}</span>
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-center">
                                    <span className={product.stock <= 5 ? "text-red-600 font-bold" : "text-neutral-900"}>
                                        {product.stock}
                                    </span>
                                </td>
                                <td className="px-6 py-4">
                                    {product.stock === 0 ? (
                                        <span className="bg-red-50 text-red-500 px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider">Out of Stock</span>
                                    ) : product.stock <= 5 ? (
                                        <span className="bg-orange-50 text-orange-500 px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider">Low Stock</span>
                                    ) : (
                                        <span className="bg-green-50 text-green-500 px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider">In Stock</span>
                                    )}
                                </td>
                                <td className="px-8 py-4 text-right">
                                    <button className="text-charmora-purple hover:underline font-bold text-xs flex items-center gap-1 justify-end ml-auto">
                                        Manage <ArrowUpRight size={14} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

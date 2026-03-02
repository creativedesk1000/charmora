"use client";

import React from "react";
import Sidebar from "@/components/admin/Sidebar";
import { motion } from "framer-motion";
import { Toaster } from "sonner";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex min-h-screen bg-neutral-50 text-neutral-900 font-sans">
            <Toaster position="top-right" richColors theme="light" />
            <Sidebar />

            <main className="flex-grow flex flex-col min-w-0 bg-[#f8f9fa]">
                {/* Navbar Placeholder */}
                <header className="h-16 border-b border-neutral-200 bg-white/80 backdrop-blur-md sticky top-0 z-40 flex items-center justify-between px-8">
                    <div className="flex items-center gap-4">
                        <h2 className="text-sm font-semibold text-neutral-500 uppercase tracking-widest">Admin Dashboard</h2>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="w-8 h-8 rounded-full bg-charmora-pink flex items-center justify-center text-charmora-purple font-bold text-xs ring-2 ring-white shadow-sm">
                            AD
                        </div>
                    </div>
                </header>

                {/* Content Area */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-8 flex-grow overflow-x-hidden"
                >
                    {children}
                </motion.div>
            </main>
        </div>
    );
}

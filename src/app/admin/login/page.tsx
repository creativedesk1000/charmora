"use client";

import React, { useState } from "react";
import { ShieldCheck, ArrowRight, Lock, Mail } from "lucide-react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function AdminLoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();

        // Developer Demo Bypass
        if (email === "admin@charmora.com" && password === "admin123") {
            // Set a mock cookie for the middleware demo
            document.cookie = "admin-auth=true; path=/";
            toast.success("Identity Verified. Portal Access Granted.");
            router.push("/admin");
        } else {
            toast.error("Access Denied. Credentials not recognized.");
        }
    };

    return (
        <div className="min-h-screen bg-charmora-beige flex items-center justify-center p-6 font-sans">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white w-full max-w-md rounded-[3rem] shadow-2xl overflow-hidden p-10 border border-neutral-100"
            >
                <div className="flex flex-col items-center text-center space-y-6">
                    <div className="w-20 h-20 rounded-[2rem] bg-charmora-purple flex items-center justify-center text-white shadow-xl shadow-purple-100 ring-8 ring-purple-50">
                        <ShieldCheck size={40} />
                    </div>

                    <div className="space-y-1">
                        <h1 className="text-3xl font-serif font-bold text-neutral-900 leading-tight">Admin Portal</h1>
                        <p className="text-neutral-500 text-xs font-bold uppercase tracking-[0.3em] mt-1">Cinderella's Charmora</p>
                    </div>

                    <form onSubmit={handleLogin} className="w-full space-y-6 pt-4">
                        <div className="space-y-4">
                            <div className="relative group">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400 group-focus-within:text-charmora-purple transition-colors" size={18} />
                                <input
                                    type="email"
                                    placeholder="Admin Email"
                                    className="w-full bg-neutral-50 border border-transparent focus:border-neutral-200 focus:bg-white outline-none rounded-2xl py-4 pl-12 pr-4 text-sm font-sans transition-all"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="relative group">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400 group-focus-within:text-charmora-purple transition-colors" size={18} />
                                <input
                                    type="password"
                                    placeholder="Vault Password"
                                    className="w-full bg-neutral-50 border border-transparent focus:border-neutral-200 focus:bg-white outline-none rounded-2xl py-4 pl-12 pr-4 text-sm font-sans transition-all"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-charmora-purple text-white py-5 rounded-3xl font-bold shadow-2xl shadow-purple-100 hover:scale-102 transition-all active:scale-98 flex items-center justify-center gap-3 mt-4"
                        >
                            <span>Access Dashboard</span>
                            <ArrowRight size={20} />
                        </button>

                        <p className="text-[10px] text-neutral-400 font-medium">Demo Access: admin@charmora.com | admin123</p>
                    </form>
                </div>
            </motion.div>
        </div>
    );
}

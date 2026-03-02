"use client";

import React from "react";
import { AlertTriangle, X } from "lucide-react";
import { motion } from "framer-motion";

interface ConfirmModalProps {
    title: string;
    message: string;
    onConfirm: () => void;
    onCancel: () => void;
}

export default function ConfirmModal({ title, message, onConfirm, onCancel }: ConfirmModalProps) {
    return (
        <div className="fixed inset-0 bg-neutral-900/40 backdrop-blur-sm z-[200] flex items-center justify-center p-6">
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white w-full max-w-md rounded-[2.5rem] shadow-2xl p-8 relative overflow-hidden"
            >
                <div className="absolute top-0 right-0 p-8 opacity-5 text-red-600">
                    <AlertTriangle size={150} />
                </div>

                <div className="flex flex-col items-center text-center space-y-6 relative z-10">
                    <div className="w-16 h-16 rounded-3xl bg-red-100 text-red-500 flex items-center justify-center shadow-lg shadow-red-50 ring-4 ring-red-50/50">
                        <AlertTriangle size={32} />
                    </div>

                    <div className="space-y-2">
                        <h3 className="text-2xl font-serif font-bold text-neutral-900">{title}</h3>
                        <p className="text-sm text-neutral-500 font-sans leading-relaxed">{message}</p>
                    </div>

                    <div className="flex flex-col w-full gap-3 pt-4">
                        <button
                            onClick={onConfirm}
                            className="w-full bg-red-500 text-white py-4 rounded-2xl font-bold shadow-xl shadow-red-100 hover:bg-red-600 transition-all active:scale-95 uppercase tracking-widest text-xs"
                        >
                            Confirm Deletion
                        </button>
                        <button
                            onClick={onCancel}
                            className="w-full bg-neutral-100 text-neutral-500 py-4 rounded-2xl font-bold hover:bg-neutral-200 transition-all active:scale-95 text-xs uppercase tracking-widest"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}

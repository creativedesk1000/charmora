"use client";

import { MessageCircle } from "lucide-react";
import { motion } from "framer-motion";

export default function WhatsAppButton() {
    const phoneNumber = "923463688458";
    const message = "Hello! I'm interested in your jewelry collection. I'd like to discuss a piece.";
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

    return (
        <motion.a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, scale: 0.5, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="fixed bottom-8 right-8 z-50 bg-[#25D366] text-white p-4 rounded-full shadow-2xl flex items-center justify-center group transition-all duration-300 hover:bg-[#20ba5c]"
            aria-label="Chat on WhatsApp"
        >
            <MessageCircle size={28} fill="currentColor" className="text-white" />
            <span className="absolute right-full mr-4 bg-white text-charmora-purple px-4 py-2 rounded-lg text-sm font-sans font-bold shadow-xl opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none border border-charmora-purple/5">
                Chat with us
            </span>
            <span className="absolute -top-1 -right-1 flex h-4 w-4">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                <span className="relative inline-flex rounded-full h-4 w-4 bg-white/20"></span>
            </span>
        </motion.a>
    );
}


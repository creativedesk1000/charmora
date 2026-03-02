"use client";

import Header from "./Header";
import Footer from "./Footer";
import WhatsAppButton from "../ui/WhatsAppButton";
import { motion, AnimatePresence } from "framer-motion";

export default function AppLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <AnimatePresence mode="wait">
                <motion.main
                    className="flex-grow"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                >
                    {children}
                </motion.main>
            </AnimatePresence>
            <WhatsAppButton />
            <Footer />
        </div>
    );
}


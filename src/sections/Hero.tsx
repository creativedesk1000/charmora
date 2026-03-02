"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import Link from "next/link";

export default function Hero() {
    return (
        <section className="relative h-[85vh] flex items-center justify-center overflow-hidden">
            {/* Cinematic Background Image */}
            <div className="absolute inset-0 z-0">
                <div
                    className="absolute inset-0 bg-cover bg-center brightness-[0.75]"
                    style={{ backgroundImage: "url('https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=2000&auto=format&fit=crop')" }}
                />
            </div>

            <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, ease: "easeOut" }}
                >
                    <h1 className="text-4xl md:text-8xl text-white mb-10 leading-[1.15] font-serif font-medium tracking-tight">
                        Discover <motion.span
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.5, duration: 1 }}
                            className="text-charmora-pink-dark"
                        >Elegance</motion.span> <br /> in Every Detail
                    </h1>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                        <Link href="/shop">
                            <motion.div
                                animate={{
                                    scale: [1, 1.02, 1],
                                }}
                                transition={{
                                    duration: 2,
                                    repeat: Infinity,
                                    ease: "easeInOut"
                                }}
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <Button
                                    variant="primary"
                                    size="lg"
                                    className="w-full sm:w-auto min-w-[200px] border-2 border-white/50 backdrop-blur-sm shadow-[0_0_25px_rgba(255,105,180,0.5)] hover:shadow-[0_0_40px_rgba(255,105,180,0.7)] transition-all duration-300"
                                >
                                    Shop Now
                                </Button>
                            </motion.div>
                        </Link>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}


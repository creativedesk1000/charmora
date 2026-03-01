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
                        Discover <span className="text-luxury-amber">Elegance</span> <br /> in Every Detail
                    </h1>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                        <Link href="/shop">
                            <Button variant="primary" size="lg" className="w-full sm:w-auto min-w-[200px]">
                                Shop Now
                            </Button>
                        </Link>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}

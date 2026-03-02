"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import Link from "next/link";

export default function Craftsmanship() {
    return (
        <section className="py-24 px-6 md:px-12 bg-charmora-pink/20 overflow-hidden">
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                {/* Visual Content */}
                <div className="relative order-2 lg:order-1">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1 }}
                        className="relative aspect-[4/5] bg-charmora-beige"
                    >
                        <Image
                            src="https://images.unsplash.com/photo-1531995811006-35cb42e1a022?q=80&w=1000&auto=format&fit=crop"
                            alt="Artisan at work"
                            fill
                            className="object-cover"
                        />
                    </motion.div>
                </div>

                {/* Text Content */}
                <div className="order-1 lg:order-2">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <span className="text-xs uppercase tracking-[0.4em] text-charmora-pink-dark font-medium mb-6 block font-sans">
                            The Artisan Touch
                        </span>
                        <h2 className="text-4xl md:text-5xl text-charmora-purple font-serif mb-8 leading-tight">
                            Honoring the Art <br /> of Handsmanship
                        </h2>
                        <div className="space-y-6 text-charmora-purple/70 leading-relaxed font-sans">
                            <p>
                                At Cinderellaz Charmora, every piece of jewelry tells a story of dedication, patience, and meticulous skill. Our master artisans blend age-old techniques with modern design sensibilities.
                            </p>
                            <p>
                                From the initial sketch to the final polish, each accessory undergoes a rigorous process of creation. We source only the finest sustainable materials to ensure that your charm remains as timeless as its inspiration.
                            </p>
                        </div>

                        <div className="grid grid-cols-2 gap-8 mt-12 mb-12">
                            <div>
                                <h4 className="text-charmora-pink-dark text-2xl font-serif mb-2 italic">100%</h4>
                                <p className="text-[10px] uppercase tracking-widest text-charmora-purple/60 font-sans">Handcrafted Artistry</p>
                            </div>
                            <div>
                                <h4 className="text-charmora-pink-dark text-2xl font-serif mb-2 italic">Limited</h4>
                                <p className="text-[10px] uppercase tracking-widest text-charmora-purple/60 font-sans">Edition Designs</p>
                            </div>
                        </div>

                        <Link href="/about">
                            <Button variant="outline" className="border-charmora-pink-dark/50 text-charmora-pink-dark">
                                Meet the Makers
                            </Button>
                        </Link>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}


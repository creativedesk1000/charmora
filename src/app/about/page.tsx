"use client";

import AppLayout from "@/components/layout";
import { motion } from "framer-motion";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import Link from "next/link";

export default function AboutPage() {
    return (
        <AppLayout>
            {/* Hero Section */}
            <section className="relative pt-48 pb-32 px-6 md:px-12 bg-luxury-beige/10">
                <div className="max-w-5xl mx-auto text-center">
                    <motion.span
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-xs uppercase tracking-[0.4em] text-luxury-gold font-medium mb-8 block font-sans"
                    >
                        The Soul of Cinderela Charmora
                    </motion.span>
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-5xl md:text-7xl text-luxury-charcoal font-serif mb-12 italic font-light"
                    >
                        Crafting Elegance, <br /> One Stitch at a Time.
                    </motion.h1>
                    <motion.div
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.3 }}
                        className="aspect-[21/9] w-full bg-luxury-beige/30 relative overflow-hidden group"
                    >
                        <Image
                            src="https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?q=80&w=2000&auto=format&fit=crop"
                            alt="Brand lifestyle"
                            fill
                            className="object-cover transition-transform duration-[2s] group-hover:scale-105"
                        />
                    </motion.div>
                </div>
            </section>

            {/* Story Sections */}
            <section className="py-32 px-6 md:px-12 bg-white">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center mb-32">
                        <div>
                            <h2 className="text-4xl font-serif text-luxury-charcoal mb-8">Our Philosophy</h2>
                            <div className="space-y-6 text-luxury-charcoal/70 leading-relaxed font-sans">
                                <p>
                                    Born out of a passion for intricate handiwork, Cinderela Charmora was established with a singular vision: to create jewelry that feels like a second skin—intimate, beautiful, and profoundly personal.
                                </p>
                                <p>
                                    We believe that the most luxury isn't found in mass production, but in the slow, deliberate work of the human hand. Each of our pieces is a tribute to the "art of the small"—the tiny details that make a grand impression.
                                </p>
                            </div>
                        </div>
                        <div className="relative aspect-square md:aspect-[4/3] bg-luxury-ivory overflow-hidden">
                            <Image
                                src="https://images.unsplash.com/photo-1543163521-1bf539c55dd2?q=80&w=1000&auto=format&fit=crop"
                                alt="Artisan detail"
                                fill
                                className="object-cover"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
                        <div className="order-2 lg:order-1 relative aspect-square md:aspect-[4/3] bg-luxury-ivory overflow-hidden">
                            <Image
                                src="https://images.unsplash.com/photo-1589128777073-263566ae5e4d?q=80&w=1000&auto=format&fit=crop"
                                alt="Founder portrait placeholder"
                                fill
                                className="object-cover grayscale hover:grayscale-0 transition-all duration-1000"
                            />
                        </div>
                        <div className="order-1 lg:order-2">
                            <span className="text-xs uppercase tracking-widest text-luxury-gold font-medium mb-6 block font-sans">The Founder</span>
                            <h2 className="text-4xl font-serif text-luxury-charcoal mb-8">A Visionary Journey</h2>
                            <div className="space-y-6 text-luxury-charcoal/70 leading-relaxed font-sans">
                                <p>
                                    Founded by a collective of artists and designers, our journey began in a small seaside studio. Today, Cinderela Charmora carries that same spirit of serenity and creative freedom into every international collection.
                                </p>
                                <p>
                                    We invite you to explore a world where tradition is celebrated through a modern lens, and where every accessory is a conversation between the artisan and you.
                                </p>
                            </div>
                            <div className="mt-12 group inline-block">
                                <Link href="/contact">
                                    <Button variant="primary">Get in Touch</Button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Values */}
            <section className="py-24 bg-luxury-beige/20 text-center px-6 md:px-12">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-8">
                        <div className="space-y-4">
                            <h4 className="text-lg font-serif text-luxury-charcoal">Artisanal Integrity</h4>
                            <p className="text-sm text-luxury-charcoal/60 font-sans">No shortcuts, only slow craftsmanship that respects the material.</p>
                        </div>
                        <div className="space-y-4">
                            <h4 className="text-lg font-serif text-luxury-charcoal">Premium Sourcing</h4>
                            <p className="text-sm text-luxury-charcoal/60 font-sans">Ethically sourced pearls and recycled golds for a kind luxury.</p>
                        </div>
                        <div className="space-y-4">
                            <h4 className="text-lg font-serif text-luxury-charcoal">Empowering Women</h4>
                            <p className="text-sm text-luxury-charcoal/60 font-sans">Designs that celebrate the feminine spirit in all its forms.</p>
                        </div>
                    </div>
                </div>
            </section>
        </AppLayout>
    );
}

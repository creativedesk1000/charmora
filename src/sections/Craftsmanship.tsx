"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export default function Craftsmanship() {
    return (
        <section className="py-24 px-6 md:px-12 bg-[#FFF9F5] relative overflow-hidden">
            {/* Background decorative elements if needed */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-charmora-pink/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>

            <div className="max-w-5xl mx-auto">
                <div className="bg-white rounded-3xl p-8 md:p-16 shadow-xl border border-orange-100/50 relative">
                    <div className="flex flex-col items-center text-center">
                        {/* Logo/Avatar */}
                        <div className="w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden mb-6 border-4 border-orange-50 shadow-inner">
                            <Image
                                src="/favicon.jpeg"
                                alt="Charmora Logo"
                                width={128}
                                height={128}
                                className="object-cover"
                            />
                        </div>

                        {/* Badge */}
                        <div className="inline-block px-4 py-1.5 bg-[#EE8E3B] text-white text-[10px] uppercase tracking-widest font-bold rounded-full mb-6">
                            ✦ OUR STORY
                        </div>

                        {/* Heading */}
                        <h2 className="text-3xl md:text-5xl text-charmora-purple font-serif mb-8 leading-tight max-w-2xl">
                            Crafting Elegance, Since 2023
                        </h2>

                        {/* Message */}
                        <div className="max-w-3xl space-y-6 text-gray-500 leading-relaxed font-sans italic relative">
                            <span className="absolute -top-4 -left-4 text-6xl text-orange-100 font-serif -z-10">"</span>
                            <p className="text-sm md:text-lg">
                                Hi, I'm Cinderella, the owner of Charmora. I started this small business in November 2023 with the dream of becoming independent and sharing unique handmade jewelry you won't find anywhere else.
                            </p>
                            <p className="text-sm md:text-lg">
                                Every piece is made with love and high-quality materials. I'm so grateful to have you as part of my journey ❤️
                            </p>
                        </div>

                        {/* Buttons */}
                        <div className="flex flex-col sm:flex-row gap-4 mt-12">
                            <Link
                                href="/shop"
                                className="px-10 py-3 bg-[#EE8E3B] text-white rounded-full hover:bg-[#D07E2E] transition-colors duration-300 font-medium shadow-md"
                            >
                                Explore Collection →
                            </Link>
                            <Link
                                href="/contact"
                                className="px-10 py-3 border-2 border-orange-100 text-gray-600 rounded-full hover:bg-orange-50 transition-colors duration-300 font-medium"
                            >
                                Contact Us
                            </Link>
                        </div>

                        {/* Stats */}
                        <div className="w-full mt-16 pt-16 border-t border-gray-100">
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-12 text-center">
                                <div className="space-y-2">
                                    <div className="text-2xl font-bold text-charmora-purple font-sans">100%</div>
                                    <div className="text-xs uppercase tracking-widest text-gray-400 font-sans font-medium">Handcrafted</div>
                                </div>
                                <div className="space-y-2">
                                    <div className="text-2xl font-bold text-charmora-purple font-sans">500+</div>
                                    <div className="text-xs uppercase tracking-widest text-gray-400 font-sans font-medium">Happy Clients</div>
                                </div>
                                <div className="space-y-2">
                                    <div className="text-2xl font-bold text-charmora-purple font-sans">Ethical</div>
                                    <div className="text-xs uppercase tracking-widest text-gray-400 font-sans font-medium">Sourcing</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}


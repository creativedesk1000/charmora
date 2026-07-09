"use client";

import { useState } from "react";
import Link from "next/link";
import { ShoppingBag, Menu, X, Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import logo from "@/app/logo.png";

const navLinks = [
    { name: "Home", href: "/" },
    { name: "Collections", href: "/shop" },
    { name: "Track", href: "/track" },
    { name: "Contact", href: "/contact" },
];

import { useCart } from "@/context/CartContext";

export default function Header() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const { totalItems } = useCart();

    return (
        <header className="w-full bg-[#e8afcb] border-b border-[#e8afcb]">
            {/* Announcement Bar */}
            <div className="bg-charmora-purple py-2 px-4 text-center border-b border-charmora-purple/10">
                <p className="text-[10px] md:text-xs uppercase tracking-[0.2em] text-white font-medium">
                    Delivery within 9-10 working days
                </p>
            </div>

            <div className="max-w-7xl mx-auto px-6 md:px-12 py-6 flex items-center justify-between relative">
                {/* Mobile Menu Button - Left Aligned */}
                <div className="md:hidden z-20 w-10 flex justify-start">
                    <button className="text-charmora-purple p-1" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                        {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
                    </button>
                </div>

                {/* Logo - Centered on Mobile, Left Aligned on Desktop */}
                <Link
                    href="/"
                    className="flex flex-col items-center md:items-start z-20 absolute left-1/2 -translate-x-1/2 md:static md:left-0 md:translate-x-0 group"
                >
                    <div className="flex items-center gap-2 md:gap-3 transition-transform duration-300 group-hover:scale-105">
                        <Image src={logo} alt="Cinderella's Charmora Logo" width={40} height={40} className="h-10 w-auto object-contain" priority />
                        <div className="flex flex-col items-center md:items-start">
                            <span className="text-xl md:text-2xl font-serif tracking-tight text-charmora-purple leading-tight">
                                Cinderella's
                            </span>
                            <span className="text-[8px] md:text-[10px] uppercase tracking-[0.4em] -mt-1 text-charmora-pink-dark font-sans font-semibold text-center md:text-left">
                                Charmora
                            </span>
                        </div>
                    </div>
                </Link>

                {/* Navigation - Center (Desktop Only) */}
                <nav className="hidden md:flex items-center absolute left-1/2 -translate-x-1/2 space-x-10">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            className="text-xs uppercase tracking-[0.2em] text-charmora-purple hover:text-charmora-pink-dark transition-colors duration-300 font-sans font-medium relative group"
                        >
                            {link.name}
                            {link.name === "Collections" && (
                                <span className="absolute -top-3 -right-6 bg-charmora-pink-dark text-white text-[8px] px-1.5 py-0.5 rounded-full font-bold">
                                    New
                                </span>
                            )}
                        </Link>
                    ))}
                </nav>

                {/* Actions - Right aligned */}
                <div className="flex items-center space-x-5 z-20 w-10 md:w-auto justify-end">
                    <button className="text-charmora-purple hover:text-charmora-pink-dark transition-colors duration-300">
                        <Search size={20} strokeWidth={1.5} />
                    </button>
                    <Link href="/checkout" className="text-charmora-purple hover:text-charmora-pink-dark transition-colors duration-300 relative">
                        <ShoppingBag size={20} strokeWidth={1.5} />
                        {totalItems > 0 && (
                            <span className="absolute -top-1 -right-1 bg-charmora-pink-dark text-white text-[8px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                                {totalItems}
                            </span>
                        )}
                    </Link>
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="bg-white border-b border-charmora-pink/10 overflow-hidden md:hidden"
                    >
                        <div className="flex flex-col space-y-4 p-8">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    className="text-lg font-serif text-charmora-purple flex items-center justify-between"
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    {link.name}
                                    {link.name === "Collections" && (
                                        <span className="bg-charmora-pink-dark text-white text-[10px] px-2 py-0.5 rounded-full font-bold">
                                            New
                                        </span>
                                    )}
                                </Link>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
}


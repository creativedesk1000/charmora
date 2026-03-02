"use client";

import AppLayout from "@/components/layout";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { Mail, MapPin, Phone, Instagram, Send, MessageCircle } from "lucide-react";

export default function ContactPage() {
    return (
        <AppLayout>
            <section className="pt-48 pb-24 px-6 md:px-12 bg-charmora-beige">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-start">

                        {/* Contact Details */}
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                        >
                            <span className="text-xs uppercase tracking-[0.4em] text-charmora-pink-dark font-medium mb-6 block font-sans">
                                Get in Touch
                            </span>
                            <h1 className="text-5xl md:text-6xl text-charmora-purple font-serif mb-8 italic font-light">
                                Connect with our <br /> Studio.
                            </h1>
                            <p className="text-charmora-purple/70 leading-relaxed mb-12 max-w-md font-sans">
                                Whether you have a question about a bespoke commission or need styling advice, our concierge team is here to assist you.
                            </p>

                            <div className="space-y-12 mb-16">
                                <div className="flex gap-6">
                                    <div className="w-12 h-12 bg-white flex items-center justify-center rounded-full border border-charmora-pink-dark/20 shrink-0">
                                        <Mail size={20} className="text-charmora-pink-dark" />
                                    </div>
                                    <div>
                                        <h4 className="text-sm font-sans font-semibold text-charmora-purple uppercase tracking-widest mb-1">Email Us</h4>
                                        <p className="text-charmora-purple/60 font-sans">concierge@cinderellazcharmora.com</p>
                                    </div>
                                </div>

                                <div className="flex gap-6">
                                    <div className="w-12 h-12 bg-white flex items-center justify-center rounded-full border border-charmora-pink-dark/20 shrink-0">
                                        <Phone size={20} className="text-charmora-pink-dark" />
                                    </div>
                                    <div>
                                        <h4 className="text-sm font-sans font-semibold text-charmora-purple uppercase tracking-widest mb-1">Call Us</h4>
                                        <p className="text-charmora-purple/60 font-sans">+92 (300) 123 4567</p>
                                    </div>
                                </div>

                                <div className="flex gap-6">
                                    <div className="w-12 h-12 bg-white flex items-center justify-center rounded-full border border-charmora-pink-dark/20 shrink-0">
                                        <MapPin size={20} className="text-charmora-pink-dark" />
                                    </div>
                                    <div>
                                        <h4 className="text-sm font-sans font-semibold text-charmora-purple uppercase tracking-widest mb-1">Our Studio</h4>
                                        <p className="text-charmora-purple/60 font-sans">12/A Artisan District, <br /> Karachi, Pakistan</p>
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center space-x-6">
                                <a href="#" className="w-10 h-10 border border-charmora-pink-dark/30 flex items-center justify-center rounded-full text-charmora-purple hover:bg-charmora-pink-dark hover:text-white transition-all duration-300">
                                    <Instagram size={18} />
                                </a>
                            </div>
                        </motion.div>

                        {/* Contact Form */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1, delay: 0.2 }}
                            className="bg-white p-10 md:p-16 shadow-2xl border border-charmora-pink-dark/10"
                        >
                            <form className="space-y-8">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className="space-y-2">
                                        <label className="text-[10px] uppercase tracking-widest text-charmora-purple/40 font-sans font-semibold">Your Name</label>
                                        <input
                                            type="text"
                                            placeholder="Enter name"
                                            className="w-full bg-charmora-beige/50 border-b border-charmora-pink-dark/20 py-3 px-4 focus:border-charmora-pink-dark outline-none transition-colors font-sans text-sm"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] uppercase tracking-widest text-charmora-purple/40 font-sans font-semibold">Email Address</label>
                                        <input
                                            type="email"
                                            placeholder="Enter email"
                                            className="w-full bg-charmora-beige/50 border-b border-charmora-pink-dark/20 py-3 px-4 focus:border-charmora-pink-dark outline-none transition-colors font-sans text-sm"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[10px] uppercase tracking-widest text-charmora-purple/40 font-sans font-semibold">Message</label>
                                    <textarea
                                        placeholder="How can we help you?"
                                        rows={5}
                                        className="w-full bg-charmora-beige/50 border-b border-charmora-pink-dark/20 py-3 px-4 focus:border-charmora-pink-dark outline-none transition-colors font-sans text-sm resize-none"
                                    />
                                </div>

                                <Button variant="primary" className="w-full h-14 group">
                                    Send Message
                                    <Send size={16} className="ml-3 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                </Button>
                            </form>
                        </motion.div>

                    </div>
                </div>
            </section>

            {/* WhatsApp Floating Button */}
            <a
                href="https://wa.me/923001234567"
                target="_blank"
                rel="noopener noreferrer"
                className="fixed bottom-10 right-10 w-16 h-16 bg-[#25D366] text-white rounded-full flex items-center justify-center shadow-2xl hover:scale-110 active:scale-95 transition-all z-50 group border-4 border-white/20"
            >
                <MessageCircle size={30} fill="currentColor" />
                <span className="absolute right-full mr-4 bg-white text-charmora-purple text-[10px] uppercase tracking-widest font-semibold px-4 py-2 rounded-full whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity shadow-lg">Chat with us</span>
            </a>

            {/* Map Placeholder */}
            <section className="h-[400px] w-full bg-charmora-pink/30 relative overflow-hidden grayscale contrast-125 opacity-60">
                <div className="absolute inset-0 flex items-center justify-center text-charmora-purple/20 font-serif text-2xl uppercase tracking-[1em]">
                    Studio Location
                </div>
            </section>
        </AppLayout>
    );
}


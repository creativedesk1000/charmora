import Link from "next/link";
import { Instagram, Facebook, Twitter, Mail } from "lucide-react";

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-white pt-24 pb-12 border-t border-charmora-pink/20 px-6 md:px-12">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 mb-20">
                {/* Brand Column */}
                <div className="col-span-1 md:col-span-1">
                    <Link href="/" className="inline-flex flex-col items-start mb-8">
                        <span className="text-3xl font-serif text-charmora-purple font-bold">Cinderellaz</span>
                        <span className="text-[10px] uppercase tracking-[0.4em] -mt-1 text-charmora-pink-dark font-sans font-bold">Charmora</span>
                    </Link>
                    <p className="text-sm text-charmora-purple/70 leading-relaxed font-sans max-w-xs">
                        Handcrafting timeless accessories that celebrate individual elegance and refined artistry.
                    </p>
                </div>

                {/* Quick Links */}
                <div>
                    <h4 className="text-xs uppercase tracking-[0.2em] text-charmora-purple font-bold mb-8">Collections</h4>
                    <ul className="space-y-4">
                        <li><Link href="/shop" className="text-sm text-charmora-purple/60 hover:text-charmora-pink-dark transition-colors font-sans">New Arrivals</Link></li>
                        <li><Link href="/shop?category=necklaces" className="text-sm text-charmora-purple/60 hover:text-charmora-pink-dark transition-colors font-sans">Necklaces</Link></li>
                        <li><Link href="/shop?category=bracelets" className="text-sm text-charmora-purple/60 hover:text-charmora-pink-dark transition-colors font-sans">Bracelets</Link></li>
                        <li><Link href="/shop?category=earrings" className="text-sm text-charmora-purple/60 hover:text-charmora-pink-dark transition-colors font-sans">Earrings</Link></li>
                    </ul>
                </div>

                {/* Customer Care */}
                <div>
                    <h4 className="text-xs uppercase tracking-[0.2em] text-charmora-purple font-bold mb-8">Customer Care</h4>
                    <ul className="space-y-4">
                        <li><Link href="/contact" className="text-sm text-charmora-purple/60 hover:text-charmora-pink-dark transition-colors font-sans">Contact Concierge</Link></li>
                        <li><Link href="/shipping" className="text-sm text-charmora-purple/60 hover:text-charmora-pink-dark transition-colors font-sans">Shipping & Delivery</Link></li>
                        <li><Link href="/care-instructions" className="text-sm text-charmora-purple/60 hover:text-charmora-pink-dark transition-colors font-sans">Care Guide</Link></li>
                    </ul>
                </div>

                {/* Social & Newsletter */}
                <div>
                    <h4 className="text-xs uppercase tracking-[0.2em] text-charmora-purple font-bold mb-8">Join the Boutique</h4>
                    <div className="flex items-center space-x-6 mb-8">
                        <Link href="https://www.instagram.com/cinderellaz.charmora" target="_blank" className="text-charmora-purple/40 hover:text-charmora-pink-dark transition-colors"><Instagram size={20} /></Link>
                        <Link href="https://www.tiktok.com/@charmora1000" target="_blank" className="text-charmora-purple/40 hover:text-charmora-pink-dark transition-colors">
                            <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.59-1.01-.01 2.62-.02 5.24-.02 7.86-.03 1.34-.37 2.73-1.11 3.84-.74 1.11-1.89 1.89-3.14 2.25-1.25.36-2.61.34-3.87-.04-1.26-.38-2.38-1.22-3.08-2.34-.7-1.12-1.01-2.48-.89-3.8.12-1.32.74-2.58 1.72-3.48 1.05-.96 2.49-1.5 3.92-1.48.56 0 1.12.08 1.65.24v4.11c-.5-.21-1.05-.31-1.6-.28-.56.03-1.13.23-1.58.58-.45.35-.74.87-.82 1.43-.08.56.04 1.15.34 1.63.3.48.78.82 1.31.95.53.13 1.1.04 1.58-.23.48-.27.83-.73.97-1.26.11-.41.13-.84.13-1.26V.02z" />
                            </svg>
                        </Link>
                        <Link href="https://facebook.com" target="_blank" className="text-charmora-purple/40 hover:text-charmora-pink-dark transition-colors"><Facebook size={20} /></Link>
                    </div>
                    <form className="relative group">
                        <input
                            type="email"
                            placeholder="Your email address"
                            className="w-full bg-transparent border-b border-charmora-purple/20 pb-2 text-sm focus:border-charmora-pink-dark outline-none transition-colors font-sans pr-10"
                        />
                        <button type="submit" className="absolute right-0 bottom-2 text-charmora-pink-dark">
                            <Mail size={18} />
                        </button>
                    </form>
                </div>
            </div>

            <div className="max-w-7xl mx-auto pt-8 border-t border-charmora-pink/10 flex flex-col md:flex-row items-center justify-between gap-4 text-[10px] uppercase tracking-widest text-charmora-purple/40 font-bold">
                <p>© {currentYear} Cinderellaz Charmora. Crafted with Pride.</p>
                <div className="flex gap-8">
                    <Link href="/privacy" className="hover:text-charmora-pink-dark transition-colors">Privacy</Link>
                    <Link href="/terms" className="hover:text-charmora-pink-dark transition-colors">Terms</Link>
                </div>
            </div>
        </footer>

    );
}


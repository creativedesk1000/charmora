import Link from "next/link";
import { Instagram, Facebook, Twitter, Mail } from "lucide-react";
import Image from "next/image";
import logo from "@/app/logo.png";

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-white pt-24 pb-12 border-t border-charmora-pink/20 px-6 md:px-12">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 mb-20">
                {/* Brand Column */}
                <div className="col-span-1 md:col-span-1">
                    <Link href="/" className="inline-flex items-center gap-3 mb-8 transition-transform hover:scale-105">
                        <Image src={logo} alt="Cinderella's Charmora Logo" width={50} height={50} className="h-12 w-auto object-contain" />
                        <div className="flex flex-col items-start">
                            <span className="text-3xl font-serif text-charmora-purple font-bold">Cinderella's</span>
                            <span className="text-[10px] uppercase tracking-[0.4em] -mt-1 text-charmora-pink-dark font-sans font-bold">Charmora</span>
                        </div>
                    </Link>
                    <p className="text-sm text-charmora-purple/70 leading-relaxed font-sans max-w-xs">
                        Crafted with Love 💗.
                        Worn with Confidence 🔥. Treasured Forever ✨.                    </p>
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
                        <li><Link href="/contact" className="text-sm text-charmora-purple/60 hover:text-charmora-pink-dark transition-colors font-sans">Return & Refund Policy</Link></li>
                        <li><Link href="/shipping" className="text-sm text-charmora-purple/60 hover:text-charmora-pink-dark transition-colors font-sans">Shipping & Delivery</Link></li>
                        <li><Link href="/privacy-policy" className="text-sm text-charmora-purple/60 hover:text-charmora-pink-dark transition-colors font-sans">Privacy Policy</Link></li>
                        <li><Link href="/terms-conditions" className="text-sm text-charmora-purple/60 hover:text-charmora-pink-dark transition-colors font-sans">Terms & Conditions</Link></li>
                    </ul>
                </div>

                {/* Social & Newsletter */}
                <div>
                    <h4 className="text-xs uppercase tracking-[0.2em] text-charmora-purple font-bold mb-8">Contact Us</h4>
                    <div className="flex items-center space-x-6 mb-8">
                        <Link href="https://www.instagram.com/cinderellaz.charmora" target="_blank" className="text-charmora-purple/40 hover:text-charmora-pink-dark transition-colors"><Instagram size={20} /></Link>
                        <Link href="https://www.tiktok.com/@charmora1000" target="_blank" className="text-charmora-purple/40 hover:text-charmora-pink-dark transition-colors">
                            <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.59-1.01-.01 2.62-.02 5.24-.02 7.86-.03 1.34-.37 2.73-1.11 3.84-.74 1.11-1.89 1.89-3.14 2.25-1.25.36-2.61.34-3.87-.04-1.26-.38-2.38-1.22-3.08-2.34-.7-1.12-1.01-2.48-.89-3.8.12-1.32.74-2.58 1.72-3.48 1.05-.96 2.49-1.5 3.92-1.48.56 0 1.12.08 1.65.24v4.11c-.5-.21-1.05-.31-1.6-.28-.56.03-1.13.23-1.58.58-.45.35-.74.87-.82 1.43-.08.56.04 1.15.34 1.63.3.48.78.82 1.31.95.53.13 1.1.04 1.58-.23.48-.27.83-.73.97-1.26.11-.41.13-.84.13-1.26V.02z" />
                            </svg>
                        </Link>
                        <Link href="https://facebook.com" target="_blank" className="text-charmora-purple/40 hover:text-charmora-pink-dark transition-colors"><Facebook size={20} /></Link>
                        <Link href="https://wa.me/923463688458" target="_blank" className="text-charmora-purple/40 hover:text-charmora-pink-dark transition-colors" rel="noopener noreferrer">
                            <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
                            </svg>
                        </Link>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-charmora-purple/60 font-sans">
                        <Mail size={18} className="text-charmora-pink-dark" />
                        <a href="mailto:charmora1000@gmail.com" className="hover:text-charmora-pink-dark transition-colors">
                            charmora1000@gmail.com
                        </a>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto pt-8 border-t border-charmora-pink/10 flex flex-col md:flex-row items-center justify-between gap-4 text-[10px] uppercase tracking-widest text-charmora-purple/40 font-bold">
                <div className="flex flex-col items-center md:items-start gap-2">
                    <p>© {currentYear} Cinderella's Charmora. Crafted with Pride in Pakistan.</p>
                    <p>
                        Developed by <a href="https://www.techzaiqa.com/" target="_blank" rel="noopener noreferrer" className="text-charmora-purple hover:text-charmora-pink-dark transition-colors font-black">Tech Zaiqa</a>
                    </p>
                </div>
                <div className="flex items-center gap-8">
                    <Link href="/admin" className="px-4 py-2 bg-charmora-purple text-white rounded-full hover:bg-charmora-purple/90 transition-all font-sans text-[10px] tracking-widest">Admin Portal</Link>
                </div>
            </div>
        </footer>

    );
}


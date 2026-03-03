import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Cinderella's Charmora | Timeless Handcrafted Elegance",
  description: "Exquisite handmade necklaces, bracelets, and artisan accessories for the modern woman.",
  icons: {
    icon: "/favicon.jpeg",
  },
};

import { Providers } from "@/components/Providers";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${playfair.variable} ${inter.variable} font-sans antialiased bg-charmora-beige text-charmora-purple`}
      >
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}


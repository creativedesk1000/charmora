export const dynamic = "force-dynamic";

import prisma from "@/lib/db";
import WebsiteEditorClient from "./WebsiteEditorClient";

export default async function EditWebsite() {
    let siteConfig = await prisma.siteConfig.findUnique({
        where: { id: "default" }
    });

    if (!siteConfig) {
        siteConfig = {
            id: "default",
            logoUrl: null,
            navMenu: [
                { name: "Home", href: "/", order: 1 },
                { name: "Collections", href: "/shop", order: 2 },
                { name: "Track", href: "/track", order: 3 },
                { name: "Contact", href: "/contact", order: 4 },
            ],
            footer: {
                text: "Crafted with Love 💗. Worn with Confidence 🔥. Treasured Forever ✨.",
                links: [
                    { name: "New Arrivals", href: "/shop" },
                    { name: "Bestsellers", href: "/shop?sort=bestseller" },
                    { name: "Contact Us", href: "/contact" }
                ],
                social: [
                    { name: "Instagram", url: "https://www.instagram.com/cinderellaz.charmora" },
                    { name: "Tiktok", url: "https://www.tiktok.com/@charmora1000" }
                ]
            },
            updatedAt: new Date()
        } as any;
    }

    return <WebsiteEditorClient initialConfig={siteConfig} />;
}

"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    LayoutDashboard,
    Package,
    Layers,
    ShoppingCart,
    Users,
    Settings,
    ChevronLeft,
    ChevronRight,
    LogOut,
    Sparkles
} from "lucide-react";
import { cn } from "@/lib/utils";

const menuItems = [
    { icon: LayoutDashboard, label: "Dashboard", href: "/admin" },
    { icon: Package, label: "Products", href: "/admin/products" },
    { icon: Layers, label: "Categories", href: "/admin/categories" },
    { icon: Package, label: "Inventory", href: "/admin/inventory" },
    { icon: ShoppingCart, label: "Orders", href: "/admin/orders" },
    { icon: Users, label: "Users", href: "/admin/users" },
];

export default function Sidebar() {
    const [collapsed, setCollapsed] = useState(false);
    const pathname = usePathname();

    return (
        <aside
            className={cn(
                "h-screen sticky top-0 bg-charmora-purple text-white transition-all duration-300 flex flex-col z-50 shadow-2xl",
                collapsed ? "w-20" : "w-64"
            )}
        >
            {/* Logo Section */}
            <div className="h-20 flex items-center justify-between px-6 border-b border-white/10 overflow-hidden">
                {!collapsed && (
                    <Link href="/" className="flex flex-col items-start group">
                        <span className="text-xl font-serif font-bold tracking-tight">Cinderella's</span>
                        <span className="text-[8px] uppercase tracking-[0.4em] -mt-1 text-charmora-pink font-sans">Charmora</span>
                    </Link>
                )}
                {collapsed && <Sparkles className="text-charmora-pink w-6 h-6 mx-auto" />}

                <button
                    onClick={() => setCollapsed(!collapsed)}
                    className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
                >
                    {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
                </button>
            </div>

            {/* Navigation */}
            <nav className="flex-grow py-8 px-3 space-y-2">
                {menuItems.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                "flex items-center gap-4 px-3 py-3 rounded-xl transition-all duration-200 group relative",
                                isActive
                                    ? "bg-charmora-pink text-charmora-purple font-bold shadow-lg"
                                    : "hover:bg-white/10 text-white/70 hover:text-white"
                            )}
                        >
                            <item.icon size={22} className={cn("min-w-[22px]", isActive ? "text-charmora-purple" : "group-hover:scale-110 transition-transform")} />
                            {!collapsed && <span className="text-sm font-sans tracking-wide">{item.label}</span>}

                            {collapsed && (
                                <div className="absolute left-16 bg-charmora-purple text-white px-3 py-2 rounded-md text-xs invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-all shadow-xl border border-white/10 whitespace-nowrap z-50">
                                    {item.label}
                                </div>
                            )}
                        </Link>
                    );
                })}
            </nav>

            {/* Bottom Section */}
            <div className="p-3 border-t border-white/10">
                <button className="flex items-center gap-4 px-3 py-4 w-full rounded-xl hover:bg-red-500/10 text-white/70 hover:text-red-400 transition-all group relative">
                    <LogOut size={22} className="min-w-[22px]" />
                    {!collapsed && <span className="text-sm font-sans font-medium">Logout</span>}

                    {collapsed && (
                        <div className="absolute left-16 bg-red-500 text-white px-3 py-2 rounded-md text-xs invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-all shadow-xl whitespace-nowrap z-50">
                            Logout
                        </div>
                    )}
                </button>
            </div>
        </aside>
    );
}

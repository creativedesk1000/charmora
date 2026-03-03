"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { toast } from "sonner";

interface CartItem {
    id: string;
    title: string;
    price: number;
    image: string;
    quantity: number;
}

interface CartContextType {
    cart: CartItem[];
    addToCart: (item: CartItem) => void;
    removeFromCart: (id: string) => void;
    updateQuantity: (id: string, quantity: number) => void;
    clearCart: () => void;
    totalItems: number;
    totalPrice: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
    const [cart, setCart] = useState<CartItem[]>([]);

    useEffect(() => {
        const savedCart = localStorage.getItem("charmora-cart");
        if (savedCart) {
            try {
                setCart(JSON.parse(savedCart));
            } catch (e) {
                console.error("Failed to parse cart", e);
            }
        }
    }, []);

    useEffect(() => {
        localStorage.setItem("charmora-cart", JSON.stringify(cart));
    }, [cart]);

    const addToCart = (item: CartItem) => {
        setCart((prev) => {
            const existing = prev.find((i) => i.id === item.id);
            if (existing) {
                toast.success(`Updated ${item.title} quantity in your bag.`);
                return prev.map((i) =>
                    i.id === item.id ? { ...i, quantity: i.quantity + item.quantity } : i
                );
            }
            toast.success(`${item.title} added to your bag.`);
            return [...prev, item];
        });
    };

    const removeFromCart = (id: string) => {
        setCart((prev) => prev.filter((i) => i.id !== id));
        toast.info("Item removed from your bag.");
    };

    const updateQuantity = (id: string, quantity: number) => {
        if (quantity < 1) return;
        setCart((prev) =>
            prev.map((i) => (i.id === id ? { ...i, quantity } : i))
        );
    };

    const clearCart = () => {
        setCart([]);
        localStorage.removeItem("charmora-cart");
    };

    const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
    const totalPrice = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

    return (
        <CartContext.Provider
            value={{
                cart,
                addToCart,
                removeFromCart,
                updateQuantity,
                clearCart,
                totalItems,
                totalPrice,
            }}
        >
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error("useCart must be used within a CartProvider");
    }
    return context;
}

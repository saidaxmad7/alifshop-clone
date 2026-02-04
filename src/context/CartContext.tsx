"use client";

import { createContext, ReactNode, useEffect, useState } from "react";

export interface CartItem {
    id: number | string;
    price: number;
    qty: number;
    title: string;
    discountPrice?: number;
    seller?: string;
    images?: string[];
    discount?: number;
    description?: string;
}

export interface CartContextType {
    cart: CartItem[];
    addCart: (item: CartItem) => void;
    updateItem: (id: number | string, qty: number) => void;
    deleteItem: (id: number | string) => void;
    incrementItem: (id: number | string) => void;
    decrementItem: (id: number | string) => void;
    getTotalSum: () => number;
    clear: () => void;
}

export const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
    const [cart, setCart] = useState<CartItem[]>(() => {
        if (typeof window === "undefined") return [];
        const stored = localStorage.getItem("cart");
        return stored ? JSON.parse(stored) : [];
    });

    useEffect(() => {
        if (typeof window === "undefined") return;
        localStorage.setItem("cart", JSON.stringify(cart));
    }, [cart]);

    const addCart = (item: CartItem) => {
        setCart((prev) =>
            prev.some((i) => i.id === item.id)
                ? prev.map((i) =>
                      i.id === item.id ? { ...i, qty: i.qty + 1 } : i,
                  )
                : [...prev, { ...item, qty: 1 }],
        );
    };

    const updateItem = (id: number | string, qty: number) => {
        setCart((prev) => prev.map((i) => (i.id === id ? { ...i, qty } : i)));
    };

    const deleteItem = (id: number | string) => {
        setCart((prev) => prev.filter((i) => i.id !== id));
    };

    const incrementItem = (id: number | string) => {
        setCart((prev) =>
            prev.map((i) => (i.id === id ? { ...i, qty: i.qty + 1 } : i)),
        );
    };

    const decrementItem = (id: number | string) => {
        setCart((prev) =>
            prev.map((i) =>
                i.id === id && i.qty > 1 ? { ...i, qty: i.qty - 1 } : i,
            ),
        );
    };

    const getTotalSum = () =>
        cart.reduce((sum, i) => sum + i.qty * (i.discountPrice ?? i.price), 0);

    const clear = () => setCart([]);

    return (
        <CartContext.Provider
            value={{
                cart,
                addCart,
                updateItem,
                deleteItem,
                incrementItem,
                decrementItem,
                getTotalSum,
                clear,
            }}
        >
            {children}
        </CartContext.Provider>
    );
}

"use client";

import { useState, createContext, ReactNode, useEffect } from "react";

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

export const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
    const [cart, setCart] = useState<CartItem[]>([]);

    useEffect(() => {
        const stored = localStorage.getItem("cart");
        if (stored) setCart(JSON.parse(stored));
    }, []);

    const save = (updater: (prev: CartItem[]) => CartItem[]) => {
        setCart(prev => {
            const updated = updater(prev);
            localStorage.setItem("cart", JSON.stringify(updated));
            return updated;
        });
    };

    const addCart = (item: CartItem) => {
        save(prev =>
            prev.some(i => i.id === item.id)
                ? prev.map(i =>
                      i.id === item.id ? { ...i, qty: i.qty + 1 } : i
                  )
                : [...prev, { ...item, qty: 1 }]
        );
    };

    const updateItem = (id: number | string, qty: number) => {
        save(prev => prev.map(i => (i.id === id ? { ...i, qty } : i)));
    };

    const deleteItem = (id: number | string) => {
        save(prev => prev.filter(i => i.id !== id));
    };

    const incrementItem = (id: number | string) => {
        save(prev =>
            prev.map(i => (i.id === id ? { ...i, qty: i.qty + 1 } : i))
        );
    };

    const decrementItem = (id: number | string) => {
        save(prev =>
            prev.map(i =>
                i.id === id && i.qty > 1 ? { ...i, qty: i.qty - 1 } : i
            )
        );
    };

    const getTotalSum = () =>
        cart.reduce(
            (sum, i) => sum + i.qty * (i.discountPrice ?? i.price),
            0
        );

    const clear = () => save(() => []);

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
                clear
            }}
        >
            {children}
        </CartContext.Provider>
    );
}

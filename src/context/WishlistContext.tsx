"use client";

import { createContext, useContext, useState, ReactNode } from "react";

export interface WishlistItem {
    id: number | string;
    title?: string;
    price?: number;
    discountPrice?: number;
    is_sale?: boolean;
    images?: string[];
}

interface WishlistContextType {
    items: WishlistItem[];
    add: (item: WishlistItem) => void;
    remove: (id: number | string) => void;
    toggle: (item: WishlistItem) => void;
    has: (id: number | string) => boolean;
}

const WishlistContext = createContext<WishlistContextType | undefined>(
    undefined,
);

export const WishlistProvider = ({ children }: { children: ReactNode }) => {
    const [items, setItems] = useState<WishlistItem[]>(() => {
        if (typeof window === "undefined") return [];
        try {
            const raw = localStorage.getItem("wishlist");
            return raw ? (JSON.parse(raw) as WishlistItem[]) : [];
        } catch {
            return [];
        }
    });

    const persist = (next: WishlistItem[]) => {
        setItems(next);
        if (typeof window === "undefined") return;
        localStorage.setItem("wishlist", JSON.stringify(next));
    };

    const add = (item: WishlistItem) => {
        if (!items.some((i) => i.id === item.id)) {
            persist([...items, item]);
        }
    };

    const remove = (id: number | string) => {
        persist(items.filter((i) => i.id !== id));
    };

    const toggle = (item: WishlistItem) => {
        items.some((i) => i.id === item.id) ? remove(item.id) : add(item);
    };

    const has = (id: number | string) => items.some((i) => i.id === id);

    return (
        <WishlistContext.Provider value={{ items, add, remove, toggle, has }}>
            {children}
        </WishlistContext.Provider>
    );
};

export const useWishlist = () => {
    const ctx = useContext(WishlistContext);
    if (!ctx) {
        throw new Error("useWishlist must be used within WishlistProvider");
    }
    return ctx;
};

export default WishlistContext;

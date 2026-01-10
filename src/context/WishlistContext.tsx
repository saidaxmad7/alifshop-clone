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
    // relaxed to allow calling with product-shaped objects
    toggle: (item: any) => void;
    has: (id: number | string) => boolean;
}

const WishlistContext = createContext<WishlistContextType | undefined>(
    undefined
);

export const WishlistProvider = ({ children }: { children: ReactNode }) => {
    const [items, setItems] = useState<WishlistItem[]>(() => {
        try {
            const raw = localStorage.getItem("wishlist");
            return raw ? JSON.parse(raw) : [];
        } catch (e) {
            console.error(e);
            return [];
        }
    });

    const persist = (next: WishlistItem[]) => {
        setItems(next);
        try {
            localStorage.setItem("wishlist", JSON.stringify(next));
        } catch (e) {
            console.error(e);
        }
    };

    const add = (item: WishlistItem) => {
        if (!items.find((i) => i.id === item.id)) {
            persist([...items, item]);
        }
    };

    const remove = (id: number | string) => {
        persist(items.filter((i) => i.id !== id));
    };

    const toggle = (item: WishlistItem) => {
        if (items.find((i) => i.id === item.id)) remove(item.id);
        else add(item);
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
    if (!ctx)
        throw new Error("useWishlist must be used within WishlistProvider");
    return ctx;
};

export default WishlistContext;

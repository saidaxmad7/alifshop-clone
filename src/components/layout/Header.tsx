"use client";

import React, { useState, useContext, useMemo } from "react";
import Link from "next/link";
import { Button, Space } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import CartIcon from "@/assets/icons/CartIcon";
import LikeIcon from "@/assets/icons/LikeIcon";
import HomeIcon from "@/assets/icons/HomeIcon";
import CategoryIcon from "@/assets/icons/CategoryIcon";
import SearchIcon from "@/assets/icons/SearchIcon";
import { useDrawer } from "@/context/DrawerContext";
import { CartContext } from "@/context/CartContext";
import { useQuery } from "@tanstack/react-query";
import { Axios } from "@/lib/api";
import { urls } from "@/constants/urls";
import { Category, Product } from "@/types/Intefaces";
import AkkIcon from "@/assets/icons/AkkIcon";
import CategoryDrawer from "../header/CategoryDrawer";
import SearchDropdown from "../header/SearchDropdown";
import UserMenu from "../header/UserMenu";

const Header: React.FC = () => {
    const { open, toggleDrawer, closeDrawer } = useDrawer();
    const cartCtx = useContext(CartContext);
    const [query, setQuery] = useState("");

    const { data: categories = [] } = useQuery<Category[]>({
        queryKey: ["categories"],
        queryFn: () => Axios.get(urls.categories.getList).then(res => res.data),
    });

    const { data: products = [] } = useQuery<Product[]>({
        queryKey: ["products"],
        queryFn: () => Axios.get(urls.products.getList).then(res => res.data),
    });

    const filteredProducts = useMemo(() => {
        if (!query) return [];
        const q = query.toLowerCase();
        return products.filter(p => p.name.toLowerCase().includes(q));
    }, [products, query]);

    const totalCount = cartCtx ? new Set(cartCtx.cart.map(item => item.id)).size : 0;

    return (
        <header className="header">
            <div className="container">
                <div className="header-row">
                    <div className="header-col">
                        <h1 className="header-title">
                            <Link href="/">alif-shop</Link>
                        </h1>
                    </div>

                    <Space>
                        <Button className="header-categories-button" onClick={toggleDrawer}>
                            {open ? <CloseOutlined /> : <CategoryIcon />}
                            <span>Tovarlar Katalogi</span>
                        </Button>
                    </Space>

                    <CategoryDrawer open={open} onClose={closeDrawer} categories={categories} />

                    <div className="header-search">
                        <input
                            type="text"
                            placeholder="Tovarlarni izlash"
                            value={query}
                            onChange={e => setQuery(e.target.value)}
                        />
                        <button type="button"><SearchIcon /></button>
                        <SearchDropdown query={query} products={filteredProducts} onSelect={() => setQuery("")} />
                    </div>

                    <Link href="/cart">
                        <button className="header-btn header-cart">
                            <CartIcon /> Savat {totalCount > 0 && <span className="cart-badge">{totalCount}</span>}
                        </button>
                    </Link>

                    <Link href="/wishlist">
                        <button className="header-btn header-like"><LikeIcon /> Saralanganlar</button>
                    </Link>

                    <UserMenu />

                    <div className="header-langs">
                        <button className="header-lang">РУС /</button>
                        <button className="header-lang active">UZB</button>
                    </div>
                </div>

                <div className="header-mobile">
                    <div className="header-mobile-search">
                        <input type="text" placeholder="Tovarlarni izlash" />
                        <button type="submit"><SearchIcon /></button>
                    </div>
                </div>
            </div>

            <nav className="header-mobile-nav">
                <button className="header-btn"><HomeIcon /> Asosiy</button>
                <button className="header-btn"><CategoryIcon /> Katalog</button>
                <button className="header-btn header-cart"><CartIcon /> Savat {totalCount > 0 && <span className="cart-badge">{totalCount}</span>}</button>
                <button className="header-btn"><AkkIcon /> Profil</button>
            </nav>
        </header>
    );
};

export default Header;

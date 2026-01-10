"use client";
import { useEffect, useState, useContext } from "react";
import Link from "next/link";
import { AxiosResponse } from "axios";
import { Axios } from "@/lib/api";
// icons handled in ProductCard
import { urls } from "@/constants/urls";
import { CartContext, CartItem } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { message } from "antd";

import CartIcon from "@/assets/icons/CartIcon";
import MinusIcon from "@/assets/icons/MinusIcon";
import PlusIcon from "@/assets/icons/PlusIcon";
import type { Product } from "@/types/Intefaces";

function Interesting() {
    const [products, setProducts] = useState<Product[]>([]);

    const cartContext = useContext(CartContext);
    if (!cartContext) {
        throw new Error("CartContext must be used within a CartProvider");
    }
    const { cart, addCart, incrementItem, decrementItem } = cartContext;
    const { toggle: toggleWishlist, has: hasWishlist } = useWishlist();

    useEffect(() => {
        Axios.get<Product[]>(urls.products.intProductList)
            .then((res: AxiosResponse<Product[]>) => {
                if (res.status === 200) {
                    setProducts(res.data);
                } else {
                    console.error(`Unexpected response status: ${res.status}`);
                }
            })
            .catch((err: unknown) => {
                console.error(err, "Error in fetch categories 🫤");
            });
    }, []);

    const [messageApi, contextHolder] = message.useMessage();
    const success = () =>
        messageApi.open({
            type: "success",
            content: "Tovar savatda",
            duration: 3,
        });

    const handleAdd = (item: CartItem) => {
        addCart(item);
        success();
    };

    const handleIncrement = (id: number | string) => {
        incrementItem(id);
    };

    const handleDecrement = (id: number | string) => {
        decrementItem(id);
    };

    return (
        <section className='interesting discount'>
            <div className='container'>
                <h1 className='discount-title'>Sizni qiziqtirishi mumkin</h1>
                <div className='discount-items interesting-items'>
                    {products.map((item) => {
                        const cartItem = cart.find((c) => c.id === item.id);
                        const inCart = !!cartItem;
                        const original = Number(item.price) || 0;
                        const discount =
                            item.discountPrice != null
                                ? Number(item.discountPrice)
                                : original;
                        const isSaleEffective = discount < original;
                        const display = isSaleEffective ? discount : original;

                        return (
                            <div
                                className={`discount-card interesting-card`}
                                key={String(item.id)}
                            >
                                <div className={`discount-image`}>
                                    {item.images && item.images.length > 0 && (
                                        <Link href={`/product/${item.id}`}>
                                            <img
                                                src={item.images[0]}
                                                alt={item.title}
                                                loading='lazy'
                                            />
                                        </Link>
                                    )}
                                    {typeof item.discount === "number" && (
                                        <p className='discount-discount'>
                                            -{item.discount}%
                                        </p>
                                    )}
                                    <button
                                        className={`discount-like ${
                                            hasWishlist && hasWishlist(item.id)
                                                ? "active"
                                                : ""
                                        }`}
                                        onClick={() =>
                                            toggleWishlist &&
                                            toggleWishlist(item)
                                        }
                                    ></button>
                                </div>

                                <Link
                                    href={`/product/${item.id}`}
                                    className='discount-text-link'
                                >
                                    <div className='discount-text'>
                                        {item.title}
                                    </div>
                                </Link>

                                <div className='discount-meta-vertical'>
                                    <div className='discount-prices-vertical'>
                                        <p className='discount-price'>
                                            {display.toLocaleString()} so'm
                                        </p>
                                        {isSaleEffective && original > 0 && (
                                            <p className='discount-discount-price'>
                                                <del>
                                                    {original.toLocaleString()}{" "}
                                                    so'm
                                                </del>
                                            </p>
                                        )}
                                    </div>

                                    <div className='discount-actions-vertical'>
                                        {!inCart ? (
                                            <button
                                                className='discount-addcart'
                                                onClick={() =>
                                                    handleAdd({
                                                        id: item.id,
                                                        title: item.title ?? "",
                                                        price: item.price ?? 0,
                                                        qty: 1,
                                                        discountPrice:
                                                            item.discountPrice,
                                                        images: item.images,
                                                    })
                                                }
                                            >
                                                <CartIcon /> Savatga
                                            </button>
                                        ) : (
                                            <div className='discount-qty-controls'>
                                                <button
                                                    onClick={() =>
                                                        handleDecrement(item.id)
                                                    }
                                                >
                                                    <MinusIcon />
                                                </button>
                                                <span>
                                                    {cartItem?.qty ?? 1}
                                                </span>
                                                <button
                                                    onClick={() =>
                                                        handleIncrement(item.id)
                                                    }
                                                >
                                                    <PlusIcon />
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
                {contextHolder}
                {products.length > 14 && (
                    <div className='interesting-btns'>
                        <button className='interesting-button'>
                            Ko'proq ko'rsatish
                        </button>
                    </div>
                )}
            </div>
        </section>
    );
}

export default Interesting;

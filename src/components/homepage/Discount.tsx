"use client";
import { useState, useEffect, useContext } from "react";
import { Axios } from "@/lib/api";
import { AxiosResponse } from "axios";
import RightIcon from "@/assets/icons/RightIcon";
import { CartContext, CartItem } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { urls } from "@/constants/urls";
import { message } from "antd";



import CartIcon from "@/assets/icons/CartIcon";
import MinusIcon from "@/assets/icons/MinusIcon";
import PlusIcon from "@/assets/icons/PlusIcon";
import type { Product } from "@/types/Intefaces";

function Discount() {
    const [products, setProducts] = useState<Product[]>([]);
    const [addedIds, setAddedIds] = useState<Array<number | string>>([]);

    const cartContext = useContext(CartContext);
    if (!cartContext)
        throw new Error("CartContext must be used within a CartProvider");

    const { cart, addCart, incrementItem, decrementItem } = cartContext;
    const { toggle: toggleWishlist, has: hasWishlist } = useWishlist();

    const [messageApi, contextHolder] = message.useMessage();
    const success = () =>
        messageApi.open({
            type: "success",
            content: "Tovar savatda",
            duration: 3,
        });

    useEffect(() => {
        setAddedIds(cart.map((item) => item.id));
    }, [cart]);

    const handleAdd = (item: CartItem) => {
        addCart(item);
        success();
    };

    useEffect(() => {
        let mounted = true;
        Axios.get<Product[]>(urls.products.saleProductList)
            .then((res: AxiosResponse<Product[]>) => {
                if (!mounted) return;
                if (res.status === 200) setProducts(res.data);
                else console.error(`Unexpected response status: ${res.status}`);
            })
            .catch((err: Error) =>
                console.error(err, "Error in fetch sale products")
            );
        return () => {
            mounted = false;
        };
    }, []);

    return (
        <section className='discount'>
            <div className='container'>
                <div className='discount-row'>
                    <h1 className='discount-title'>Chegirmalar</h1>
                    <button className='discount-button'>
                        Barchasini ko'rish
                        <RightIcon />
                    </button>
                </div>

                {contextHolder}

                <div className='discount-items'>
                    {products.map((item) => {
                        const inCart = addedIds.includes(item.id);
                        const cartItem = cart.find((ci) => ci.id === item.id);

                        return (
                            <div
                                className={`discount-card`}
                                key={String(item.id)}
                            >
                                <div className={`discount-image`}>
                                    {item.images && item.images.length > 0 && (
                                        <a href={`/product/${item.id}`}>
                                            <img
                                                src={item.images[0]}
                                                alt={item.title}
                                                loading='lazy'
                                            />
                                        </a>
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
                                    >
                                        {/* Like icon */}
                                    </button>
                                </div>

                                <a
                                    href={`/product/${item.id}`}
                                    className='discount-text-link'
                                >
                                    <div className='discount-text'>
                                        {item.title}
                                    </div>
                                </a>

                                <div className='discount-meta-vertical'>
                                    <div className='discount-prices-vertical'>
                                        <p className='discount-price'>
                                            {(
                                                item.discountPrice ?? item.price
                                            ).toLocaleString()}{" "}
                                            so'm
                                        </p>
                                        {item.is_sale &&
                                            item.price !== undefined && (
                                                <p className='discount-discount-price'>
                                                    {item.price.toLocaleString()}{" "}
                                                    so'm
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
                                                        decrementItem(item.id)
                                                    }
                                                >
                                                    <MinusIcon />
                                                </button>
                                                <span>
                                                    {cartItem?.qty ?? 1}
                                                </span>
                                                <button
                                                    onClick={() =>
                                                        incrementItem(item.id)
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
            </div>
        </section>
    );
}

export default Discount;

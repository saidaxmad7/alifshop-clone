"use client";
import React from "react";
import Link from "next/link";
import CartIcon from "@/assets/icons/CartIcon";
import LikeIcon from "@/assets/icons/LikeIcon";
import PlusIcon from "@/assets/icons/PlusIcon";
import MinusIcon from "@/assets/icons/MinusIcon";

import { CartItem } from "@/context/CartContext";

type Product = {
    id: number | string;
    title?: string;
    images?: string[];
    price?: number;
    discountPrice?: number;
    is_sale?: boolean;
    discount?: number;
};

interface Props {
    product: Product;
    inCart?: boolean;
    cartQty?: number;
    onAdd: (p: CartItem) => void;
    onIncrement?: (id: number | string) => void;
    onDecrement?: (id: number | string) => void;
    hasWishlist?: (id: number | string) => boolean;
    onToggleWishlist?: (item: unknown) => void;
    className?: string;
    showMonthly?: boolean;
}

const TruncateText: React.FC<{
    text: string;
    maxLines: number;
    fontSize: number;
    className?: string;
}> = ({ text, maxLines, fontSize, className }) => {
    const containerRef = React.useRef<HTMLDivElement>(null);

    React.useEffect(() => {
        const container = containerRef.current;
        if (container) {
            const lineHeight = fontSize * 1.2;
            container.style.lineHeight = `${lineHeight}px`;
            container.style.display = "-webkit-box";
            container.style.overflow = "hidden";
            container.style.textOverflow = "ellipsis";
            const s = container.style as CSSStyleDeclaration & {
                WebkitLineClamp?: string;
                WebkitBoxOrient?: string;
            };
            s.WebkitLineClamp = `${maxLines}`;
            s.WebkitBoxOrient = "vertical";
        }
    }, [text, maxLines, fontSize]);

    return (
        <div
            ref={containerRef}
            className={className}
            style={{ fontSize: `${fontSize}px` }}
        >
            {text}
        </div>
    );
};

export default function ProductCard({
    product,
    inCart,
    cartQty,
    onAdd,
    onIncrement,
    onDecrement,
    hasWishlist,
    onToggleWishlist,
    className,
    showMonthly = true,
}: Props) {
    const display =
        (product.is_sale
            ? product.discountPrice ?? product.price
            : product.price) ?? 0;
    const monthly = Math.ceil(display / 12);

    return (
        <div
            className={`discount-card ${className ?? ""}`}
            key={String(product.id)}
        >
            <div className={`discount-image`}>
                {product.images && product.images.length > 0 && (
                    <Link href={`/product/${product.id}`}>
                        <img
                            src={product.images[0]}
                            alt={product.title}
                            style={{ cursor: "pointer" }}
                            loading='lazy'
                        />
                    </Link>
                )}
                {typeof product.discount === "number" && (
                    <p className='discount-discount'>-{product.discount}%</p>
                )}
                <button
                    className={`discount-like ${
                        hasWishlist && hasWishlist(product.id) ? "active" : ""
                    }`}
                    onClick={() =>
                        onToggleWishlist && onToggleWishlist(product)
                    }
                >
                    <LikeIcon />
                </button>
            </div>

            <Link href={`/product/${product.id}`} className='discount-text-link'>
                <TruncateText
                    text={product.title ?? ""}
                    maxLines={2}
                    fontSize={12}
                    className='discount-text'
                />
            </Link>

            <div className='discount-meta-vertical'>
                <div className='discount-prices-vertical'>
                    {showMonthly && (
                        <span className='discount-pill'>{`dan ${monthly.toLocaleString()} so'm/oyga`}</span>
                    )}
                    <p className='discount-price'>
                        {display.toLocaleString()} so'm
                    </p>
                    {product.is_sale && product.price !== undefined && (
                        <p className='discount-discount-price'>
                            {product.price.toLocaleString()} so'm
                        </p>
                    )}
                </div>

                <div className='discount-actions-vertical'>
                    {!inCart ? (
                        <button
                            className='discount-addcart'
                            onClick={() =>
                                onAdd({
                                    id: product.id,
                                    title: product.title ?? "",
                                    price: product.price ?? 0,
                                    qty: 1,
                                    discountPrice: product.discountPrice,
                                    images: product.images,
                                })
                            }
                        >
                            <CartIcon /> Savatga
                        </button>
                    ) : (
                        <div className='discount-qty-controls'>
                            <button
                                onClick={() =>
                                    onDecrement && onDecrement(product.id)
                                }
                            >
                                <MinusIcon />
                            </button>
                            <span>{cartQty ?? 1}</span>
                            <button
                                onClick={() =>
                                    onIncrement && onIncrement(product.id)
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
}

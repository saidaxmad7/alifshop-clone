"use client";

import { useEffect, useState, useContext } from "react";
import { useParams } from "next/navigation";
import { Axios } from "@/lib/api";
import { urls } from "@/constants/urls";
import Loading from "@/components/loading/Loading";
import Interesting from "@/components/homepage/Interesting";
import CartIcon from "@/assets/icons/CartIcon";
import LikeIcon from "@/assets/icons/LikeIcon";
import PlusIcon from "@/assets/icons/PlusIcon";
import MinusIcon from "@/assets/icons/MinusIcon";
import { CartContext } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import type { Product } from "@/types/Intefaces";

export default function ProductDetailPage() {
    const params = useParams<{ id: string }>();
    const id = params?.id;

    const [product, setProduct] = useState<Product | null>(null);
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [selectedColor, setSelectedColor] = useState<number | null>(null);
    const [selectedMemory, setSelectedMemory] = useState<string | null>(null);
    const [selectedTerm, setSelectedTerm] = useState<number>(24);

    const cartCtx = useContext(CartContext);
    const { has, toggle } = useWishlist();

    useEffect(() => {
        if (!id) return;
        Axios.get(urls.products.getOne(id))
            .then((res) => {
                if (res.status === 200) {
                    setProduct(res.data);
                    if (res.data.images?.length)
                        setSelectedImage(res.data.images[0]);
                    if (res.data.colors?.length)
                        setSelectedColor(res.data.colors[0].id);
                    if (res.data.memories?.length)
                        setSelectedMemory(res.data.memories[0]);
                }
            })
            .catch((err: Error) =>
                console.error(err, "Error fetching product")
            );
    }, [id]);

    if (!product) {
        return (
            <section className='product-detail'>
                <div className='container'>
                    <Loading />
                </div>
            </section>
        );
    }

    const cartItem = cartCtx?.cart.find(
        (c) => String(c.id) === String(product.id)
    );
    const inCart = !!cartItem;

    return (
        <section className='product-detail'>
            <div className='container'>
                <div className='product-detail-row'>
                    <div className='product-gallery'>
                        <div className='product-thumbs'>
                            {product.images?.map((img, idx) => (
                                <img
                                    key={idx}
                                    src={img}
                                    alt={`thumb-${idx}`}
                                    loading='lazy'
                                    className={
                                        selectedImage === img ? "active" : ""
                                    }
                                    onClick={() => setSelectedImage(img)}
                                />
                            ))}
                        </div>

                        <div className='product-main'>
                            {selectedImage ? (
                                <img
                                    className='main-image'
                                    src={selectedImage}
                                    alt={product.title}
                                    loading='lazy'
                                />
                            ) : (
                                <div className='main-image'>No image</div>
                            )}
                        </div>
                    </div>

                    <div className='product-info'>
                        <div className='product-badges'>
                            <span className='badge positive'>
                                1 yil kafolat
                            </span>
                            <span className='badge'>IMEI</span>
                            <span className='badge'>
                                -{product.discount ?? 0}%
                            </span>
                        </div>

                        <h2 className='product-title'>{product.title}</h2>

                        {(() => {
                            const display = product.is_sale
                                ? product.discountPrice ?? product.price
                                : product.price ?? 0;
                            const monthly = Math.ceil(display / selectedTerm);
                            const terms = [3, 6, 12, 18, 24];

                            return (
                                <div className='product-installment'>
                                    <div className='installment-label'>
                                        Muddati tolovga sotib olish
                                    </div>
                                    <div className='installment-amount'>
                                        <span>{monthly.toLocaleString()}</span>
                                        <small> som/oyiga</small>
                                    </div>

                                    <div className='installment-terms'>
                                        {terms.map((t) => (
                                            <button
                                                key={t}
                                                type='button'
                                                className={`term-item ${
                                                    selectedTerm === t
                                                        ? "active"
                                                        : ""
                                                }`}
                                                onClick={() =>
                                                    setSelectedTerm(t)
                                                }
                                            >
                                                {selectedTerm === t
                                                    ? `${t} oyga`
                                                    : `${t}`}
                                            </button>
                                        ))}
                                    </div>

                                    <div className='product-price-row'>
                                        <div className='price'>
                                            {display.toLocaleString()} som
                                        </div>
                                        {product.is_sale &&
                                            product.price !== undefined && (
                                                <div className='old-price'>
                                                    {product.price.toLocaleString()}{" "}
                                                    som
                                                </div>
                                            )}
                                    </div>
                                </div>
                            );
                        })()}

                        <div className='product-variants'>
                            {product.colors && (
                                <div className='product-colors'>
                                    <div className='variant-title'>Rang</div>
                                    <div className='colors-list'>
                                        {product.colors.map((c) => (
                                            <button
                                                key={c.id}
                                                className={`color-swatch ${
                                                    selectedColor === c.id
                                                        ? "active"
                                                        : ""
                                                }`}
                                                onClick={() =>
                                                    setSelectedColor(c.id)
                                                }
                                            >
                                                <img
                                                    src={c.img ?? ""}
                                                    alt={`color-${c.id}`}
                                                />
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {product.memories && (
                                <div className='product-memories'>
                                    <div className='variant-title'>Olcham</div>
                                    <div className='memory-list'>
                                        {product.memories.map((m) => (
                                            <button
                                                key={m}
                                                className={`memory-item ${
                                                    selectedMemory === m
                                                        ? "active"
                                                        : ""
                                                }`}
                                                onClick={() =>
                                                    setSelectedMemory(m)
                                                }
                                            >
                                                {m}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className='product-actions'>
                            {!inCart ? (
                                <button
                                    className='discount-addcart'
                                    onClick={() => {
                                        if (!cartCtx) return;
                                        cartCtx.addCart({
                                            id: String(product.id),
                                            title: product.title ?? "",
                                            price: product.price ?? 0,
                                            discountPrice:
                                                product.discountPrice ??
                                                product.price ??
                                                0,
                                            images: product.images ?? [],
                                            qty: 1,
                                        });
                                    }}
                                >
                                    <CartIcon /> Savatga
                                </button>
                            ) : (
                                <div className='discount-qty-controls'>
                                    <button
                                        onClick={() =>
                                            cartCtx?.decrementItem(
                                                String(product.id)
                                            )
                                        }
                                    >
                                        <MinusIcon />
                                    </button>
                                    <span>{cartItem?.qty ?? 1}</span>
                                    <button
                                        onClick={() =>
                                            cartCtx?.incrementItem(
                                                String(product.id)
                                            )
                                        }
                                    >
                                        <PlusIcon />
                                    </button>
                                </div>
                            )}

                            <button
                                className={`discount-like ${
                                    has(product.id) ? "active" : ""
                                }`}
                                onClick={() =>
                                    toggle({
                                        id: product.id,
                                        title: product.title,
                                        images: product.images,
                                        price: product.price,
                                        discountPrice: product.discountPrice,
                                        is_sale: product.is_sale,
                                    })
                                }
                            >
                                <LikeIcon />
                            </button>
                        </div>
                    </div>
                </div>

                <div
                    style={{
                        marginTop: "80px",
                        borderTop: "1px solid #798998",
                    }}
                >
                    <Interesting />
                </div>

                {product.describtion && (
                    <div className='product-detail-describtion'>
                        <h1 className='product-detail-describtion-title'>
                            Tavsifi
                        </h1>
                        <p className='product-detail-describtion-subtitle'>
                            {product.describtion}
                        </p>
                    </div>
                )}
                {product.featur?.length > 0 && (
                    <div className='product-detail-describtion'>
                        <h1 className='product-detail-describtion-title'>
                            Xususiyatlari
                        </h1>
                        {product.featur.map((item, index) => (
                            <p
                                className='product-detail-describtion-subtitle'
                                key={index}
                            >
                                {item}
                            </p>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
}

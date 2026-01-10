"use client";

import { useWishlist, WishlistItem } from "@/context/WishlistContext";
import { message } from "antd";
import Link from "next/link";
import CartIcon from "@/assets/icons/CartIcon";
import PlusIcon from "@/assets/icons/PlusIcon";
import MinusIcon from "@/assets/icons/MinusIcon";
import { useContext } from "react";
import { CartContext } from "@/context/CartContext";

export default function Wishlist() {
  const { items, toggle, has } = useWishlist();
  const cartCtx = useContext(CartContext);
  const [messageApi, contextHolder] = message.useMessage();

  const success = () =>
    messageApi.open({
      type: "success",
      content: "Tovar savatda",
      duration: 3,
    });

  const handleAddToCart = (item: WishlistItem) => {
    if (!cartCtx) return;
    cartCtx.addCart({
      id: String(item.id),
      title: item.title ?? "",
      price: item.price ?? 0,
      discountPrice: item.discountPrice ?? item.price ?? 0,
      images: item.images ?? [],
      qty: 1,
    });
    success();
  };

  if (!items || items.length === 0) {
    return (
      <section className="wishlist">
        <div className="container">
          <div className="wishlist-none">
            <h1 className="wishlist-title">
              Saralangan mahsulotlar royxati xozircha bosh
            </h1>
            <p className="wishlist-text">
              uzoq vaqt qidirmaslik uchun ozingizga yoqqan tovarlarni saqlang
            </p>
            <Link href="/catalog" className="wishlist-button">
              Katalogga otish
            </Link>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="wishlist">
      {contextHolder}
      <div className="container">
        <h1 className="wishlist-page-title">Saralanganlar</h1>

        <div className="discount-items wishlist-items">
          {items.map((item) => {
            const inCart = cartCtx?.cart.some((c) => String(c.id) === String(item.id));
            const cartItem = cartCtx?.cart.find((c) => String(c.id) === String(item.id));

            const displayPrice =
              (item.is_sale ? item.discountPrice ?? item.price : item.price) ?? 0;

            return (
              <div className="discount-card wishlist-card" key={item.id}>
                <div className="discount-image">
                  {item.images && item.images.length > 0 ? (
                    <Link href={`/product/${item.id}`}>
                      <img src={item.images[0]} alt={item.title} loading="lazy" />
                    </Link>
                  ) : (
                    <div className="empty-image" />
                  )}

                  <button
                    className={`discount-like ${has(item.id) ? "active" : ""}`}
                    onClick={() => toggle(item)}
                    aria-label="toggle-wishlist"
                  ></button>
                </div>

                <Link href={`/product/${item.id}`} className="discount-text-link">
                  <div className="discount-text">{item.title}</div>
                </Link>

                <p className="discount-price">{displayPrice.toLocaleString()} so'm</p>
                {item.is_sale && item.price !== undefined && (
                  <p className="discount-discount-price">{item.price.toLocaleString()} so'm</p>
                )}

                <div className="wishlist-actions">
                  {inCart ? (
                    <div className="discount-qty-controls">
                      <button onClick={() => cartCtx?.decrementItem(String(item.id))}>
                        <MinusIcon />
                      </button>
                      <span>{cartItem?.qty ?? 1}</span>
                      <button onClick={() => cartCtx?.incrementItem(String(item.id))}>
                        <PlusIcon />
                      </button>
                    </div>
                  ) : (
                    <button className="discount-addcart" onClick={() => handleAddToCart(item)}>
                      <CartIcon /> Savatga
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

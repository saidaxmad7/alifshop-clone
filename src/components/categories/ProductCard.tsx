"use client";

import React, { useContext } from "react";
import CartIcon from "@/assets/icons/CartIcon";
import MinusIcon from "@/assets/icons/MinusIcon";
import PlusIcon from "@/assets/icons/PlusIcon";
import { CartContext, CartItem } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import type { Product } from "@/types/Intefaces";
import LikeIcon from "@/assets/icons/LikeIcon";

interface Props {
  item: Product;
  inCart: boolean;
  cartItem?: CartItem;
}

const ProductCard: React.FC<Props> = ({ item, inCart, cartItem }) => {
  const cartContext = useContext(CartContext)!;
  const { addCart, incrementItem, decrementItem } = cartContext;
  const { toggle: toggleWishlist, has: hasWishlist } = useWishlist();

  const handleAdd = () => {
    addCart({
      id: item.id,
      title: item.title ?? "",
      price: item.price ?? 0,
      qty: 1,
      discountPrice: item.discountPrice,
      images: item.images,
    });
  };

  return (
    <div className="discount-card">
      <div className="discount-image">
        {item.images && item.images.length > 0 && (
          <a href={`/product/${item.id}`}>
            <img src={item.images[0]} alt={item.title} loading="lazy" />
          </a>
        )}
        {typeof item.discount === "number" && (
          <p className="discount-discount">-{item.discount}%</p>
        )}
        <button
          className={`discount-like ${hasWishlist && hasWishlist(item.id) ? "active" : ""}`}
          onClick={() => toggleWishlist && toggleWishlist(item)}
        >
          <LikeIcon />
        </button>
      </div>

      <a href={`/product/${item.id}`} className="discount-text-link">
        <div className="discount-text">{item.title}</div>
      </a>

      <div className="discount-meta-vertical">
        <div className="discount-prices-vertical">
          <p className="discount-price">{(item.discountPrice ?? item.price)?.toLocaleString()} so'm</p>
          {item.is_sale && item.price !== undefined && (
            <p className="discount-discount-price">{item.price.toLocaleString()} so'm</p>
          )}
        </div>

        <div className="discount-actions-vertical">
          {!inCart ? (
            <button className="discount-addcart" onClick={handleAdd}>
              <CartIcon /> Savatga
            </button>
          ) : (
            <div className="discount-qty-controls">
              <button onClick={() => decrementItem(item.id)}>
                <MinusIcon />
              </button>
              <span>{cartItem?.qty ?? 1}</span>
              <button onClick={() => incrementItem(item.id)}>
                <PlusIcon />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;

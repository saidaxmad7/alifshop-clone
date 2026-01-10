"use client";

import { useContext, useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { CartContext } from "@/context/CartContext";
import DeleteIcon from "@/assets/icons/DeleteIcon";
import CartItem, { CartItemType } from "@/components/cart/CartItem";
import Interesting from "@/components/homepage/Interesting";

const CartPage: React.FC = () => {
    const router = useRouter();
    const cartContext = useContext(CartContext);

    const [selectedIds, setSelectedIds] = useState<Set<number | string>>(
        new Set()
    );
    const [isLoggedIn, setIsLoggedIn] = useState(true);

    if (!cartContext)
        throw new Error("CartContext must be used within a CartProvider");

    const { cart, decrementItem, incrementItem, deleteItem } = cartContext;
    useEffect(() => {
        setSelectedIds(new Set(cart.map((i) => i.id)));
    }, [cart]);

    const isAllSelected = cart.length > 0 && selectedIds.size === cart.length;

    const handleToggleAll = (checked: boolean) => {
        if (checked) setSelectedIds(new Set(cart.map((i) => i.id)));
        else setSelectedIds(new Set());
    };

    const handleToggleOne = (id: number | string, checked: boolean) => {
        const next = new Set(selectedIds);
        if (checked) next.add(id);
        else next.delete(id);
        setSelectedIds(next);
    };

    const deleteSelected = () => {
        selectedIds.forEach((id) => deleteItem(id));
    };

    const handleCheckout = () => {
        if (selectedIds.size === 0) return;
        router.push(isLoggedIn ? "/checkout" : "/login");
    };

    const totalSum = cart.reduce(
        (total, item) =>
            selectedIds.has(item.id)
                ? total + (item.discountPrice || item.price) * item.qty
                : total,
        0
    );
    const totalQty = cart.reduce(
        (sum, item) => (selectedIds.has(item.id) ? sum + item.qty : sum),
        0
    );

    return (
        <section className='cart'>
            <div className='container'>
                {cart.length > 0 ? (
                    <div className='cart-container'>
                        <div className='cart-header'>
                            <div className='cart-header-title'>
                                <h2>Savat</h2>
                                <p className='cart-header-subtitle'>
                                    {cart.length} tovarlar
                                </p>
                            </div>
                            <button
                                type='button'
                                className='cart-header-delete'
                                onClick={deleteSelected}
                                disabled={selectedIds.size === 0}
                            >
                                Tanlanganlarni ochirish <DeleteIcon />
                            </button>
                            <form className='cart-header-form'>
                                <label htmlFor='checkall'>
                                    Hammasini tanlash
                                </label>
                                <input
                                    className='cart-header-checkbox'
                                    type='checkbox'
                                    id='checkall'
                                    checked={isAllSelected}
                                    onChange={(e) =>
                                        handleToggleAll(e.target.checked)
                                    }
                                />
                            </form>
                        </div>

                        <div className='cart-item-row'>
                            <div className='cart-items'>
                                {cart.map((item: CartItemType) => (
                                    <CartItem
                                        key={item.id}
                                        item={item}
                                        selectedIds={selectedIds}
                                        handleToggleOne={handleToggleOne}
                                        decrementItem={decrementItem}
                                        incrementItem={incrementItem}
                                        deleteItem={deleteItem}
                                    />
                                ))}
                            </div>

                            <div className='cart-item-row-pay'>
                                <div className='cart-item-row-pay-row'>
                                    <div className='cart-item-row-pay-left'>
                                        <p className='cart-item-row-pay-title'>
                                            Jami
                                        </p>
                                        <div className='cart-item-row-pay-left-texts'>
                                            <p className='cart-item-row-pay-subtitle'>
                                                Tovarlar soni
                                            </p>
                                            <p className='cart-item-row-pay-subtitle'>
                                                Yetkazib berish
                                            </p>
                                        </div>
                                    </div>
                                    <div className='cart-item-row-pay-right'>
                                        <p className='cart-item-row-pay-title-text'>
                                            {totalSum.toLocaleString()} som
                                        </p>
                                        <div className='cart-item-row-pay-right-texts'>
                                            <p className='cart-item-row-pay-subtitle-text'>
                                                {totalQty} dona
                                            </p>
                                            <p className='cart-item-row-pay-subtitle-info'>
                                                Bepul
                                                <span className='cart-item-row-pay-subtitle__text'>
                                                    Toshkent bo‘ylab 1 kundan,
                                                    O‘zbekiston bo‘ylab 3 kundan
                                                    boshlab
                                                </span>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <button
                                    className='cart-item-row-pay-button'
                                    onClick={handleCheckout}
                                    disabled={selectedIds.size === 0}
                                >
                                    Rasmiylashtirmoq
                                </button>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className='cart-none'>
                        <h1 className='cart-title'>Savat hozircha boʻsh</h1>
                        <p className='cart-text'>
                            Mahsulotlarni topish uchun katalogni koring yoki
                            qidiruvdan foydalaning
                        </p>
                        <div className='cart-buttons'>
                            <button type='submit' className='cart-button'>
                                Katalogga otish
                            </button>
                            <Link href='/'>
                                <button className='cart-btn'>
                                    Asosiy ekranga
                                </button>
                            </Link>
                        </div>
                    </div>
                )}
            </div>
            {cart.length > 0 && (
                <div
                    style={{
                        marginTop: "80px",
                        borderTop: "1px solid #798998",
                    }}
                >
                    <Interesting />
                </div>
            )}
        </section>
    );
};

export default CartPage;

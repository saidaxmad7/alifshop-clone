"use client";

import { useState, useContext } from "react";
import type { CartContextType } from "@/context/CartContext";
import type { Address } from "@/components/checkout/AddAddressModal";
import { getAuth } from "firebase/auth";
import Link from "next/link";
import { Typography, Button, message } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { CartContext } from "@/context/CartContext";
import { useRouter } from "next/navigation";
import axios from "axios";
import DeliveryMethod from "@/components/checkout/DeliveryMethod";
import AddressSection from "@/components/checkout/AddressSection";
import PaymentMethod from "@/components/checkout/PaymentMethod";
import OrderSummary from "@/components/checkout/OrderSummary";
import AddAddressModal from "@/components/checkout/AddAddressModal";

export default function CheckoutPage() {
    const router = useRouter();
    const cartContext = useContext(CartContext) as CartContextType;
    const cart = cartContext?.cart ?? [];
    const clear = cartContext?.clear ?? (() => {});
    const auth = getAuth();

    const userId = auth.currentUser?.uid ?? null;

    const totalSum = cart.reduce(
        (acc, item) => acc + (item.discountPrice ?? item.price) * item.qty,
        0,
    );

    const totalQty = cart.reduce((acc, item) => acc + item.qty, 0);

    const [messageApi, contextHolder] = message.useMessage();
    const [shippingValue, setShippingValue] = useState(1);
    const [selectedAddress, setSelectedAddress] = useState<Address | null>(
        null,
    );
    const [isModalOpen, setIsModalOpen] = useState(false);

    const isCartEmpty = cart.length === 0;

    const handleCheckout = async () => {
        if (isCartEmpty) return messageApi.error("Savat bo‘sh!");
        if (!selectedAddress) return messageApi.error("Manzilni kiriting!");
        if (!userId)
            return messageApi.error(
                "Foydalanuvchi aniqlanmadi! Qayta login qiling.",
            );

        const orderData = {
            userId,
            items: cart,
            totalAmount: totalSum,
            address: selectedAddress,
            payment: "cash",
            date: new Date().toISOString(),
        };

        try {
            const res = await axios.post(
                "https://dac4d96cc495e5de.mokky.dev/orders",
                orderData,
            );
            if (res.status === 201) {
                messageApi.success("Buyurtma muvaffaqiyatli qabul qilindi!");
                clear();
                router.push("/");
            }
        } catch {
            messageApi.error("Xatolik! Qayta urinib ko‘ring.");
        }
    };

    if (!userId) {
        return (
            <div className='checkout-page'>
                <Typography.Title
                    level={3}
                    style={{ textAlign: "center", marginTop: 40 }}
                >
                    Oldin ro‘yxatdan o‘ting
                </Typography.Title>
            </div>
        );
    }

    return (
        <div className='checkout-page'>
            {contextHolder}
            <div className='checkout-container'>
                <Link href='/cart' className='back-link'>
                    <ArrowLeftOutlined /> Orqaga
                </Link>

                <Typography.Title level={2}>
                    Xaridni rasmiylashtirish
                </Typography.Title>

                <div className='checkout-content'>
                    <div className='left-side'>
                        <DeliveryMethod
                            shippingValue={shippingValue}
                            setShippingValue={setShippingValue}
                        />
                        <AddressSection
                            selectedAddress={selectedAddress}
                            setIsModalOpen={setIsModalOpen}
                        />
                        <PaymentMethod />
                    </div>

                    <OrderSummary
                        cart={cart}
                        totalQty={totalQty}
                        totalSum={totalSum}
                    />
                </div>

                <div className='checkout-footer'>
                    <Button
                        disabled={isCartEmpty || !selectedAddress}
                        className='order-button'
                        onClick={handleCheckout}
                    >
                        Buyurtma berish ({totalSum.toLocaleString()} so‘m)
                    </Button>
                </div>
            </div>

            <AddAddressModal
                open={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSave={(address: Address) => setSelectedAddress(address)}
            />
        </div>
    );
}

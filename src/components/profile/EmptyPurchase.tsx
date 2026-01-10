// components/PurchasesList.js

"use client";

import { useEffect, useState } from "react";
import { Button, Typography, Tag } from "antd";
import axios from "axios";
import Link from "next/link";
import {
    ShoppingOutlined,
    ClockCircleOutlined,
    DollarOutlined,
    EnvironmentOutlined,
} from "@ant-design/icons";

// Eslatma: Agar SCSS Module emas, oddiy SCSS ishlatilsa,
// import quyidagicha bo'lishi mumkin (loyihangiz konfiguratsiyasiga bog'liq):
// import '../styles/PurchasesList.scss';

interface OrderItem {
    id: number;
    title: string;
    price: number;
    qty: number;
    discountPrice?: number;
    images?: string[];
}
interface Address {
    region: string;
    city: string;
    street: string;
    house: string;
    apartment?: string;
}

interface Order {
    id: number;
    userId: string;
    items: OrderItem[];
    totalAmount: number;
    address: Address;
    payment: string;
    date: string;
    status?: "Pending" | "Processed" | "Delivered" | "Cancelled";
}

const formatCurrency = (amount: number): string => {
    return amount.toLocaleString("uz-UZ") + " so‘m";
};

const formatDateTime = (isoString: string): string => {
    const date = new Date(isoString);
    return date.toLocaleDateString("uz-UZ", {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    });
};

export default function PurchasesList() {
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true); // ... (fetchOrders useEffect o'zgarishsiz) ...
    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const res = await axios.get<Order[]>(
                    "https://dac4d96cc495e5de.mokky.dev/orders"
                );
                setOrders(res.data.reverse());
            } catch (error) {
                console.error("Xatolik:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, []);

    if (loading) {
        return <p className='loading-message'>Yuklanmoqda...</p>;
    }

    if (orders.length === 0) {
        return (
            <div className='empty-purchases-content'>
                        <ShoppingOutlined className='empty-icon' />       {" "}
                <div className='text-container'>
                             {" "}
                    <Typography.Title level={3} className='main-message'>
                                    Xarid qilingan tovarlar shu yerda paydo
                        bo‘ladi          {" "}
                    </Typography.Title>
                             {" "}
                    <p className='sub-message'>
                                    Tovar bilan tanishib chiqish uchun
                        katalogini oching yoki qidiruv             bo‘limidan
                        foydalaning          {" "}
                    </p>
                             {" "}
                    <Button type='primary' size='large'>
                                  <Link href='/catalog'>Katalogga oʻtish</Link> 
                               {" "}
                    </Button>
                           {" "}
                </div>
                     {" "}
            </div>
        );
    }

    return (
        <div className='purchases-list'>
                 {" "}
            {orders.map((order) => {
                const orderStatus = order.status || "Pending";

                return (
                    <div key={order.id} className='order-card'>
                        <div className='order-header'>
                            <Typography.Title level={4} className='order-title'>
                                Buyurtma №{order.id}
                            </Typography.Title>
                            <Tag
                                color={
                                    orderStatus === "Delivered"
                                        ? "success"
                                        : orderStatus === "Processed"
                                        ? "processing"
                                        : "warning"
                                }
                            >
                                {orderStatus === "Pending"
                                    ? "Kutilmoqda"
                                    : orderStatus === "Processed"
                                    ? "Qayta ishlanmoqda"
                                    : orderStatus === "Delivered"
                                    ? "Yetkazildi"
                                    : "Bekor qilingan"}
                            </Tag>
                        </div>
                        <div className='items-list'>
                                         {" "}
                            {order.items.map((item) => (
                                <div key={item.id} className='item-row'>
                                    <div className='item-details'>
                                        {item.images && item.images[0] && (
                                            <img
                                                src={item.images[0]}
                                                alt={item.title}
                                                className='item-image'
                                            />
                                        )}
                                                           {" "}
                                        <span className='item-title'>
                                            {item.title} (x{item.qty})
                                        </span>
                                    </div>
                                                     {" "}
                                    <span className='item-price'>
                                                           {" "}
                                        {formatCurrency(
                                            (item.discountPrice || item.price) *
                                                item.qty
                                        )}
                                                         {" "}
                                    </span>
                                                   {" "}
                                </div>
                            ))}
                        </div>
                        <div className='order-summary'>
                            <div className='summary-row'>
                                <DollarOutlined className='summary-icon' />
                                <strong>Jami:</strong>
                                <span className='total-amount'>
                                    {formatCurrency(order.totalAmount)}
                                </span>
                            </div>

                            <div className='summary-row'>
                                <EnvironmentOutlined className='summary-icon' />
                                <div>
                                    <strong>Manzil:</strong>
                                    <span className='summary-value'>
                                        {order.address.region},{" "}
                                        {order.address.city},{" "}
                                        {order.address.street}, uy:{" "}
                                        {order.address.house}{" "}
                                        {order.address.apartment &&
                                            `, xon: ${order.address.apartment}`}
                                    </span>
                                </div>
                            </div>

                            <div className='summary-row'>
                                <ClockCircleOutlined className='summary-icon' />
                                <strong>Sana:</strong>
                                <span className='summary-value'>
                                    {formatDateTime(order.date)}
                                </span>
                            </div>

                            <div className='summary-row'>
                                <p className='summary-label'>To‘lov:</p>
                                <Tag color='geekblue'>
                                    {order.payment === "cash"
                                        ? "Naqd pul"
                                        : order.payment}
                                </Tag>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}

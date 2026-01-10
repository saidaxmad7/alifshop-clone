"use client";

import AkkIcon from "@/assets/icons/AkkIcon";
import Login from "@/components/login/Login";
import EmptyPurchases from "@/components/profile/EmptyPurchase";
import EmptyReviews from "@/components/profile/EmptyReviews";
import AlifNasiya from "@/components/profile/ALifNasiya";
import { Typography } from "antd";
import { useContext, useEffect, useState } from "react";
import { FirebaseContext } from "../providers";

interface User {
    displayName: string | null;
    email?: string | null;
    uid?: string | null;
}

const tabs = [
    { key: "purchases", title: "MENING XARIDLARIM" },
    { key: "reviews", title: "MENING SHARHLARIM" },
    { key: "alif", title: "ALIF NASIYA" },
];

export default function ProfilePage() {
    const { auth } = useContext(FirebaseContext);
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState("purchases");

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((usr) => {
            setUser(
                usr
                    ? {
                          displayName: usr.displayName,
                          email: usr.email,
                          uid: usr.uid,
                      }
                    : null
            );
            setLoading(false);
        });
        return () => unsubscribe();
    }, [auth]);

    const handleLogout = async () => {
        try {
            await auth.signOut();
            setUser(null);
        } catch (error) {
            console.error("Chiqishda xato:", error);
        }
    };

    if (loading) return null;

    if (!user) {
        return (
            <div className='profile'>
                <div className='container'>
                    <Typography.Title
                        level={3}
                        style={{ textAlign: "center", marginTop: 40 }}
                    >
                        Oldin ro‘yxatdan o‘ting yoki tizimga kiring!
                    </Typography.Title>
                    <Login />
                </div>
            </div>
        );
    }

    return (
        <div className='profile'>
            <div className='container'>
                <div className='profile-header'>
                    <Typography.Title level={5} className='profile-title'>
                        <span className='profile-icon'>
                            <AkkIcon />
                        </span>
                        {user.displayName || "Foydalanuvchi"}
                    </Typography.Title>
                    <button className='profile-logout' onClick={handleLogout}>
                        Chiqish
                    </button>
                </div>

                <div className='profile-tabs'>
                    {tabs.map((tab) => (
                        <div
                            key={tab.key}
                            className={`tab-item ${
                                activeTab === tab.key ? "active" : ""
                            }`}
                            onClick={() => setActiveTab(tab.key)}
                        >
                            {tab.title}
                        </div>
                    ))}
                </div>

                <div className='profile-content'>
                    {activeTab === "purchases" && <EmptyPurchases />}
                    {activeTab === "reviews" && <EmptyReviews />}
                    {activeTab === "alif" && <AlifNasiya />}
                </div>
            </div>
        </div>
    );
}

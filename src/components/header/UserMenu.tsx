"use client";

import React, { useContext, useEffect, useState } from "react";
import Link from "next/link";
import { Typography } from "antd";
import AkkIcon from "@/assets/icons/AkkIcon";
import Login from "../login/Login";
import { FirebaseContext } from "@/app/providers";

const UserMenu: React.FC = () => {
    const { auth } = useContext(FirebaseContext);
    const [userName, setUserName] = useState<string | null>(null);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            if (user) setUserName(user.displayName || null);
            else setUserName(null);
        });
        return () => unsubscribe();
    }, [auth]);

    return (
        <Link href="/profile">
            {userName ? (
                <Typography.Title level={5} className="profile-title">
                    <span className="profile-icon">
                        <AkkIcon />
                    </span>
                    {userName}
                </Typography.Title>
            ) : (
                <Login />
            )}
        </Link>
    );
};

export default UserMenu;

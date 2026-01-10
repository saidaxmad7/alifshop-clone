"use client";

import { useState, type ReactNode, createContext } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { CartProvider } from "@/context/CartContext";
import { WishlistProvider } from "@/context/WishlistContext";
import { DrawerProvider } from "@/context/DrawerContext";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";


type FirebaseContextType = {
    firebase: typeof firebase;
    auth: firebase.auth.Auth;
    firestore: firebase.firestore.Firestore;
};

export const FirebaseContext = createContext<FirebaseContextType | null>(null);

if (!firebase.apps.length) {
    firebase.initializeApp({
        apiKey: "AIzaSyAnou88hdCrblnu-YfMefNAiMWVQISjuRE",
        authDomain: "alif-shop-f289f.firebaseapp.com",
        projectId: "alif-shop-f289f",
        storageBucket: "alif-shop-f289f.firebasestorage.app",
        messagingSenderId: "724319299416",
        appId: "1:724319299416:web:defca90a311509f0a1a72d",
        measurementId: "G-VT04LL599L",
    });
}

const auth = firebase.auth();
const firestore = firebase.firestore();

export default function Providers({ children }: { children: ReactNode }) {
    const [queryClient] = useState(() => new QueryClient());

    return (
        <QueryClientProvider client={queryClient}>
            <FirebaseContext.Provider value={{ firebase, auth, firestore }}>
                <DrawerProvider>
                    <WishlistProvider>
                        <CartProvider>{children}</CartProvider>
                    </WishlistProvider>
                </DrawerProvider>
            </FirebaseContext.Provider>
        </QueryClientProvider>
    );
}

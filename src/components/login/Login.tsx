"use client";

import { FirebaseContext } from "@/app/providers";
import { Button, Modal } from "antd";
import { useContext, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import firebase from "firebase/compat/app";


export default function Login() {
    const [open2, setOpen2] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const firebaseContext = useContext(FirebaseContext);
    const auth = firebaseContext?.auth;
    const firestore = firebaseContext?.firestore;
    
    if (!auth || !firestore) {
        return <div>Xato: Firebase konteksti yuklanmadi.</div>;
    }

    const addUserToFirestore = async (user: firebase.User) => {
        const userRef = firestore.collection('users').doc(user.uid);
        
        const userData = {
            uid: user.uid,
            displayName: user.displayName || 'Noma\'lum foydalanuvchi',
            email: user.email || null,
            photoURL: user.photoURL || null,
            registeredAt: firebase.firestore.FieldValue.serverTimestamp(),
        };

        try {
            await userRef.set(userData, { merge: true });
            console.log("Foydalanuvchi ma'lumotlari Firestorega saqlandi/yangilandi.");
        } catch (error) {
            console.error("Firestorega yozishda xato: ", error);
        }
    };


    const login = async () => {
        setLoading(true);
        const provider = new firebase.auth.GoogleAuthProvider();
        try {
            const result = await auth.signInWithPopup(provider);
            const user = result.user;

            if (user) {
                await addUserToFirestore(user); 
            }

            setOpen2(false);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Button
                type='primary'
                className='header-sign'
                onClick={() => setOpen2(true)}
            >
                Kirish
            </Button>
            <Modal
                title={<p>Avtorizatsiya alif shop</p>}
                open={open2}
                onCancel={() => setOpen2(false)}
                footer={null}
            >
                <Button
                    icon={<FcGoogle />}
                    style={{
                        width: "100%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                    loading={loading}
                    onClick={login}
                >
                    Google orqali kirish
                </Button>
            </Modal>
        </>
    );
}
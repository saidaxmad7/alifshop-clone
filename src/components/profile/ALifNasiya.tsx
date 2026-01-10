import { Button, Collapse, Typography } from "antd";
import React from "react";
import { useRouter } from "next/navigation";

const faqItems = [
    {
        key: "1",
        label: "Limit bu nima?",
        children: (
            <p>
                Limit — bu saytdagi xaridlarni amalga oshirishingiz uchun mavjud
                boʻlgan balansingiz
            </p>
        ),
    },
    {
        key: "2",
        label: "Limitni qanday aniqlash mumkin?",
        children: (
            <p>
                Limitni alifdan xarid qilganingizdan so‘ng, alifnasiya.uz
                saytidagi shaxsiy kabinetingiz yoki alif mobi ilovasining Nasiya
                bo‘limidan tekshirishingiz mumkin
            </p>
        ),
    },
    {
        key: "3",
        label: "Agar tovar qiymati belgilangan limitdan oshsa, nima qilish kerak?",
        children: (
            <p>
                Agar tovarning narxi sizga ajratilgan limitdan oshsa, biz
                tanlangan tovar uchun arizani korib chiqamiz va sizga tez orada
                javob beramiz
            </p>
        ),
    },
    {
        key: "4",
        label: "Muddatli toʻlovni qanday toʻlashim mumkin?",
        children: (
            <p>
                Oylik tolov miqdori belgilangan tolov jadvaliga muvofiq
                avtomatik ravishda boglangan kartangizdan yechib olinadi. Biroq,
                siz har doim tolovlarni alifnasiya.uz shaxsiy kabinetingiz yoki
                alif mobi, Payme, Click, Uzum Bank va Paynet tolov tizimlari
                orqali amalga oshirishingiz mumkin
            </p>
        ),
    },
];

export default function AlifNasiya() {
    const router = useRouter();
    const limitUrl = "https://alifshop.uz/uz/checkout/nasiya/not-azo";

    const handleLimitClick = () => {
        router.push(limitUrl);
    };

    return (
        <div className='alif-nasiya-page'>
            <div className='alif-nasiya-left'>
                <div className='limit-card'>
                    <Typography.Title level={3} className='limit-title'>
                        Sizda limit mavjud emas
                    </Typography.Title>
                    <p className='limit-info'>
                        Limitni bilish uchun Alif Nasiya tizimida roʻyxatdan
                        oʻting
                    </p>
                    <Button
                        type='primary'
                        className='limit-button'
                        onClick={handleLimitClick}
                    >
                        Limit olish
                    </Button>
                </div>
            </div>

            <div className='alif-nasiya-right'>
                <div className='faq-header'>
                    <span className='faq-icon-placeholder'>?</span>
                    <Typography.Title level={5} className='faq-title'>
                        Limit haqida tez-tez soʻraladigan savollar
                    </Typography.Title>
                </div>
                <Collapse
                    bordered={false}
                    expandIconPosition='end'
                    className='faq-collapse'
                    accordion
                    defaultActiveKey={["1"]}
                    items={faqItems}
                />
            </div>
        </div>
    );
}

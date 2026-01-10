"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Axios } from "@/lib/api";
import { urls } from "@/constants/urls";
import Loading from "@/components/loading/Loading";
import DownIcon from "@/assets/icons/DownIcon";
import { useDrawer } from "@/context/DrawerContext";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { slugify } from "@/utils/helpers";
import type { Banner as BannerType, Category } from "@/types/Intefaces";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

function Banner() {
    const [categories, setCategories] = useState<Category[]>([]);
    const [banners, setBanners] = useState<BannerType[]>([]);

    function getCategories() {
        Axios.get(urls.categories.getList)
            .then((res) => {
                setCategories(res.data);
            })
            .catch((error) =>
                console.error("Error fetching categories:", error)
            );
    }

    function getBanners() {
        Axios.get(urls.banner.getList)
            .then((res) => {
                setBanners(res.data);
            })
            .catch((error) => console.error("Error fetching banners:", error));
    }

    useEffect(() => {
        getCategories();
        getBanners();
    }, []);

    const { showDrawer } = useDrawer();

    return (
        <section className='banner'>
            <div className='container'>
                <nav className='banner-nav'>
                    {categories.length === 0 ? (
                        <Loading />
                    ) : (
                        categories.map((item) => (
                            <Link
                                href={`/categories/${slugify(item.name)}`}
                                className='banner-link'
                                key={item.id}
                            >
                                {item.name}
                            </Link>
                        ))
                    )}
                    <button className='banner-button' onClick={showDrawer}>
                        Yana
                        <DownIcon />
                    </button>
                </nav>

                <Swiper
                    spaceBetween={30}
                    centeredSlides={true}
                    loop={true}
                    autoplay={{
                        delay: 2500,
                        disableOnInteraction: false,
                    }}
                    pagination={{
                        clickable: true,
                    }}
                    navigation={true}
                    modules={[Autoplay, Pagination, Navigation]}
                    className='mySwiper'
                >
                    {banners.length === 0 ? (
                        <SwiperSlide>
                            <Loading />
                        </SwiperSlide>
                    ) : (
                        banners.map((item) => (
                            <SwiperSlide key={item.id}>
                                <div className='banner-item'>
                                    <img
                                        src={item.img}
                                        alt={`Banner ${item.id}`}
                                        loading='lazy'
                                    />
                                </div>
                            </SwiperSlide>
                        ))
                    )}
                </Swiper>
            </div>
        </section>
    );
}

export default Banner;

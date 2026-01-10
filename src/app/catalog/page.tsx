"use client";
import { useEffect, useState } from "react";
import { Axios } from "@/lib/api";
import type { Category } from "@/types/Intefaces";

function CatalogPage() {
    const [categories, setCategories] = useState<Category[]>([]);

    useEffect(() => {
        Axios.get("/categories/")
            .then((res) => setCategories(res.data))
            .catch((error) =>
                console.error("Error fetching categories:", error)
            );
    }, []);

    return (
        <section className='catalog'>
            <div className='container'>
                {categories.map((category) => (
                    <div key={category.id} className='catalog-item'>
                        <img
                            src={category.img}
                            alt={category.name}
                            className='catalog-img'
                            loading='lazy'
                        />
                        <h3 className='catalog-title'>{category.name}</h3>
                    </div>
                ))}
            </div>
        </section>
    );
}

export default CatalogPage;

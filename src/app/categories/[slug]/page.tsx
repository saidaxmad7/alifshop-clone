"use client";

import { useEffect, useState, useContext } from "react";
import { useParams } from "next/navigation";
import { Axios } from "@/lib/api";
import { urls } from "@/constants/urls";
import { slugify } from "@/utils/helpers";
import { CartContext } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { message } from "antd";
import type { Category, Product } from "@/types/Intefaces";

import CategoryBreadcrumb from "@/components/categories/CategoryBreadcrumb";
import CategoryNav from "@/components/categories/CategoryNav";
import ProductCard from "@/components/categories/ProductCard";

export default function Categories() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [currentCategory, setCurrentCategory] = useState<Category | null>(null);
  const [breadcrumbs, setBreadcrumbs] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [addedIds, setAddedIds] = useState<(number | string)[]>([]);

  const params = useParams<{ slug?: string }>();
  const slug = params?.slug;

  const cartContext = useContext(CartContext)!;
  const { cart } = cartContext;

  const { contextHolder } = message.useMessage();

  useEffect(() => {
    Axios.get(urls.categories.getList)
      .then(res => {
        const list: Category[] = res.data;
        setCategories(list);

        const found =
          slug
            ? list.find(c => slugify(c.name) === slug.toLowerCase())
            : list[0];

        if (found) {
          setCurrentCategory(found);
          setBreadcrumbs([found]);
        }
      })
      .catch(() => setCategories([]));
  }, [slug]);

  useEffect(() => {
    if (!currentCategory) return;

    Axios.get(`${urls.products.getList}?categorie_id=${currentCategory.id}`)
      .then(res => setProducts(res.data))
      .catch(() => setProducts([]));
  }, [currentCategory]);

  useEffect(() => {
    setAddedIds(cart.map(item => item.id));
  }, [cart]);

  const handleSubcategoryClick = (subcat: Category) => {
    setCurrentCategory(subcat);
    setBreadcrumbs(prev => [...prev, subcat]);
  };

  const showNav =
    currentCategory?.subcategories &&
    currentCategory.subcategories.length > 0;

  return (
    <section className="categories">
      <div className="container">
        <div className="categories-texts">
          <CategoryBreadcrumb breadcrumbs={breadcrumbs} />
        </div>

        <h1 className="categories-title">{currentCategory?.name}</h1>

        {showNav && (
          <CategoryNav
            subcategories={currentCategory!.subcategories}
            onClick={handleSubcategoryClick}
          />
        )}

        {contextHolder}

        <div className="discount-items">
          {products.length > 0 ? (
            products.map(item => {
              const inCart = addedIds.includes(item.id);
              const cartItem = cart.find(ci => ci.id === item.id);

              return (
                <ProductCard
                  key={item.id}
                  item={item}
                  inCart={inCart}
                  cartItem={cartItem}
                />
              );
            })
          ) : (
            <p>Mahsulotlar topilmadi</p>
          )}
        </div>
      </div>
    </section>
  );
}

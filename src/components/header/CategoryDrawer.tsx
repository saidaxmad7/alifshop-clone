"use client";

import React, { useState } from "react";
import { Drawer } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import Link from "next/link";
import { Category } from "@/types/Intefaces";
import { slugify } from "@/utils/helpers";

interface CategoryDrawerProps {
    open: boolean;
    onClose: () => void;
    categories: Category[];
}

const CategoryDrawer: React.FC<CategoryDrawerProps> = ({ open, onClose, categories }) => {
    const [activeCategoryId, setActiveCategoryId] = useState<number | null>(categories[0]?.id ?? null);

    return (
        <Drawer
            title={null}
            className="header-categories-drawer"
            onClose={onClose}
            open={open}
            placement="top"
            closable={false}
            mask={false}
            height="100vh"
            styles={{ body: { padding: 0 } }}
        >
            <div className="container">
                <div className="header-categories-drawer-close">
                    <CloseOutlined
                        onClick={onClose}
                        style={{ fontSize: 20, cursor: "pointer" }}
                    />
                </div>
                <div className="header-categories-list">
                    <div className="header-category-main">
                        <ul>
                            {categories.map((category) => (
                                <li
                                    key={category.id}
                                    className={`header-category-item ${activeCategoryId === category.id ? "active" : ""}`}
                                    onMouseEnter={() => setActiveCategoryId(category.id)}
                                >
                                    <Link href={`/categories/${slugify(category.name)}`} className="header-category-link">
                                        {category.name} 
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="header-subcategory">
                        <ul className="header-subcategory-list">
                            {categories
                                .find(cat => cat.id === activeCategoryId)
                                ?.subcategories?.map(sub => (
                                    <li key={sub.id} className="header-subcategory-item">
                                        <Link href={`/categories/${slugify(sub.name)}`} className="header-subcategory-link">
                                            {sub.name}
                                        </Link>
                                        {sub.subcategories && (
                                            <ul className="header-subsubcategory-list">
                                                {sub.subcategories.map(subsub => (
                                                    <li key={subsub.id} className="header-subsubcategory-item">
                                                        <Link href={`/categories/${slugify(subsub.name)}`} className="header-subsubcategory-link">
                                                            {subsub.name}
                                                        </Link>
                                                    </li>
                                                ))}
                                            </ul>
                                        )}
                                    </li>
                                ))}
                        </ul>
                    </div>
                </div>
            </div>
        </Drawer>
    );
};

export default CategoryDrawer;

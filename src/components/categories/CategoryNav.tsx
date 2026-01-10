"use client";

import React from "react";
import type { Category } from "@/types/Intefaces";

interface Props {
  subcategories: Category[];
  onClick: (subcat: Category) => void;
}

const CategoryNav: React.FC<Props> = ({ subcategories, onClick }) => {
  return (
    <nav className="categories-list">
      {subcategories.map((subcat) => (
        <button
          key={subcat.id}
          className="categories-list__item"
          onClick={() => onClick(subcat)}
        >
          {subcat.name}
        </button>
      ))}
    </nav>
  );
};

export default CategoryNav;

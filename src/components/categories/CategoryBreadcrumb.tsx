"use client";

import React from "react";
import type { Category } from "@/types/Intefaces";

interface Props {
  breadcrumbs: Category[];
}

const CategoryBreadcrumb: React.FC<Props> = ({ breadcrumbs }) => {
  return (
    <h4 className="categories-texts__title">
      Tovarlar katalogi{" "}
      <span className="categories-texts__subtitle">
        /{" "}
        {breadcrumbs.map((b, i) => (
          <span key={b.id}>
            {b.name}
            {i < breadcrumbs.length - 1 ? " / " : ""}
          </span>
        ))}
      </span>
    </h4>
  );
};

export default CategoryBreadcrumb;

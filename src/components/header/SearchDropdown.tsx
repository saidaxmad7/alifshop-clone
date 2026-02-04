"use client";

import Link from "next/link";
import { Product } from "@/types/Intefaces";

interface SearchDropdownProps {
    query: string;
    products: Product[];
    onSelect: () => void;
}

const SearchDropdown: React.FC<SearchDropdownProps> = ({
    query,
    products,
    onSelect,
}) => {
    if (!query || products.length === 0) return null;

    return (
        <div className='header-search-dropdown'>
            <div className='header-search-dropdown-container'>
                {products.map((product) => (
                    <Link
                        key={product.id}
                        href={`/product/${product.id}`}
                        onClick={onSelect}
                        className='header-search-dropdown-item'
                    >
                        <div>{product.name}</div>
                        {(product.categories ?? []).length > 0 && (
                            <div>
                                {(product.categories ?? []).map((cat) => (
                                    <span key={cat.id}>{cat.name} </span>
                                ))}
                            </div>
                        )}
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default SearchDropdown;

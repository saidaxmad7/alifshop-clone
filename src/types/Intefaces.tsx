export interface Product {
    id: number;
    title: string;
    name: string;
    categories?: { id: number; name: string }[];
    images: string[];
    price: number;
    discountPrice: number;
    is_sale?: boolean;
    discount: number;
    description?: string;
    featur?: string[];
    colors?: { id: number; img?: string }[];
    memories?: string[];
    describtion?: string;
}

export interface Category {
    id: number;
    name: string;
    img: string;
    subcategories: SubCategory[];
    parent_id: number | null;
}

export interface SubCategory {
    id: number;
    name: string;
    img?: string;
    subcategories?: SubCategory[];
}

export interface Banner {
    id: number;
    img: string;
}

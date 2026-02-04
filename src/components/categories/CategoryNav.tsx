import type { SubCategory } from "@/types/Intefaces";

interface Props {
    subcategories: SubCategory[];
    onClick: (subcat: SubCategory) => void;
}

export default function CategoryNav({ subcategories, onClick }: Props) {
    return (
        <nav className='category-nav'>
            {subcategories.map((subcat) => (
                <button
                    key={subcat.id}
                    onClick={() => onClick(subcat)}
                    className='category-nav-item'
                >
                    {subcat.name}
                </button>
            ))}
        </nav>
    );
}

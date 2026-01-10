"use client";

import DeleteIcon from "@/assets/icons/DeleteIcon";
import MinusIcon from "@/assets/icons/MinusIcon";
import PlusIcon from "@/assets/icons/PlusIcon";

export interface CartItemType {
    id: number | string;
    title: string;
    images?: string[];
    price: number;
    discountPrice?: number;
    seller?: string;
    qty: number;
}

interface CartItemProps {
    item: CartItemType;
    selectedIds: Set<number | string>;
    handleToggleOne: (id: number | string, checked: boolean) => void;
    decrementItem: (id: number | string) => void;
    incrementItem: (id: number | string) => void;
    deleteItem: (id: number | string) => void;
}

const CartItem: React.FC<CartItemProps> = ({
    item,
    selectedIds,
    handleToggleOne,
    decrementItem,
    incrementItem,
    deleteItem,
}) => {
    return (
        <div className='cart-item-row-cards'>
            <div className='cart-item-card-row'>
                <div className='cart-item-image'>
                    <img
                        src={item.images?.[0] ?? "/placeholder.png"}
                        alt={item.title ?? "product"}
                        loading="lazy"
                        width={150}
                        height={150}
                        className="rounded"
                    />
                </div>
                <div className='cart-item-card-content'>
                    <div className='cart-item-texts'>
                        <h5 className='cart-item-title'>{item.title}</h5>
                        <input
                            className='cart-header-checkbox'
                            type='checkbox'
                            checked={selectedIds.has(item.id)}
                            onChange={(e) => handleToggleOne(item.id, e.target.checked)}
                        />
                    </div>
                    <p className='cart-item-info'>
                        Narx: <span className='cart-item-info-primary'>{(item.discountPrice || item.price).toLocaleString()} som</span>
                    </p>
                    <p className='cart-item-info'>
                        Sotuvchi: <span className='cart-item-info-primary'>{item.seller ?? ""}</span>
                    </p>
                    <p className='cart-item-row-pay-subtitle__text'>
                        Toshkent bo‘ylab 1 kundan, O‘zbekiston bo‘ylab 3 kundan boshlab
                    </p>
                    <div className='cart-item-buttons'>
                        <div className='cart-item-quantity'>
                            <button onClick={() => decrementItem(item.id)} className='cart-item-decrement'>
                                <MinusIcon />
                            </button>
                            <p className='cart-item-qty'>{item.qty}</p>
                            <button onClick={() => incrementItem(item.id)} className='cart-item-increment'>
                                <PlusIcon />
                            </button>
                        </div>
                        <button className='cart-item-buttons-del' onClick={() => deleteItem(item.id)}>
                            <span className='cart-item-delete'><DeleteIcon /></span> Ochirish
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CartItem;

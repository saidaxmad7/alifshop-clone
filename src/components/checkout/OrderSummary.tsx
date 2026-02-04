import { Typography } from "antd";

interface CartItem {
  id: number | string;
  title: string;
  price: number;
  discountPrice?: number;
  images?: string[];
  qty: number;
}

interface Props {
  cart: CartItem[];
  totalQty: number;
  totalSum: number;
}

export default function OrderSummary({ cart, totalQty, totalSum }: Props) {
  return (
    <div className="right-side">
      <Typography.Title level={4}>
        Sizning buyurtmangiz ({totalQty} ta tovar)
      </Typography.Title>

      {cart.map((item) => (
        <div key={item.id} className="cart-item">
          <img src={item.images?.[0]} className="cart-img" />
          <div>
            <div className="cart-title">
              {item.title} (x{item.qty})
            </div>
            <div className="cart-price">
              {(item.discountPrice ?? item.price).toLocaleString()} so‘m
            </div>
          </div>
        </div>
      ))}

      <div className="total-box">
        <div className="total-row">
          <p>Tovarlar:</p>
          <b>{totalSum.toLocaleString()} so‘m</b>
        </div>

        <div className="total-row">
          <p>Yetkazib berish:</p>
          <b className="green">Bepul</b>
        </div>

        <div className="total-final">
          <p>Jami:</p>
          <b>{totalSum.toLocaleString()} so‘m</b>
        </div>
      </div>
    </div>
  );
}

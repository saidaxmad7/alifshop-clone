import { Typography, Radio } from "antd";

export default function DeliveryMethod({ shippingValue, setShippingValue }) {
  return (
    <div className="section">
      <Typography.Title level={4}>Tovarni qabul qilish</Typography.Title>

      <Radio.Group
        value={shippingValue}
        onChange={(e) => setShippingValue(e.target.value)}
        className="radio-group"
      >
        <Radio value={1} className="radio-card">
          <div className="radio-title">Yetkazib berish</div>
          <div className="radio-sub">Bepul · Eshikgacha</div>
        </Radio>
      </Radio.Group>
    </div>
  );
}

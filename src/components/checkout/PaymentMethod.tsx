import { Typography, Radio } from "antd";

export default function PaymentMethod() {
  return (
    <div className="section">
      <Typography.Title level={4}>To‘lov usuli</Typography.Title>

      <Radio.Group value={1} disabled>
        <Radio value={1} className="radio-card">
          Yetkazilganda to‘lov
        </Radio>
      </Radio.Group>
    </div>
  );
}

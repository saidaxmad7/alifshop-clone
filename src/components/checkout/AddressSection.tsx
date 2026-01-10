import { Typography, Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";

export default function AddressSection({ selectedAddress, setIsModalOpen }) {
  return (
    <div className="section">
      <Typography.Title level={4}>Yetkazib berish manzili</Typography.Title>

      {selectedAddress && (
        <div className="selected-address">
          <p className="label">Tanlangan manzil:</p>
          <p>
            {selectedAddress.region}, {selectedAddress.city},{" "}
            {selectedAddress.street}, uy: {selectedAddress.house}
          </p>
        </div>
      )}

      <Button
        type="primary"
        className="add-address-btn"
        onClick={() => setIsModalOpen(true)}
      >
        <PlusOutlined />{" "}
        {selectedAddress ? "Manzilni o‘zgartirish" : "Manzil qo‘shish"}
      </Button>
    </div>
  );
}

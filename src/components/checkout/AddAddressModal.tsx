"use client";

import { Modal, Input, Select, Form, Button } from "antd";

export interface Address {
  region: string;
  city: string;
  street: string;
  house: string;
}

interface Props {
  open: boolean;
  onClose: () => void;
  onSave: (addr: Address) => void;
}

const regionOptions = [
  { value: "toshkent", label: "Toshkent viloyati" },
  { value: "andijon", label: "Andijon viloyati" },
  { value: "fargona", label: "Farg‘ona viloyati" },
  { value: "namangan", label: "Namangan viloyati" },
  { value: "jizzax", label: "Jizzax viloyati" },
  { value: "sirdaryo", label: "Sirdaryo viloyati" },
  { value: "samarqand", label: "Samarqand viloyati" },
  { value: "navoiy", label: "Navoiy viloyati" },
  { value: "buxoro", label: "Buxoro viloyati" },
  { value: "xorazm", label: "Xorazm viloyati" },
];

export default function AddAddressModal({ open, onClose, onSave }: Props) {
  const [form] = Form.useForm();

  const submitAddress = () => {
    form
      .validateFields()
      .then((values) => {
        onSave(values as Address);
        form.resetFields();
        onClose();
      })
      .catch(() => {});
  };

  return (
    <Modal title="Manzil qo‘shish" open={open} onCancel={onClose} footer={null}>
      <Form layout="vertical" form={form}>
        <Form.Item
          name="region"
          label="Viloyat"
          rules={[{ required: true, message: "Viloyatni tanlang" }]}
        >
          <Select
            placeholder="Viloyatni tanlang"
            options={regionOptions}
          />
        </Form.Item>

        <Form.Item
          name="city"
          label="Shahar yoki tuman"
          rules={[{ required: true, message: "Shaharni kiriting" }]}
        >
          <Input placeholder="Masalan: Chilonzor tumani" />
        </Form.Item>

        <Form.Item
          name="street"
          label="Ko‘cha"
          rules={[{ required: true, message: "Ko‘chani kiriting" }]}
        >
          <Input placeholder="Ko‘cha nomi" />
        </Form.Item>

        <Form.Item
          name="house"
          label="Uy raqami"
          rules={[{ required: true, message: "Uy raqamini kiriting" }]}
        >
          <Input placeholder="Uy raqami" />
        </Form.Item>

        <Button type="primary" block onClick={submitAddress}>
          Saqlash
        </Button>
      </Form>
    </Modal>
  );
}

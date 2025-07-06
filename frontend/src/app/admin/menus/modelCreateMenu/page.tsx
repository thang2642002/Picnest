"use client";

import React, { useState } from "react";
import { Modal, Form, Input, Button, message } from "antd";

interface MenuModalProps {
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
}

const MenuModal: React.FC<MenuModalProps> = ({ show, setShow }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [name, setName] = useState<string>("");
  const [slug, setSlug] = useState<string>("");

  const handleCancel = () => {
    setShow(false);
  };

  const handleOk = async () => {
    try {
      console.log("name", name);
      console.log("slug", slug);
      setShow(false);
    } catch (err) {
      console.error("Lỗi:", err);
    }
  };
  return (
    <Modal
      title="Thêm Menu Mới"
      open={show}
      onOk={handleOk}
      onCancel={handleCancel}
      confirmLoading={loading}
      okText="Tạo"
      cancelText="Hủy"
    >
      <Form layout="vertical">
        <Form.Item label="Tên menu">
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Nhập tên menu..."
          />
        </Form.Item>
        <Form.Item label="Slug">
          <Input
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            placeholder="Nhập slug..."
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default MenuModal;

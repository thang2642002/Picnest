"use client";

import React, { useState } from "react";
import { Modal, Form, Input, Button, message, Select } from "antd";

interface MenuModalProps {
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
}

const ModalUpdateCategory: React.FC<MenuModalProps> = ({ show, setShow }) => {
  const { Option } = Select;
  const [loading, setLoading] = useState<boolean>(false);
  const [name, setName] = useState<string>("");
  const [slug, setSlug] = useState<string>("");
  const [menuId, setMenuId] = useState<string>("Menu1");

  const handleCancel = () => {
    setShow(false);
  };

  const handleOk = async () => {
    try {
      console.log("name", name);
      console.log("slug", slug);
      console.log("menuId", menuId);

      setShow(false);
    } catch (err) {
      console.error("Lỗi:", err);
    }
  };
  return (
    <Modal
      title="Chỉnh sửa thể loại"
      open={show}
      onOk={handleOk}
      onCancel={handleCancel}
      confirmLoading={loading}
      okText="chỉnh sửa"
      cancelText="Hủy"
    >
      <Form layout="vertical">
        <Form.Item label="Tên thể loại">
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Nhập tên thể loại..."
          />
        </Form.Item>
        <Form.Item label="Slug">
          <Input
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            placeholder="Nhập sulg..."
          />
        </Form.Item>
        <Form.Item label="Menu">
          <Select
            value={menuId}
            onChange={(value) => setMenuId(value)}
            placeholder="Chọn menu..."
          >
            <Option value="menu1">Menu1</Option>
            <Option value="menu2">Menu2</Option>
            <Option value="menu3">Menu3</Option>
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ModalUpdateCategory;

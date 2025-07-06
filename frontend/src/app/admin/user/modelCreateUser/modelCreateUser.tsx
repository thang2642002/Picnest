"use client";

import React, { useState } from "react";
import { Modal, Form, Input, Button, message, Select } from "antd";

interface MenuModalProps {
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
}

const UserModal: React.FC<MenuModalProps> = ({ show, setShow }) => {
  const { Option } = Select;
  const [loading, setLoading] = useState<boolean>(false);
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [role, setRole] = useState<string>("Admin");

  const handleCancel = () => {
    setShow(false);
  };

  const handleOk = async () => {
    try {
      console.log("name", name);
      console.log("slug", email);
      console.log("slug", password);
      console.log("slug", role);
      setShow(false);
    } catch (err) {
      console.error("Lỗi:", err);
    }
  };
  return (
    <Modal
      title="Thêm quản trị viên mới"
      open={show}
      onOk={handleOk}
      onCancel={handleCancel}
      confirmLoading={loading}
      okText="Tạo"
      cancelText="Hủy"
    >
      <Form layout="vertical">
        <Form.Item label="Tên quản trị">
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Nhập tên quản trị..."
          />
        </Form.Item>
        <Form.Item label="Email">
          <Input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Nhập email..."
          />
        </Form.Item>
        <Form.Item label="Mật khẩu">
          <Input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Nhập mật khẩu..."
          />
        </Form.Item>
        <Form.Item label="Quyền">
          <Select
            value={role}
            onChange={(value) => setRole(value)}
            placeholder="Chọn quyền..."
          >
            <Option value="Admin">Admin</Option>
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default UserModal;

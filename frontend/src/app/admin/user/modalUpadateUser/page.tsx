"use client";

import React, { useEffect, useState } from "react";
import { Modal, Form, Input, Button, message, Select } from "antd";
import { ApiResponse, IUser } from "@/app/types";
import userServices from "@/app/services/user.services";
import { toast } from "react-toastify";

interface MenuModalProps {
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
  userSelected: IUser | null;
  dataUser: ApiResponse<IUser[]> | null;
  setUserSelected: React.Dispatch<React.SetStateAction<IUser | null>>;
}

const ModalUpdateUser: React.FC<MenuModalProps> = ({
  show,
  setShow,
  userSelected,
  setUserSelected,
}) => {
  const { Option } = Select;
  const [loading, setLoading] = useState<boolean>(false);
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [role, setRole] = useState<string>("Admin");

  console.log("userSelected", userSelected);

  useEffect(() => {
    if (userSelected) {
      setEmail(userSelected?.email);
      setName(userSelected?.name);
      setPassword(userSelected?.password);
      setRole(userSelected?.role);
    }
  }, [userSelected]);

  const handleCancel = () => {
    setShow(false);
    setName("");
    setEmail("");
    setPassword("");
    setRole("");
    setUserSelected(null);
  };

  const handleUpdate = async () => {
    try {
      const data = await userServices.updateUser(
        userSelected?.user_id as string,
        {
          name,
          email,
          password,
          role,
        }
      );
      if (data && data.errCode === 0) {
        toast.success("Cập nhật người dùng thành công");
      } else {
        toast.error("Cập nhật người dùng thất bại");
      }
      setShow(false);
    } catch (err) {
      toast.error("Cập nhật người dùng thất bại");
      console.error("Lỗi:", err);
    }
  };
  return (
    <Modal
      title="Chỉnh sửa quản trị viên"
      open={show}
      onOk={handleUpdate}
      onCancel={handleCancel}
      confirmLoading={loading}
      okText="Chỉnh sửa"
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

export default ModalUpdateUser;

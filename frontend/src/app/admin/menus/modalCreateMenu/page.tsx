"use client";

import React, { useState } from "react";
import { Modal, Form, Input } from "antd";
import { toast } from "react-toastify";
import MenuService from "@/app/services/menu.services";

interface MenuModalProps {
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
  handleGetAllMenu: () => void;
}

const ModalCreateMenu: React.FC<MenuModalProps> = ({
  show,
  setShow,
  handleGetAllMenu,
}) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [name, setName] = useState<string>("");
  const [slug, setSlug] = useState<string>("");

  const handleCancel = () => {
    setShow(false);
    setName("");
    setSlug("");
  };

  const handleOk = async () => {
    try {
      if (!name && !slug) {
        toast.error("Bạn nhập chưa đủ thông tin");
      }
      const data = await MenuService.createMenu({ name, slug });
      if (data.errCode === 0 && data) {
        toast.success("Tạo mới menu thành công");
      }
      handleCancel();
      handleGetAllMenu();
    } catch (err) {
      console.error("Lỗi:", err);
    }
  };
  return (
    <Modal
      title="Thêm menu mới"
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
        <Form.Item label="Mô tả">
          <Input
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            placeholder="Nhập mô tả"
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ModalCreateMenu;

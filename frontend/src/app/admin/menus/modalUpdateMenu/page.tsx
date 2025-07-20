"use client";

import React, { useEffect, useState } from "react";
import { Modal, Form, Input, Button, message } from "antd";
import menuServices from "@/app/services/menu.services";
import { ApiResponse, IMenu } from "@/types/index";
import { toast } from "react-toastify";

interface MenuModalProps {
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
  dataMenu: ApiResponse<IMenu[]> | null;
  menuSelected: IMenu | null;
  handleGetAllMenu: () => void;
}

const ModalUpdateMenu: React.FC<MenuModalProps> = ({
  show,
  setShow,
  menuSelected,
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

  useEffect(() => {
    if (menuSelected) {
      setName(menuSelected.name);
      setSlug(menuSelected.slug);
    }
  }, [menuSelected]);

  const handleUpdate = async () => {
    if (!menuSelected) return;

    try {
      setLoading(true);
      const res = await menuServices.updateMenu(menuSelected.menu_id, {
        name,
        slug,
      });
      if (res.errCode === 0) {
        message.success("Cập nhật menu thành công!");
        handleGetAllMenu();
        toast.success("Cập nhật menu thành công");
        handleCancel();
      } else {
        toast.error("Cập nhật menu thất bại");
      }
    } catch (err) {
      console.error("Lỗi:", err);
      toast.error("Lỗi khi cập nhật menu");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      title="Chỉnh sửa menu"
      open={show}
      onOk={handleUpdate}
      onCancel={handleCancel}
      confirmLoading={loading}
      okText="Chỉnh sửa"
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

export default ModalUpdateMenu;

"use client";

import React, { useEffect, useState } from "react";
import { Modal, Form, Input, Select } from "antd";
import { toast } from "react-toastify";
import { ICategory, IMenu } from "@/app/types";
import categoryServices from "@/app/services/category.services";

interface MenuModalProps {
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
  selectedCategory: ICategory | null;
  setSelectedCategory: (category: ICategory | null) => void;
  menu: IMenu[] | [];
  getAllCategory: () => void;
}

const ModalUpdateCategory: React.FC<MenuModalProps> = ({
  show,
  setShow,
  selectedCategory,
  setSelectedCategory,
  menu,
  getAllCategory,
}) => {
  const { Option } = Select;
  const [loading, setLoading] = useState<boolean>(false);
  const [name, setName] = useState<string>("");
  const [slug, setSlug] = useState<string>("");
  const [menuId, setMenuId] = useState<string>("");

  const handleCancel = () => {
    setShow(false);
    setName("");
    setSlug("");
    setMenuId("");
    setSelectedCategory(null);
  };

  useEffect(() => {
    if (selectedCategory) {
      setName(selectedCategory.name);
      setSlug(selectedCategory.slug);
      setMenuId(selectedCategory.menu_id);
    }
  }, [selectedCategory]);

  const handleUpdateCategory = async () => {
    try {
      if (selectedCategory?.categories_id) {
        const response = await categoryServices.updateCategory(
          selectedCategory?.categories_id,
          { name, slug, menu_id: menuId }
        );
        if (response && response.errCode === 0) {
          toast.success("Cập nhật thể loại thành công");
        } else {
          toast.error("Cập nhật thể loại thất bại");
        }
      } else {
        toast.error("Cập nhật thể loại thất bại");
      }
      getAllCategory();
      handleCancel();
    } catch (err) {
      toast.error("Lỗi server rồi");
      console.error("Lỗi:", err);
    }
  };
  return (
    <Modal
      title="Chỉnh sửa thể loại"
      open={show}
      onOk={handleUpdateCategory}
      onCancel={handleCancel}
      confirmLoading={loading}
      okText="chỉnh sửa"
      cancelText="Hủy"
    >
      <Form layout="vertical">
        <Form.Item label="Thể loại">
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Nhập tên thể loại..."
          />
        </Form.Item>
        <Form.Item label="Mô tả ">
          <Input
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            placeholder="Nhập mô tả"
          />
        </Form.Item>
        <Form.Item label="Menu">
          <Select
            value={menuId}
            onChange={(value) => setMenuId(value)}
            placeholder="Chọn menu..."
            disabled={!menu}
          >
            {menu.map((menu) => (
              <Option key={menu.menu_id} value={menu.menu_id}>
                {menu.name}
              </Option>
            ))}
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ModalUpdateCategory;

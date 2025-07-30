"use client";

import React, { useState } from "react";
import { Modal, Form, Input, Select } from "antd";
import CategoryServices from "@/app/services/category.services";
import { toast } from "react-toastify";
import { IMenu } from "@/types/index";

interface MenuModalProps {
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
  menu: IMenu[];
  getAllCategory: () => void;
}

const ModalCreateCategory: React.FC<MenuModalProps> = ({
  show,
  setShow,
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
    setMenuId("");
    setName("");
    setSlug("");
  };

  const handleOk = async () => {
    try {
      if (!name && !slug && !menuId) {
        toast.warning("Vui lòng nhập đầy đủ thông tin");
      } else {
        const data = await CategoryServices.createCategory({
          name,
          slug,
          menu_id: menuId,
        });
        if (data && data.errCode === 0) {
          toast.success("Tạo mới thể loại thành công");
        } else {
          toast.error("Tạo mới thể loại thất bại");
        }
      }
      getAllCategory();
      handleCancel();
    } catch (err) {
      toast.error("Lỗi Server rồi");
      console.error("Lỗi:", err);
    }
  };
  return (
    <Modal
      title="Thêm thể loại mới"
      open={show}
      onOk={handleOk}
      onCancel={handleCancel}
      confirmLoading={loading}
      okText="Tạo"
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
        <Form.Item label="Mô tả">
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
            <Option value="" disabled>
              Vui lòng chọn menu...
            </Option>
            {menu?.map((menu) => (
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

export default ModalCreateCategory;

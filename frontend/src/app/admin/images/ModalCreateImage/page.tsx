"use client";

import React, { useState } from "react";
import { Modal, Form, Input, Select, Image, message } from "antd";

interface MenuModalProps {
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
  onCreateImages: (
    images: {
      url: string;
      title: string;
      category_id: string;
    }[]
  ) => void;
}

const ModalCreateImage: React.FC<MenuModalProps> = ({
  show,
  setShow,
  onCreateImages,
}) => {
  const { Option } = Select;
  const [title, setTitle] = useState<string>("");
  const [categories_id, setCategoriesId] = useState<string>("thể loại 1");
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);

  const handleCancel = () => {
    setShow(false);
    setTitle("");
    setCategoriesId("thể loại 1");
    setImageFiles([]);
    setPreviewUrls([]);
  };

  const handleOk = () => {
    if (imageFiles.length < 1) {
      return message.error("Vui lòng chọn ít nhất 1 ảnh.");
    }
    if (imageFiles.length > 10) {
      return message.error("Chỉ được chọn tối đa 10 ảnh.");
    }

    const newImages = imageFiles.map((file) => ({
      url: URL.createObjectURL(file),
      title: title || file.name,
      category_id: categories_id,
    }));

    onCreateImages(newImages);
    handleCancel();
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const selectedFiles = Array.from(files);
    const allFiles = [...imageFiles, ...selectedFiles];

    const uniqueFiles = Array.from(
      new Map(
        allFiles.map((file) => [`${file.name}-${file.lastModified}`, file])
      ).values()
    );
    if (uniqueFiles.length > 10) {
      message.warning("Chỉ được chọn tối đa 10 ảnh!");
      return;
    }

    setImageFiles(uniqueFiles);
    setPreviewUrls(uniqueFiles.map((file) => URL.createObjectURL(file)));

    e.target.value = "";
  };

  return (
    <Modal
      title="Thêm nhiều hình ảnh"
      open={show}
      onOk={handleOk}
      onCancel={handleCancel}
      okText="Tạo"
      cancelText="Hủy"
    >
      <Form layout="vertical">
        <Form.Item label="Tên ảnh (chung)">
          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Tên sẽ áp dụng chung cho tất cả ảnh"
          />
        </Form.Item>

        <Form.Item label="Menu">
          <Select
            value={categories_id}
            onChange={(value) => setCategoriesId(value)}
            placeholder="Chọn thể loại"
          >
            <Option value="thể loại 1">Thể loại 1</Option>
            <Option value="thể loại 2">Thể loại 2</Option>
            <Option value="thể loại 3">Thể loại 3</Option>
          </Select>
        </Form.Item>

        <Form.Item label="Chọn ảnh (1–10 ảnh)">
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleImageChange}
          />
        </Form.Item>

        {previewUrls.length > 0 && (
          <Form.Item label="Xem trước ảnh đã chọn">
            <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
              {previewUrls.map((url, index) => (
                <Image
                  key={index}
                  src={url}
                  alt={`Ảnh ${index + 1}`}
                  width={100}
                  height={100}
                  style={{ objectFit: "cover", borderRadius: 6 }}
                />
              ))}
            </div>
          </Form.Item>
        )}
      </Form>
    </Modal>
  );
};

export default ModalCreateImage;

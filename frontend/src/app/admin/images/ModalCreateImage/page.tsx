"use client";

import { Modal, Form, Input, Upload, Button, message, Select } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useState } from "react";
import { toast } from "react-toastify";
import type { UploadFile } from "antd/es/upload/interface";
import imageServices from "@/app/services/image.services";
import { ICategory } from "@/types/index";

interface ModalCreateImageProps {
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
  category: ICategory[] | [];
  handleGetAllImage: () => void;
}

const ModalCreateImage = ({
  show,
  setShow,
  category,
  handleGetAllImage,
}: ModalCreateImageProps) => {
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [titles, setTitles] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>("");

  const handleCancel = () => {
    setShow(false);
    setFileList([]);
    setTitles([]);
    setSelectedCategoryId("");
  };

  const handleUploadChange = ({
    fileList: newList,
  }: {
    fileList: UploadFile[];
  }) => {
    const existingNames = fileList.map((file) => file.name);

    const filteredList = newList.filter((file) => {
      if (existingNames.includes(file.name)) {
        message.warning(`Ảnh "${file.name}" đã được chọn rồi.`);
        return false;
      }
      return true;
    });

    const updatedList = [...fileList, ...filteredList];
    setFileList(updatedList);
    setTitles(updatedList.map((_, i) => titles[i] || ""));
  };

  const handleTitleChange = (index: number, value: string) => {
    const newTitles = [...titles];
    newTitles[index] = value;
    setTitles(newTitles);
  };

  const handleSubmit = async () => {
    if (!selectedCategoryId) {
      toast.warning("Vui lòng chọn danh mục.");
      return;
    }

    if (fileList.length === 0) {
      toast.warning("Vui lòng chọn ít nhất một ảnh.");
      return;
    }

    const hasEmptyTitle = titles.some((title) => !title.trim());
    if (hasEmptyTitle) {
      toast.warning("Vui lòng nhập đầy đủ tiêu đề cho tất cả ảnh.");
      return;
    }

    const formData = new FormData();
    fileList.forEach((file) => {
      if (file.originFileObj) {
        formData.append("images", file.originFileObj);
      }
    });
    titles.forEach((title) => {
      formData.append("titles", title);
    });
    formData.append("categories_id", selectedCategoryId);

    setLoading(true);
    try {
      const res = await imageServices.createImage(formData);
      if (res.errCode === 0) {
        toast.success("Tải ảnh thành công!");
        handleGetAllImage();
        handleCancel();
      } else {
        toast.error(res.message || "Tải ảnh thất bại.");
      }
    } catch (error) {
      toast.error("Đã xảy ra lỗi khi tải ảnh.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      title="Tạo mới hình ảnh"
      open={show}
      onCancel={handleCancel}
      onOk={handleSubmit}
      okText="Tải lên"
      confirmLoading={loading}
    >
      <Form layout="vertical">
        <Form.Item label="Chọn danh mục ảnh" required>
          <Select
            placeholder="Chọn danh mục"
            value={selectedCategoryId || undefined}
            onChange={(value) => setSelectedCategoryId(value)}
          >
            {category.map((cat) => (
              <Select.Option key={cat.categories_id} value={cat.categories_id}>
                {cat.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item label="Chọn ảnh (tối đa 10 ảnh)">
          <Upload
            multiple
            listType="picture-card"
            fileList={fileList}
            beforeUpload={() => false}
            onChange={handleUploadChange}
            maxCount={10}
          >
            {fileList.length >= 10 ? null : (
              <div>
                <PlusOutlined />
                <div style={{ marginTop: 8 }}>Upload</div>
              </div>
            )}
          </Upload>
        </Form.Item>

        {fileList.map((file, index) => (
          <Form.Item key={file.uid} label={`Tiêu đề ảnh ${index + 1}`} required>
            <Input
              value={titles[index]}
              onChange={(e) => handleTitleChange(index, e.target.value)}
              placeholder={`Nhập tiêu đề cho ảnh ${index + 1}`}
            />
          </Form.Item>
        ))}
      </Form>
    </Modal>
  );
};

export default ModalCreateImage;

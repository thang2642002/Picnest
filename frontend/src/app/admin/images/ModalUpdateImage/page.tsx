"use client";

import React, { useEffect, useState } from "react";
import { Modal, Form, Input, Select, Image, message } from "antd";
import { toast } from "react-toastify";
import { IImage, ICategory } from "@/types/index";
import imageServices from "@/app/services/image.services";

interface MenuModalProps {
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
  imageSelected: IImage | null;
  category: ICategory[] | [];
  handleGetAllImage: () => void;
  setImageSelected: React.Dispatch<React.SetStateAction<IImage | null>>;
}

const ModalUpdateImage: React.FC<MenuModalProps> = ({
  show,
  setShow,
  imageSelected,
  category,
  handleGetAllImage,
  setImageSelected,
}) => {
  const { Option } = Select;
  const [title, setTitle] = useState<string>("");
  const [categories_id, setCategoriesId] = useState<string>("");
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const handleCancel = () => {
    setShow(false);
    setTitle("");
    setCategoriesId("");
    setImageFiles([]);
    setPreviewUrls([]);
    setImageSelected(null);
  };

  useEffect(() => {
    if (imageSelected) {
      setTitle(imageSelected.title || "");
      setCategoriesId(imageSelected.categories_id || "");
      setPreviewUrls([imageSelected.url]);
      setImageFiles([]);
    }
  }, [imageSelected]);

  const handleOk = async () => {
    if (!title || !categories_id) {
      toast.warning("Vui lòng nhập đầy đủ thông tin");
      return;
    }

    if (!imageSelected) {
      toast.error("Không tìm thấy ảnh cần cập nhật");
      return;
    }

    try {
      setLoading(true);

      const response = await imageServices.updateImage(imageSelected.image_id, {
        titles: [title],
        categories_id,
        files: imageFiles.length > 0 ? imageFiles : [null],
      });

      if (response && response.errCode === 0) {
        toast.success("Thay đổi hình ảnh thành công");
        await new Promise((res) => setTimeout(res, 2000));
        handleGetAllImage();
        handleCancel();
      } else {
        toast.error("Thay đổi hình ảnh thất bại");
      }
    } catch (error) {
      console.error("Lỗi khi cập nhật hình ảnh:", error);
      toast.error("Đã xảy ra lỗi khi cập nhật hình ảnh");
    } finally {
      setLoading(false);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const file = files[0];

    setImageFiles([file]);
    setPreviewUrls([URL.createObjectURL(file)]);

    e.target.value = "";
  };

  return (
    <Modal
      title="Chỉnh sửa hình ảnh"
      open={show}
      onOk={handleOk}
      onCancel={handleCancel}
      okText="Chỉnh sửa"
      cancelText="Hủy"
      confirmLoading={loading}
    >
      <Form layout="vertical">
        <Form.Item label="Tên ảnh">
          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Nhập tên ảnh"
          />
        </Form.Item>

        <Form.Item label="Thể loại">
          <Select
            value={categories_id}
            onChange={(value) => setCategoriesId(value)}
            placeholder="Chọn thể loại"
          >
            {category.map((cat) => (
              <Option key={cat.categories_id} value={cat.categories_id}>
                {cat.name}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item label="Chọn ảnh (1 ảnh)">
          <input type="file" accept="image/*" onChange={handleImageChange} />
        </Form.Item>

        {previewUrls.length > 0 && (
          <Form.Item label="Xem trước ảnh">
            <div style={{ display: "flex", gap: 10 }}>
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

export default ModalUpdateImage;

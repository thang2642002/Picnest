"use client";

import { Button, Typography, Row, Col } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { toast } from "react-toastify";
import ModalCreateImage from "./ModalCreateImage/page";
import ModalUpdateImage from "./ModalUpdateImage/page";
import TableImage from "./TableImage/TableImage";
import { useEffect, useState } from "react";
import { IImage, ApiResponse, ICategory } from "@/types/index";
import imageServices from "@/app/services/image.services";
import categoryServices from "@/app/services/category.services";
const { Title } = Typography;

export default function Image() {
  const [dataImage, setDataImage] = useState<ApiResponse<IImage[]> | null>(
    null
  );
  const [showModalCreateImage, setShowModalCreateImage] =
    useState<boolean>(false);
  const [showModalUpdateImage, setShowModalUpdateImage] =
    useState<boolean>(false);
  const [category, setCategory] = useState<ICategory[]>([]);
  const [imageSelected, setImageSelected] = useState<IImage | null>(null);

  const handleDelete = async (image_id: string) => {
    try {
      const response = await imageServices.deleteImage(image_id);
      if (response && response.errCode === 0) {
        toast.success("Xóa hình ảnh thành công");
        handleGetAllImage();
      } else {
        toast.error("Xóa hình ảnh thất bại");
      }
    } catch (error) {
      toast.error("Lỗi server rồi");
      console.log(error);
    }
  };

  const handleGetAllImage = async () => {
    try {
      const data = await imageServices.getAllImage();

      if (data && data.errCode === 0) {
        setDataImage(data);
      }
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  const handleGetAllCategory = async () => {
    try {
      const data = await categoryServices.getAllCategory();
      if (data && data.errCode === 0 && data?.data) {
        setCategory(data?.data);
      } else {
        setCategory([]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleGetAllImage();
    handleGetAllCategory();
  }, []);

  return (
    <div style={{ padding: 24 }}>
      <Row justify="space-between" align="middle" style={{ marginBottom: 16 }}>
        <Col>
          <Title level={3} style={{ margin: 0 }}>
            Quản lý ảnh
          </Title>
        </Col>
        <Col>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            size="middle"
            onClick={() => setShowModalCreateImage(true)}
          >
            Thêm ảnh mới
          </Button>
        </Col>
      </Row>

      <ModalCreateImage
        show={showModalCreateImage}
        setShow={setShowModalCreateImage}
        category={category}
        handleGetAllImage={handleGetAllImage}
      />

      <ModalUpdateImage
        show={showModalUpdateImage}
        setShow={setShowModalUpdateImage}
        imageSelected={imageSelected}
        category={category}
        handleGetAllImage={handleGetAllImage}
        setImageSelected={setImageSelected}
      />

      <TableImage
        dataImage={dataImage}
        setShowModalUpdateImage={setShowModalUpdateImage}
        handleDelete={handleDelete}
        setImageSelected={setImageSelected}
      />
    </div>
  );
}

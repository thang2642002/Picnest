"use client";

import { Button, Typography, Row, Col, message } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import ModalCreateImage from "./ModalCreateImage/page";
import ModalUpdateImage from "./ModalUpdateImage/page";
import TableImage from "./TableImage/TableImage";
import { useEffect, useState } from "react";
import { IImage, ApiResponse } from "@/types/index";
import imageServices from "@/app/services/image.services";
const { Title } = Typography;

const data = [
  {
    key: "1",
    id: "U001",
    url: "link 1",
    title: "ảnh 2",
    category_id: "thể loại 1",
  },
  {
    key: "2",
    id: "U002",
    url: "link 2",
    title: "ảnh 2",
    category_id: "thể loại 2",
  },
];

export default function Image() {
  const [dataImage, setDataImage] = useState<ApiResponse<IImage[]> | null>(
    null
  );
  const [showModalCreateImage, setShowModalCreateImage] =
    useState<boolean>(false);
  const [showModalUpdateImage, setShowModalUpdateImage] =
    useState<boolean>(false);
  const [images, setImages] = useState<any[]>([]); // ✅ Dữ liệu ảnh động
  // ✅ Xử lý thêm ảnh từ Modal
  const onCreateImages = (
    newImages: {
      url: string;
      title: string;
      category_id: string;
    }[]
  ) => {
    const enhancedImages = newImages.map((img, index) => ({
      ...img,
      id: `IMG-${Date.now()}-${index}`, // tạo ID tạm
      key: `IMG-${Date.now()}-${index}`,
    }));

    setImages((prev) => [...enhancedImages, ...prev]); // thêm vào danh sách
    message.success("Đã thêm ảnh thành công!");
  };
  const handleDelete = (key: string) => {
    message.success(`Đã xóa ảnh có ID: ${key}`);
    // TODO: gọi API xóa ở đây
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

  useEffect(() => {
    handleGetAllImage();
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
        onCreateImages={onCreateImages}
      />

      <ModalUpdateImage
        show={showModalUpdateImage}
        setShow={setShowModalUpdateImage}
        onCreateImages={onCreateImages}
      />

      <TableImage
        dataImage={dataImage}
        setShowModalUpdateImage={setShowModalUpdateImage}
        handleDelete={handleDelete}
      />
    </div>
  );
}

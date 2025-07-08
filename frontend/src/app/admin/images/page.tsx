"use client";

import {
  Table,
  Button,
  Space,
  Typography,
  Row,
  Col,
  Popconfirm,
  message,
} from "antd";
import { PlusOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import ModalCreateImage from "./ModalCreateImage/page";
import ModalUpdateImage from "./ModalUpdateImage/page";
import { useState } from "react";
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

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "link ảnh",
      dataIndex: "url",
      key: "name",
    },
    {
      title: "tên ảnh",
      dataIndex: "title",
      key: "slug",
    },
    {
      title: "Thể loại",
      dataIndex: "category_id",
      key: "category_id",
    },
    {
      title: "Hành động",
      key: "action",
      render: (_: any, record: any) => (
        <Space size="middle">
          <Button
            icon={<EditOutlined />}
            type="primary"
            size="small"
            onClick={() => setShowModalUpdateImage(true)}
          >
            Cập nhật
          </Button>
          <Popconfirm
            title="Bạn có chắc muốn xóa ảnh này?"
            onConfirm={() => handleDelete(record.id)}
            okText="Xóa"
            cancelText="Hủy"
          >
            <Button icon={<DeleteOutlined />} danger size="small">
              Xóa
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

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

      <Table
        columns={columns}
        dataSource={data}
        pagination={{ pageSize: 5 }}
        bordered
      />
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
    </div>
  );
}

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
          <Button icon={<EditOutlined />} type="primary" size="small">
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
          <Button type="primary" icon={<PlusOutlined />} size="middle">
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
    </div>
  );
}

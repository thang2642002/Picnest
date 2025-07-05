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
    name: "thể loại 1",
    slug: "mô tả thể loại 1",
    menu_id: "menu 1",
  },
  {
    key: "2",
    id: "U002",
    name: "thể loại 2",
    slug: "mô tả thể loại 2",
    menu_id: " menu 2",
  },
];

export default function Category() {
  const handleDelete = (key: string) => {
    message.success(`Đã xóa người dùng có ID: ${key}`);
    // TODO: gọi API xóa ở đây
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Tên menu",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "slug",
      dataIndex: "slug",
      key: "slug",
    },
    {
      title: "menu",
      dataIndex: "menu_id",
      key: "menu_id",
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
            title="Bạn có chắc muốn xóa thể loại này?"
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
            Quản lý thể loại
          </Title>
        </Col>
        <Col>
          <Button type="primary" icon={<PlusOutlined />} size="middle">
            Thêm thể loại mới
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

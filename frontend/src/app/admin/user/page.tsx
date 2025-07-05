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
    username: "admin123",
    password: "******",
    role: "Admin",
  },
  {
    key: "2",
    id: "U002",
    username: "user456",
    password: "******",
    role: "User",
  },
];

export default function UserPage() {
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
      title: "Tên đăng nhập",
      dataIndex: "username",
      key: "username",
    },
    {
      title: "Mật khẩu",
      dataIndex: "password",
      key: "password",
    },
    {
      title: "Quyền",
      dataIndex: "role",
      key: "role",
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
            title="Bạn có chắc muốn xóa người dùng này?"
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
            Quản lý người dùng
          </Title>
        </Col>
        <Col>
          <Button type="primary" icon={<PlusOutlined />} size="middle">
            Thêm người dùng
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

"use client";

import { Card, Row, Col, Typography, Avatar } from "antd";
import {
  CloudUploadOutlined,
  UserOutlined,
  PictureOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { Image } from "antd";

const { Title, Paragraph } = Typography;

const features = [
  {
    icon: <CloudUploadOutlined style={{ fontSize: 32, color: "#1677ff" }} />,
    title: "Tải ảnh dễ dàng",
    description:
      "Cho phép người dùng upload ảnh nhanh chóng chỉ với vài cú click.",
  },
  {
    icon: <PictureOutlined style={{ fontSize: 32, color: "#52c41a" }} />,
    title: "Xem và quản lý ảnh",
    description: "Xem trước ảnh, phân loại, chỉnh sửa hoặc xóa ảnh dễ dàng.",
  },
  {
    icon: <UserOutlined style={{ fontSize: 32, color: "#faad14" }} />,
    title: "Quản lý người dùng",
    description:
      "Xem danh sách người dùng đã đăng ký, phân quyền và theo dõi hoạt động.",
  },
  {
    icon: <SettingOutlined style={{ fontSize: 32, color: "#eb2f96" }} />,
    title: "Cài đặt hệ thống",
    description:
      "Tùy chỉnh cấu hình hệ thống, phân quyền, giới hạn dung lượng,...",
  },
];

export default function AdminIntroPage() {
  return (
    <div
      style={{
        padding: "24px 0",
        display: "flex",
        flexDirection: "column",
        gap: 32,
      }}
    >
      {/* Lời chào */}
      <div style={{ textAlign: "center" }}>
        <Avatar size={80} icon={<UserOutlined />} />
        <Title level={2} style={{ marginTop: 16 }}>
          Chào mừng bạn đến với trang quản trị
        </Title>
        <Paragraph type="secondary">
          Đây là hệ thống quản lý web upload ảnh. Tại đây bạn có thể kiểm soát
          toàn bộ nội dung và người dùng.
        </Paragraph>
      </div>

      {/* Các tính năng chính */}
      <Row gutter={[24, 24]} justify="center">
        {features.map((item, index) => (
          <Col key={index} xs={24} sm={12} md={12} lg={8} xl={6}>
            <Card
              bordered
              hoverable
              style={{ textAlign: "center", height: "100%" }}
            >
              {item.icon}
              <Title level={4} style={{ marginTop: 12 }}>
                {item.title}
              </Title>
              <Paragraph type="secondary">{item.description}</Paragraph>
            </Card>
          </Col>
        ))}
      </Row>
      <div>
        <Title level={3} style={{ textAlign: "center", marginBottom: 24 }}>
          Ảnh mẫu gần đây
        </Title>
        <Row gutter={[16, 16]} justify="center">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <Col key={i} xs={12} sm={8} md={6} lg={4}>
              <img
                src={`https://picsum.photos/seed/demo${i}/300/300`}
                alt={`Demo ${i}`}
                style={{
                  width: "100%",
                  borderRadius: 8,
                  objectFit: "cover",
                  display: "block",
                }}
              />
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
}

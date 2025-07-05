"use client";

import { Layout, Typography } from "antd";

const { Footer } = Layout;
const { Text } = Typography;

const AdminFooter = () => {
  return (
    <Footer
      style={{ textAlign: "center", padding: "16px 0", background: "#f9f9f9" }}
    >
      <Text type="secondary">
        © {new Date().getFullYear()} — Hệ thống quản lý upload ảnh.
      </Text>
    </Footer>
  );
};

export default AdminFooter;

"use client";

import { Button, Typography, Row, Col, message } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import ModalCreateMenu from "./modalCreateMenu/page";
import ModalUpdateMenu from "./modalUpdateMenu/page";
import TableMenu from "./tableMenu/page";
import menuService from "@/app/services/menu.services";
import { ApiResponse, IMenu } from "@/app/types";
const { Title } = Typography;
import { useEffect, useState } from "react";

export default function MenuPage() {
  const [dataMenu, setDataMenu] = useState<ApiResponse<IMenu[]> | null>(null);
  const [showModalCreateMenu, setShowModalCreateMenu] =
    useState<boolean>(false);
  const [showModalUpdateMenu, setShowModalUpdateMenu] =
    useState<boolean>(false);

  const handleDelete = (key: string) => {
    message.success(`Đã xóa người dùng có ID: ${key}`);
  };

  const handleGetAllMenu = async () => {
    try {
      const data = await menuService.getAllMenu();
      if (data.errCode === 0) {
        setDataMenu(data);
      }
    } catch (error) {
      console.log("Lỗi khi lấy menu:", error);
    }
  };

  useEffect(() => {
    handleGetAllMenu();
  }, []);

  return (
    <div style={{ padding: 24 }}>
      <Row justify="space-between" align="middle" style={{ marginBottom: 16 }}>
        <Col>
          <Title level={3} style={{ margin: 0 }}>
            Quản lý menu
          </Title>
        </Col>
        <Col>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            size="middle"
            onClick={() => setShowModalCreateMenu(true)}
          >
            Thêm menu mới
          </Button>
        </Col>
      </Row>

      <ModalCreateMenu
        show={showModalCreateMenu}
        setShow={setShowModalCreateMenu}
      />
      <ModalUpdateMenu
        show={showModalUpdateMenu}
        setShow={setShowModalUpdateMenu}
      />
      <TableMenu
        setShowModalUpdateMenu={setShowModalUpdateMenu}
        handleDelete={handleDelete}
        dataMenu={dataMenu}
      />
    </div>
  );
}

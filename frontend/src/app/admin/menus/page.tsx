"use client";

import { Button, Typography, Row, Col, message } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import ModalCreateMenu from "./modalCreateMenu/page";
import ModalUpdateMenu from "./modalUpdateMenu/page";
import TableMenu from "./tableMenu/page";
import menuService from "@/app/services/menu.services";
import { ApiResponse, IMenu } from "@/app/types";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const { Title } = Typography;
export default function MenuPage() {
  const [dataMenu, setDataMenu] = useState<ApiResponse<IMenu[]> | null>(null);
  const [showModalCreateMenu, setShowModalCreateMenu] =
    useState<boolean>(false);
  const [showModalUpdateMenu, setShowModalUpdateMenu] =
    useState<boolean>(false);
  const [menuSelected, setMenuSelected] = useState<IMenu | null>(null);

  const handleDelete = async (menu_id: string) => {
    try {
      const res = await menuService.deleteMenu(menu_id);

      if (res.errCode === 0) {
        toast.success("Xóa menu thành công!");
        handleGetAllMenu();
      } else {
        toast.error(res.message || "Xóa menu thất bại!");
      }
    } catch (err) {
      console.error("Lỗi khi xóa menu:", err);
      toast.error("Đã xảy ra lỗi khi xóa!");
    }
  };

  const handleGetAllMenu = async () => {
    try {
      const data = await menuService.getAllMenu();
      if (data && data.errCode === 0) {
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
        handleGetAllMenu={handleGetAllMenu}
      />
      <ModalUpdateMenu
        show={showModalUpdateMenu}
        setShow={setShowModalUpdateMenu}
        menuSelected={menuSelected}
        handleGetAllMenu={handleGetAllMenu}
      />
      <TableMenu
        setShowModalUpdateMenu={setShowModalUpdateMenu}
        handleDelete={handleDelete}
        dataMenu={dataMenu}
        setMenuSelected={setMenuSelected}
      />
    </div>
  );
}

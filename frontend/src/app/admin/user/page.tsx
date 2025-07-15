"use client";

import { Button, Typography, Row, Col, message } from "antd";
import { PlusOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import ModalCreateUser from "./modalCreateUser/page";
import ModalUpdateUser from "./modalUpadateUser/page";
import TableUser from "./tableUser/page";
import { IUser, ApiResponse } from "@/types/index";
import UserServices from "@/app/services/user.services";

const { Title } = Typography;

export default function UserPage() {
  const [dataUser, setDataUser] = useState<ApiResponse<IUser[]> | null>(null);
  const [showModalCreateUser, setShowModalCreateUser] =
    useState<boolean>(false);
  const [showModalUpdateUser, setShowModalUpdateUser] =
    useState<boolean>(false);
  const handleDelete = (key: string) => {
    message.success(`Đã xóa người dùng có ID: ${key}`);
    // TODO: gọi API xóa ở đây
  };

  const getAllUser = async () => {
    try {
      const data = await UserServices.getAllUser();
      if (data && data.errCode === 0) {
        setDataUser(data);
      }
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  useEffect(() => {
    getAllUser();
  }, []);

  console.log("chek data user", dataUser);

  return (
    <div style={{ padding: 24 }}>
      <Row justify="space-between" align="middle" style={{ marginBottom: 16 }}>
        <Col>
          <Title level={3} style={{ margin: 0 }}>
            Quản lý người dùng
          </Title>
        </Col>
        <Col>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            size="middle"
            onClick={() => setShowModalCreateUser(true)}
          >
            Thêm người dùng
          </Button>
        </Col>
      </Row>

      <ModalCreateUser
        show={showModalCreateUser}
        setShow={setShowModalCreateUser}
      />
      <ModalUpdateUser
        show={showModalUpdateUser}
        setShow={setShowModalUpdateUser}
      />
      <TableUser
        dataUser={dataUser}
        setShowModalUpdateUser={setShowModalUpdateUser}
        handleDelete={handleDelete}
      />
    </div>
  );
}

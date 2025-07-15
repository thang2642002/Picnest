"use client";
import { useEffect, useState } from "react";
import { Button, Typography, Row, Col, message } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import ModalCreateCategory from "./modalCreateCategory/page";
import ModalUpdateCategory from "./modalUpdateCategory/page";
import TableCategory from "./tableCategory/page";
import categoryServices from "@/app/services/category.services";
import { ICategory, ApiResponse } from "@/types/index";

const { Title } = Typography;

export default function Category() {
  const [dataCategory, setDataCategory] = useState<ApiResponse<
    ICategory[]
  > | null>(null);
  const [showModalCreateCategory, setShowModalCreateCategory] =
    useState<boolean>(false);
  const [showModalUpdateCategory, setShowModalUpdateCategory] =
    useState<boolean>(false);
  const handleDelete = (key: string) => {
    message.success(`Đã xóa người dùng có ID: ${key}`);
    // TODO: gọi API xóa ở đây
  };

  const getAllCategory = async () => {
    try {
      const data = await categoryServices.getAllCategory();
      if (data && data.errCode === 0) {
        setDataCategory(data);
      }
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  useEffect(() => {
    getAllCategory();
  }, []);

  console.log("chek cateegory", dataCategory);

  return (
    <div style={{ padding: 24 }}>
      <Row justify="space-between" align="middle" style={{ marginBottom: 16 }}>
        <Col>
          <Title level={3} style={{ margin: 0 }}>
            Quản lý thể loại
          </Title>
        </Col>
        <Col>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            size="middle"
            onClick={() => setShowModalCreateCategory(true)}
          >
            Thêm thể loại mới
          </Button>
        </Col>
      </Row>

      <ModalCreateCategory
        show={showModalCreateCategory}
        setShow={setShowModalCreateCategory}
      />
      <ModalUpdateCategory
        show={showModalUpdateCategory}
        setShow={setShowModalUpdateCategory}
      />
      <TableCategory
        dataCategory={dataCategory}
        setShowModalUpdateCategory={setShowModalUpdateCategory}
        handleDelete={handleDelete}
      />
    </div>
  );
}

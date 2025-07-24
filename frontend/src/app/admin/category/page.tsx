"use client";
import { useEffect, useState } from "react";
import { Button, Typography, Row, Col, message } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { toast } from "react-toastify";
import ModalCreateCategory from "./modalCreateCategory/page";
import ModalUpdateCategory from "./modalUpdateCategory/page";
import TableCategory from "./tableCategory/page";
import categoryServices from "@/app/services/category.services";
import menuServices from "@/app/services/menu.services";
import { ICategory, ApiResponse, IMenu } from "@/types/index";

const { Title } = Typography;

export default function Category() {
  const [dataCategory, setDataCategory] = useState<ApiResponse<
    ICategory[]
  > | null>(null);
  const [showModalCreateCategory, setShowModalCreateCategory] =
    useState<boolean>(false);
  const [showModalUpdateCategory, setShowModalUpdateCategory] =
    useState<boolean>(false);
  const [menu, setMenu] = useState<IMenu[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<ICategory | null>(
    null
  );
  const handleDelete = async (categoryId: string) => {
    try {
      const response = await categoryServices.deleteCategory(categoryId);
      if (response && response.errCode === 0) {
        getAllCategory();
        toast.success("Xóa thể loại thành công");
      } else {
        toast.error("Xóa thể loại thất bại");
      }
    } catch (error) {
      toast.error("Lỗi server rồi");
      console.log(error);
    }
  };

  const getAllMenu = async () => {
    try {
      const response = await menuServices.getAllMenu();
      if (response && response.errCode === 0 && response.data) {
        setMenu(response?.data);
      } else {
        setMenu([]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getAllCategory = async () => {
    try {
      const data = await categoryServices.getAllCategory();
      if (data && data.errCode === 0) {
        setDataCategory(data);
      } else {
      }
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  useEffect(() => {
    getAllCategory();
    getAllMenu();
  }, []);

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
        menu={menu}
        getAllCategory={getAllCategory}
      />
      <ModalUpdateCategory
        show={showModalUpdateCategory}
        setShow={setShowModalUpdateCategory}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        menu={menu}
        getAllCategory={getAllCategory}
      />
      <TableCategory
        dataCategory={dataCategory}
        setShowModalUpdateCategory={setShowModalUpdateCategory}
        handleDelete={handleDelete}
        setSelectedCategory={setSelectedCategory}
      />
    </div>
  );
}

import React from "react";
import { Table, Button, Space, Popconfirm } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { ICategory, ApiResponse } from "@/types/index";

interface TableCategoryProps {
  dataCategory: ApiResponse<ICategory[]> | null;
  setShowModalUpdateCategory: React.Dispatch<React.SetStateAction<boolean>>;
  handleDelete: (id: string) => void;
  setSelectedCategory: React.Dispatch<React.SetStateAction<ICategory | null>>;
}

const TableCategory: React.FC<TableCategoryProps> = ({
  dataCategory,
  setShowModalUpdateCategory,
  handleDelete,
  setSelectedCategory,
}) => {
  const columns = [
    {
      title: "ID",
      dataIndex: "categories_id",
      key: "id",
      width: 180,
      render: (text: string) => `${text.slice(0, 8)}...`,
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
      title: "Menu",
      key: "menu_id",
      render: (_: any, record: any) => record.menu?.name || "Không có",
    },
    {
      title: "Hành động",
      key: "action",
      render: (_: any, record: any) => (
        <Space size="middle">
          <Button
            icon={<EditOutlined />}
            type="primary"
            size="small"
            onClick={() => {
              setShowModalUpdateCategory(true);
              setSelectedCategory(record);
            }}
          >
            Cập nhật
          </Button>
          <Popconfirm
            title="Bạn có chắc muốn xóa thể loại này?"
            onConfirm={() => handleDelete(record.categories_id)}
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
    <div>
      <Table
        columns={columns}
        dataSource={dataCategory?.data || []}
        pagination={{ pageSize: 5 }}
        bordered
        scroll={{ x: "max-content" }}
      />
    </div>
  );
};

export default TableCategory;

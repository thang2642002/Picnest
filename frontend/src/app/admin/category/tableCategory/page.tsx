import React from "react";
import { Table, Button, Space, Popconfirm } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { ICategory, ApiResponse } from "@/types/index";

interface TableCategoryProps {
  dataCategory: ApiResponse<ICategory[]> | null;
  setShowModalUpdateCategory: (value: boolean) => void;
  handleDelete: (id: string) => void;
}

const TableCategory: React.FC<TableCategoryProps> = ({
  dataCategory,
  setShowModalUpdateCategory,
  handleDelete,
}) => {
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
          <Button
            icon={<EditOutlined />}
            type="primary"
            size="small"
            onClick={() => setShowModalUpdateCategory(true)}
          >
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
    <div>
      <Table
        columns={columns}
        dataSource={dataCategory?.data || []}
        pagination={{ pageSize: 5 }}
        bordered
      />
    </div>
  );
};

export default TableCategory;

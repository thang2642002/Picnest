import React from "react";
import { Table, Button, Space, Popconfirm } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { ApiResponse, IMenu } from "@/app/types";

interface TableMenuProps {
  dataMenu: ApiResponse<IMenu[]> | null;
  setShowModalUpdateMenu: (value: boolean) => void;
  handleDelete: (id: string) => void;
  setMenuSelected: (menu: IMenu) => void;
}

const TableMenu: React.FC<TableMenuProps> = ({
  dataMenu,
  setShowModalUpdateMenu,
  setMenuSelected,
  handleDelete,
}) => {
  const columns = [
    {
      title: "ID",
      dataIndex: "menu_id",
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
      title: "Hành động",
      key: "action",
      render: (_: any, record: any) => (
        <Space size="middle">
          <Button
            icon={<EditOutlined />}
            type="primary"
            size="small"
            onClick={() => {
              setMenuSelected(record);
              setShowModalUpdateMenu(true);
            }}
          >
            Cập nhật
          </Button>
          <Popconfirm
            title="Bạn có chắc muốn xóa menu này?"
            onConfirm={() => handleDelete(record.menu_id)}
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
        dataSource={dataMenu?.data || []}
        pagination={{ pageSize: 5 }}
        bordered
        rowKey="menu_id"
        scroll={{ x: "max-content" }}
      />
    </div>
  );
};

export default TableMenu;

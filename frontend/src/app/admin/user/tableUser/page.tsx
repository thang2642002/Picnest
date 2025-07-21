import React, { useEffect } from "react";
import { Table, Button, Space, Popconfirm } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { IUser, ApiResponse } from "@/types/index";

interface TableUserProps {
  dataUser: ApiResponse<IUser[]> | null;
  setShowModalUpdateUser: (value: boolean) => void;
  handleDelete: (id: string) => void;
  setUserSelected: (user: IUser) => void;
}

const TableUser: React.FC<TableUserProps> = ({
  setShowModalUpdateUser,
  handleDelete,
  dataUser,
  setUserSelected,
}) => {
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Tên đăng nhập",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Mật khẩu",
      dataIndex: "password",
      key: "password",
    },
    {
      title: "Quyền",
      dataIndex: "role",
      key: "role",
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
              setShowModalUpdateUser(true);
              setUserSelected(record);
            }}
          >
            Cập nhật
          </Button>
          <Popconfirm
            title="Bạn có chắc muốn xóa người dùng này?"
            onConfirm={() => handleDelete(record.user_id)}
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
        dataSource={dataUser?.data || []}
        pagination={{ pageSize: 5 }}
        bordered
      />
    </div>
  );
};

export default TableUser;

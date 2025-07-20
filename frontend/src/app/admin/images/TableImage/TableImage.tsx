import React from "react";
import { Table, Button, Space, Popconfirm } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { IImage, ApiResponse } from "@/types/index";

interface TableImageProps {
  dataImage: ApiResponse<IImage[]> | null;
  setShowModalUpdateImage: (value: boolean) => void;
  handleDelete: (id: string) => void;
}

const TableImage: React.FC<TableImageProps> = ({
  dataImage,
  setShowModalUpdateImage,
  handleDelete,
}) => {
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "link ảnh",
      dataIndex: "url",
      key: "name",
    },
    {
      title: "tên ảnh",
      dataIndex: "title",
      key: "slug",
    },
    {
      title: "Thể loại",
      dataIndex: "category_id",
      key: "category_id",
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
            onClick={() => setShowModalUpdateImage(true)}
          >
            Cập nhật
          </Button>
          <Popconfirm
            title="Bạn có chắc muốn xóa ảnh này?"
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
      {" "}
      <Table
        columns={columns}
        dataSource={dataImage?.data || []}
        pagination={{ pageSize: 5 }}
        bordered
      />
    </div>
  );
};

export default TableImage;

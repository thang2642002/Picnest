import React from "react";
import { Table, Button, Space, Popconfirm } from "antd";
import type { ColumnsType } from "antd/es/table";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { IImage, ApiResponse } from "@/types/index";

interface TableImageProps {
  dataImage: ApiResponse<IImage[]> | null;
  setShowModalUpdateImage: (value: boolean) => void;
  handleDelete: (id: string) => void;
  setImageSelected: (images: IImage) => void;
}

const TableImage: React.FC<TableImageProps> = ({
  dataImage,
  setShowModalUpdateImage,
  handleDelete,
  setImageSelected,
}) => {
  const columns: ColumnsType<IImage> = [
    {
      title: "ID",
      dataIndex: "image_id",
      key: "id",
      ellipsis: true,
      responsive: ["md"],
      width: 180,
      render: (text: string) => `${text.slice(0, 8)}...`,
    },
    {
      title: "Hình ảnh",
      dataIndex: "url",
      key: "url",
      align: "center" as const,
      render: (url: string) => (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <img
            src={url}
            alt="Ảnh"
            style={{
              width: 100,
              height: 100,
              objectFit: "cover",
              borderRadius: 8,
              border: "1px solid #ddd",
            }}
          />
        </div>
      ),
    },
    {
      title: "Tên ảnh",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Thể loại",
      key: "category_name",
      render: (_: any, record: any) => record?.category?.name || "Không có",
    },
    {
      title: "Hành động",
      key: "action",
      align: "center" as const,
      render: (_: any, record: any) => (
        <Space size="middle">
          <Button
            icon={<EditOutlined />}
            type="primary"
            size="small"
            onClick={() => {
              setShowModalUpdateImage(true), setImageSelected(record);
            }}
          >
            Cập nhật
          </Button>
          <Popconfirm
            title="Bạn có chắc muốn xóa ảnh này?"
            onConfirm={() => handleDelete(record.image_id)}
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
    <Table
      columns={columns}
      dataSource={dataImage?.data || []}
      rowKey="id"
      pagination={{ pageSize: 5 }}
      bordered
      scroll={{ x: "max-content" }}
    />
  );
};

export default TableImage;

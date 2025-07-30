"use client";

import { Layout, Menu, Drawer, Button, Avatar, Grid, Spin } from "antd";
import {
  MenuOutlined,
  UserOutlined,
  HomeOutlined,
  SettingOutlined,
  LogoutOutlined,
  AppstoreOutlined,
  PictureOutlined,
  FolderOpenOutlined,
  ProfileOutlined,
} from "@ant-design/icons";
import "./header.scss";
import { useState } from "react";
import { useRouter } from "next/navigation";

const { Header } = Layout;
const { useBreakpoint } = Grid;

const AdminHeader = () => {
  const screens = useBreakpoint();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const menuItems = [
    {
      key: "dashboard",
      icon: <HomeOutlined />,
      label: "Trang chủ",
    },
    {
      key: "profile",
      icon: <UserOutlined />,
      label: "Tài khoản",
    },
    {
      key: "settings",
      icon: <SettingOutlined />,
      label: "Danh mục",
      children: [
        {
          key: "menu",
          icon: <AppstoreOutlined />,
          label: "Menu",
        },
        {
          key: "images",
          icon: <PictureOutlined />,
          label: "Hình ảnh",
        },
        {
          key: "category",
          icon: <FolderOpenOutlined />,
          label: "Thể loại",
        },
        {
          key: "user",
          icon: <ProfileOutlined />,
          label: "Tài khoản",
        },
      ],
    },
    {
      key: "logout",
      icon: <LogoutOutlined />,
      label: "Đăng xuất",
    },
  ];

  const handleMenuClick = (e: any) => {
    const key = e.key;
    switch (key) {
      case "dashboard":
        router.push("/admin");
        break;
      case "users":
        router.push("/admin/user");
        break;
      case "menu":
        router.push("/admin/menus");
        break;
      case "images":
        router.push("/admin/images");
        break;
      case "category":
        router.push("/admin/category");
        break;
      case "user":
        router.push("/admin/user");
        break;
      case "profile":
        router.push("/admin/profile");
        break;
    }
    setLoading(false);
  };

  return (
    <>
      {loading && <Spin tip="Đang chuyển trang..." />}
      <Header
        style={{
          background: "#000",
          padding: "0 16px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          height: 64,
          borderBottom: "1px solid #000",
          color: "#fff",
        }}
      >
        <div className="logo" onClick={() => router.push("/")}>
          <img
            src="https://vuoong.vn/images/logo.png"
            alt="logo"
            className="img-logo"
          />
        </div>

        {screens.md ? (
          <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
            <Menu
              mode="horizontal"
              items={menuItems}
              onClick={(e) => {
                handleMenuClick(e);
                setOpen(false);
              }}
            />
            <Avatar icon={<UserOutlined />} />
          </div>
        ) : (
          <Button icon={<MenuOutlined />} onClick={() => setOpen(true)} />
        )}
      </Header>

      {/* Drawer menu cho mobile */}
      {!screens.md && (
        <Drawer
          title="Menu"
          placement="right"
          onClose={() => setOpen(false)}
          open={open}
        >
          <Menu
            mode="inline"
            items={menuItems}
            onClick={(e) => {
              handleMenuClick(e);
              setOpen(false);
            }}
          />
        </Drawer>
      )}
    </>
  );
};

export default AdminHeader;

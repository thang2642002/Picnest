"use client";

import React, { useState } from "react";
import { Input, Button, Card, Typography, message } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import "./login.scss";
import userServices from "../services/user.services";
import { UserLogin, IUser } from "@/types/index";

const { Title } = Typography;

const LoginForm = () => {
  const router = useRouter();
  const [dataUser, setDataUser] = useState<UserLogin<IUser> | null>(null);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleLogin = async () => {
    if (!email || !password) {
      toast.error("Vui lòng nhập đầy đủ thông tin");
    }
    try {
      const response = await userServices.loginUser(email, password);
      if (response && response.errCode === 0) {
        setLoading(true);
        toast.success("Đăng nhập thành công");
        const { token, user } = response?.data || {};
        if (token && user) {
          Cookies.set("token", token, { expires: 7 });
          Cookies.set("user", JSON.stringify(user), { expires: 7 });
        }
        await new Promise((resolve) => setTimeout(resolve, 2000));
        setDataUser(response.data || null);
        router.push("/admin");
      } else {
        toast.success("Đăng nhập thất bại");
      }
    } catch (err) {
      message.error("Đăng nhập thất bại!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <Card className="login-card" bordered={false}>
        <div className="login-header">
          <Title level={2}>Chào mừng bạn!</Title>
          <p>Đăng nhập để tiếp tục</p>
        </div>

        <div className="input-wrapper">
          <Input
            size="large"
            prefix={<UserOutlined />}
            placeholder="Tên đăng nhập"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="input-wrapper">
          <Input.Password
            size="large"
            prefix={<LockOutlined />}
            placeholder="Mật khẩu"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <Button
          type="primary"
          block
          size="large"
          loading={loading}
          className="login-button"
          onClick={handleLogin}
        >
          Đăng nhập
        </Button>
      </Card>
    </div>
  );
};

export default LoginForm;

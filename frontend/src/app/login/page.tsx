"use client";

import React, { useState } from "react";
import { Input, Button, Card, Typography, message } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import "./login.scss";

const { Title } = Typography;

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!username || !password) {
      message.warning("Vui lòng nhập đầy đủ thông tin!");
      return;
    }

    try {
      setLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log("Đăng nhập với:", { username, password });
      message.success("Đăng nhập thành công!");
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
            value={username}
            onChange={(e) => setUsername(e.target.value)}
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

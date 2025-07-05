"use client";

import { Row, Col } from "antd";

type ContainerProps = {
  children: React.ReactNode;
};

export default function Container({ children }: ContainerProps) {
  return (
    <Row justify="center">
      <Col span={24}>
        <div
          style={{
            maxWidth: 1280,
            margin: "0 auto",
            padding: "0 24px",
          }}
        >
          {children}
        </div>
      </Col>
    </Row>
  );
}

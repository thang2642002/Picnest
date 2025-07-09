"use client";

import { Row, Col } from "antd";

type ContainerProps = {
  children: React.ReactNode;
};

export default function Container({ children }: ContainerProps) {
  return (
    <div style={{ backgroundColor: "#000" }}>
      <Row justify="center">
        <Col span={24}>
          <div
            style={{
              margin: "0 auto",
              padding: "0 10px",
            }}
          >
            {children}
          </div>
        </Col>
      </Row>
    </div>
  );
}

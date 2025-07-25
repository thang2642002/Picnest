import Image from "next/image";
import styles from "./page.module.css";
import CardHome from "./components/CardHome/CardHome";

import { Col, Row } from "antd";
import "./globals.css";

export default function Home() {
  const data = [
    {
      title: "Sản phẩm học viên",
      url: "https://vuoong.vn/images/home/class%201.webp",
    },
    {
      title: "FEEDBACK",
      url: "https://vuoong.vn/images/home/class%203.webp",
    },
    {
      title: "BTS",
      url: "https://vuoong.vn/images/home/class%206.webp",
    },
    {
      title: "CHI PHÍ HỌC PHÍ",
      url: "https://vuoong.vn/images/home/class%205.webp",
    },
    {
      title: "THÔNG TIN CHI TIẾT",
      url: "https://vuoong.vn/images/home/class%204.webp",
    },
  ];

  return (
    <div className="container-home">
      <div className="title-home">
        Còn <span>1</span> slot
      </div>
      <div>
        <Row gutter={[20, 1]} justify="center">
          {data.map((item, index) => (
            <Col
              key={index}
              xs={24} // mobile: full width
              sm={12} // tablet: 2 cột
              md={8} // md: 3 cột
              lg={6} // lg: 4 cột
              xl={6} // xl: 4 cột
            >
              <CardHome title={item.title} url={item.url} />
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
}

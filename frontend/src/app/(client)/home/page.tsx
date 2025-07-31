import CardHome from "./components/CardHome/CardHome";

import { Col, Row } from "antd";
import "../../globals.css";

export default function Home() {
  const data = [
    {
      title: "Sản phẩm học viên",
      url: "https://vuoong.vn/images/home/class%201.webp",
      slug_url: "san-pham-hoc-vien",
    },
    {
      title: "FEEDBACK",
      url: "https://vuoong.vn/images/home/class%203.webp",
      slug_url: "feedback",
    },
    {
      title: "BTS",
      url: "https://vuoong.vn/images/home/class%206.webp",
      slug_url: "bts",
    },
    {
      title: "CHI PHÍ HỌC PHÍ",
      url: "https://vuoong.vn/images/home/class%205.webp",
      slug_url: "chi-phi-khoa-hoc",
    },
    {
      title: "THÔNG TIN CHI TIẾT",
      url: "https://vuoong.vn/images/home/class%204.webp",
      slug_url: "thong-tin-chi-tiet",
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
              <CardHome
                title={item.title}
                url={item.url}
                slug_url={item.slug_url}
              />
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
}

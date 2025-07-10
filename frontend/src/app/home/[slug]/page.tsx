"use client";

import { Row, Col } from "antd";
import "./imagePage.scss";

const data = [
  {
    id: 1,
    url: "https://vuoong.vn/images/Thuc%20Hanh/THVC%20_138_.webp",
    title: "Ảnh 1",
  },
  {
    id: 2,
    url: "https://vuoong.vn/images/Thuc%20Hanh/THVC%20_137_.webp",
    title: "Ảnh 2",
  },
  {
    id: 3,
    url: "https://vuoong.vn/images/Thuc%20Hanh/THVC%20_136_.webp",
    title: "Ảnh 3",
  },
  {
    id: 4,
    url: "https://vuoong.vn/images/Thuc%20Hanh/THVC%20_135_.webp",
    title: "Ảnh 4",
  },
  {
    id: 5,
    url: "https://vuoong.vn/images/Thuc%20Hanh/THVC%20_134_.webp",
    title: "Ảnh 5",
  },
  {
    id: 6,
    url: "https://vuoong.vn/images/Thuc%20Hanh/THVC%20_127_.webp",
    title: "Ảnh 6",
  },
  {
    id: 7,
    url: "https://vuoong.vn/images/Thuc%20Hanh/THVC%20_126_.webp",
    title: "Ảnh 6",
  },
];

const ImagePage = () => {
  return (
    <div style={{ padding: "20px" }}>
      <h1 style={{ marginBottom: "20px" }}>Bộ sưu tập</h1>

      <Row gutter={[8, 8]}>
        {data.map((img) => (
          <Col key={img.id} xs={12} sm={8} md={6} lg={4}>
            <div className="image-wrapper">
              <img src={img.url} alt={img.title} className="gallery-image" />
              <div className="overlay">
                <p className="overlay-text">{img.title}</p>
              </div>
            </div>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default ImagePage;

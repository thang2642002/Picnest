"use client";

import { Row, Col } from "antd";
import "./imagePage.scss";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import imageServices from "@/app/services/image.services";
import { IImage } from "@/types/index";

interface Params {
  slug_url: string;
}

const ImagePage = () => {
  const { slug_url } = useParams() as unknown as Params;
  const [listImage, setListImage] = useState<IImage[]>([]);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const handleGetImage = async () => {
    setIsLoading(true);
    try {
      const response = await imageServices.getImagesBySlug(slug_url);
      if (response && response.errCode === 0 && response.data) {
        setListImage(response.data);
        setIsError(false);
      } else {
        setListImage([]);
        setIsError(true);
      }
    } catch (error) {
      console.error(error);
      setIsError(true);
      setListImage([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    handleGetImage();
  }, [slug_url]);

  return (
    <div
      style={{
        minHeight: "100vh",
        margin: 0,
        padding: 0,
        boxSizing: "border-box",
        overflow: "hidden",
      }}
    >
      <h1 style={{ marginBottom: "20px", color: "#fff", marginLeft: "30px" }}>
        Bộ sưu tập
      </h1>

      {isLoading ? (
        <div style={{ color: "#fff", textAlign: "center" }}>Đang tải...</div>
      ) : isError || listImage.length === 0 ? (
        <div style={{ color: "#fff", textAlign: "center" }}>
          Chưa có hình ảnh
        </div>
      ) : (
        <Row gutter={[8, 8]}>
          {listImage.map((img) => (
            <Col key={img.image_id} xs={12} sm={8} md={6} lg={4}>
              <div className="image-wrapper">
                <img src={img.url} alt={img.title} className="gallery-image" />
                <div className="overlay">
                  <p className="overlay-text">{img.title}</p>
                </div>
              </div>
            </Col>
          ))}
        </Row>
      )}
    </div>
  );
};

export default ImagePage;

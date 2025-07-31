"use client";

import React from "react";
import "./CardHome.scss";
import { useRouter } from "next/navigation";

interface CardHomeProps {
  title: string;
  url: string;
  slug_url: string;
}

const CardHome: React.FC<CardHomeProps> = ({ title, url, slug_url }) => {
  const router = useRouter();
  return (
    <div className="card-home" onClick={() => router.push(`/home/${slug_url}`)}>
      <div className="card">
        <img src={url} alt="ảnh" className="image" />
      </div>
      <div>
        <div className="card-title">{title}</div>
      </div>
    </div>
  );
};

export default CardHome;

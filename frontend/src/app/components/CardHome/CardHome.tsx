import React from "react";
import "./CardHome.scss";

interface CardHomeProps {
  title: string;
  url: string;
}

const CardHome: React.FC<CardHomeProps> = ({ title, url }) => {
  return (
    <div className="card-home">
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

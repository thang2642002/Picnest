import {
  faFacebook,
  faInstagram,
  faTiktok,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import "./contact.scss";

const Contact: React.FC = () => {
  return (
    <div className="contact-body">
      <div className="contact-dec">
        <div className="contact-image">
          <img
            src="https://vuoong.vn/images/home/6%20PRESS.webp"
            alt="avatar"
            className="image"
          />
        </div>
      </div>
      <div className="email">vuoong.vn@gmail.com</div>
      <div className="contact-info">
        <div className="address">
          128 Lương Thế Vinh, Tân Thới Hoà, Tân Phú, Thành phố Hồ Chí Minh
        </div>
        <div className="info">0368724688 - vuoong.vn@gmail.com</div>
        <div className="social-icons">
          <FontAwesomeIcon icon={faFacebook} className="icon" />
          <FontAwesomeIcon icon={faTiktok} className="icon" />
          <FontAwesomeIcon icon={faInstagram} className="icon" />
          <FontAwesomeIcon icon={faYoutube} className="icon" />
        </div>
      </div>
      <div className="chat-message">Chat on Message</div>
    </div>
  );
};

export default Contact;

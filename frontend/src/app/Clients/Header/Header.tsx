"use client";

import React, { useEffect, useState } from "react";
import "./Header.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faTiktok,
  faInstagram,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";
import { faBars, faXmark } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/navigation";

const menuItems = [
  {
    label: "PORTFOLIOS",
    children: [
      "VUONG IMAGE",
      "LIGHTING",
      "OUTDOOR",
      "FASHION",
      "PORTRAIT",
      "BEAUTY QUEEN",
      "MAN",
      "LOOKBOOK",
      "ADVERTISING",
    ],
  },
  {
    label: "CLASS",
    children: [
      "sản phẩm học viên",
      "feedback",
      "bts",
      "chi phí khóa học",
      "thông tin chi tiết",
    ],
  },
  {
    label: "Bảng giá",
    children: [],
  },
  {
    label: "Liên hệ",
    children: [],
  },
  {
    label: "model",
    children: [],
  },
  {
    label: "Bts",
    children: [],
  },
];

const CustomHeader = () => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [activeMobileMenu, setActiveMobileMenu] = useState<string | null>(null);

  function slugify(str: string) {
    return str
      .normalize("NFD") // tách dấu
      .replace(/[\u0300-\u036f]/g, "") // xóa dấu
      .replace(/đ/g, "d")
      .replace(/Đ/g, "D")
      .replace(/\s+/g, "-") // thay khoảng trắng
      .toLowerCase(); // lowercase
  }

  // Kiểm tra kích thước màn hình
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleMobileMenu = (label: string) => {
    setActiveMobileMenu((prev) => (prev === label ? null : label));
  };

  return (
    <>
      <div className="header-container">
        <div className="logo" onClick={() => router.push("/")}>
          <img
            src="https://vuoong.vn/images/logo.png"
            alt="logo"
            className="img-logo"
          />
        </div>

        {!isMobile && (
          <div className="menu-wrapper">
            {menuItems.map((item, index) => (
              <div
                className="menu-item"
                key={index}
                onClick={() => {
                  if (item.children.length === 0) {
                    router.push(`/home/${slugify(item.label)}`);
                  }
                }}
              >
                {item.label}

                {item.children.length > 0 && (
                  <div className="dropdown">
                    {item.children.map((child, idx) => (
                      <div
                        className="dropdown-item"
                        key={idx}
                        onClick={(e) => {
                          e.stopPropagation(); // chặn sự kiện click lên cha
                          router.push(`/home/${slugify(child)}`);
                        }}
                      >
                        {child}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {!isMobile && (
          <div className="social-icons">
            <FontAwesomeIcon icon={faFacebook} className="icon" />
            <FontAwesomeIcon icon={faTiktok} className="icon" />
            <FontAwesomeIcon icon={faInstagram} className="icon" />
            <FontAwesomeIcon icon={faYoutube} className="icon" />
          </div>
        )}

        {isMobile && (
          <div className="mobile-menu-icon" onClick={() => setIsOpen(!isOpen)}>
            <FontAwesomeIcon icon={isOpen ? faXmark : faBars} />
          </div>
        )}
      </div>

      {isMobile && (
        <div className={`mobile-drawer ${isOpen ? "open" : ""}`}>
          {/* Nút đóng drawer */}
          <div className="drawer-header">
            <FontAwesomeIcon
              icon={faXmark}
              className="drawer-close-icon"
              onClick={() => setIsOpen(false)}
            />
          </div>

          {/* Menu list */}
          {menuItems.map((item, index) => (
            <div key={index}>
              <div
                className="mobile-menu-title"
                onClick={() => {
                  if (item.children.length > 0) {
                    toggleMobileMenu(item.label);
                  } else {
                    router.push(`/home/${slugify(item.label)}`);
                    setIsOpen(false);
                  }
                }}
              >
                {item.label}
              </div>

              {item.children.length > 0 && activeMobileMenu === item.label && (
                <div className="mobile-submenu">
                  {item.children.map((child, idx) => (
                    <div
                      key={idx}
                      className="mobile-subitem"
                      onClick={() => {
                        router.push(`/home/${slugify(child)}`);
                        setIsOpen(false);
                      }}
                    >
                      {child}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}

          <div className="mobile-social-icons">
            <FontAwesomeIcon icon={faFacebook} className="icon" />
            <FontAwesomeIcon icon={faTiktok} className="icon" />
            <FontAwesomeIcon icon={faInstagram} className="icon" />
            <FontAwesomeIcon icon={faYoutube} className="icon" />
          </div>
        </div>
      )}
    </>
  );
};

export default CustomHeader;

"use client";

import React, { useEffect, useState } from "react";
import "./Header.scss";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faTiktok,
  faInstagram,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";
import { faBars, faXmark } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/navigation";
import menuServices from "@/app/services/menu.services";
import { IMenuWithCategories } from "@/types/menu.interface";

const CustomHeader = () => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [activeMobileMenu, setActiveMobileMenu] = useState<string | null>(null);
  const [menu, setMenu] = useState<IMenuWithCategories[]>([]);

  function slugify(str: string) {
    return str
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/đ/g, "d")
      .replace(/Đ/g, "D")
      .replace(/\s+/g, "-")
      .toLowerCase();
  }

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

  const getAllMenu = async () => {
    try {
      const response = await menuServices.getAllMenu();
      if (response && response.errCode === 0 && response.data) {
        setMenu(response.data);
      } else {
        setMenu([]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllMenu();
  }, []);

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
            {menu.map((item, index) => {
              const hasValidChildren =
                item.categories &&
                item.categories.length > 0 &&
                item.categories.some((cat) => cat.name !== item.name);

              return (
                <div
                  className="menu-item"
                  key={index}
                  onClick={() => {
                    if (!hasValidChildren) {
                      const slug = slugify(item.name);
                      router.push(`/home/${slug}`);
                    }
                  }}
                >
                  {item.name}

                  {hasValidChildren && (
                    <div className="dropdown">
                      {item?.categories?.map((cat, idx) => {
                        if (cat.name === item.name) return null;
                        const slug = slugify(cat.name);
                        return (
                          <div
                            className="dropdown-item"
                            key={idx}
                            onClick={(e) => {
                              e.stopPropagation();
                              router.push(`/home/${slug}`);
                            }}
                          >
                            {cat.name}
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
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
          <div className="drawer-header">
            <FontAwesomeIcon
              icon={faXmark}
              className="drawer-close-icon"
              onClick={() => setIsOpen(false)}
            />
          </div>

          {menu.map((item, index) => {
            const hasValidChildren =
              item.categories &&
              item.categories.length > 0 &&
              item.categories.some((cat) => cat.name !== item.name);

            return (
              <div key={index}>
                <div
                  className="mobile-menu-title"
                  onClick={() => {
                    if (hasValidChildren) {
                      toggleMobileMenu(item.name);
                    } else {
                      const slug = slugify(item.name);
                      router.push(`/home/${slug}`);
                      setIsOpen(false);
                    }
                  }}
                >
                  {item.name}
                </div>

                {hasValidChildren && activeMobileMenu === item.name && (
                  <div className="mobile-submenu">
                    {item?.categories?.map((cat, idx) => {
                      if (cat.name === item.name) return null;
                      const slug = slugify(cat.name);
                      return (
                        <div
                          key={idx}
                          className="mobile-subitem"
                          onClick={() => {
                            router.push(`/home/${slug}`);
                            setIsOpen(false);
                          }}
                        >
                          {cat.name}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}

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

"use client";

import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import AdminHeader from "../Layout/Header/header";
import AdminFooter from "../Layout/Footer/footer";
import { Bounce, ToastContainer } from "react-toastify";

export default function AdminWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const [dataUser, setDataUser] = useState<{} | null>(null);
  const router = useRouter();
  useEffect(() => {
    const userCookie = Cookies.get("user");
    if (userCookie) {
      const user = JSON.parse(userCookie);
      setDataUser(user);
    } else {
      setDataUser(null);
      router.push("/login");
    }
  }, []);
  return (
    <>
      <AdminHeader />
      <main style={{ minHeight: "calc(100vh - 128px)", padding: 24 }}>
        {children}
      </main>
      <AdminFooter />
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
    </>
  );
}

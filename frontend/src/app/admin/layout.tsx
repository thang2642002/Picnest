import AdminHeader from "@/app/admin/Layout/Header/header";
import AdminFooter from "@/app/admin/Layout/Footer/footer";
import { Bounce, ToastContainer } from "react-toastify";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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

import AdminHeader from "@/app/admin/Layout/Header/header";
import AdminFooter from "@/app/admin/Layout/Footer/footer";

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
    </>
  );
}

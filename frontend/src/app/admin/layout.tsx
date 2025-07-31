import "antd/dist/reset.css";
import AdminWrapper from "./components/AdminWrapper";

export const metadata = {
  title: "Admin Page",
  description: "Admin layout",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AdminWrapper>{children}</AdminWrapper>;
}

import { Outlet } from "react-router";
import UserBanner from "../components/Admin/UserBanner";

export default function AdminLayout() {
  return (
    <div className="admin-layout">
      <UserBanner />
      <Outlet />
    </div>
  );
}

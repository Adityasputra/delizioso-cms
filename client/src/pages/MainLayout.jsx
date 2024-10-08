import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";

export default function MainLayout() {
  return (
    <div className="min-h-screen flex bg-gray-100">
      <div className="w-64 bg-white shadow-md">
        <Sidebar />
      </div>

      <div className="flex-1 p-6">
        <Outlet />
      </div>
    </div>
  );
}

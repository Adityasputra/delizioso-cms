import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";

export default function MainLayout() {
  return (
    <div className="min-h-screen flex bg-gray-100 overflow-hidden">
      <div className="w-64 bg-white shadow-md h-full">
        <Sidebar />
      </div>

      <div className="flex-1">
        <Outlet />
      </div>
    </div>
  );
}

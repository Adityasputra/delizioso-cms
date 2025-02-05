import { useState, useEffect, useMemo, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  MdKeyboardDoubleArrowLeft,
  MdKeyboardDoubleArrowRight,
} from "react-icons/md";
import { RxDashboard } from "react-icons/rx";
import { TbCategoryPlus } from "react-icons/tb";
import { IoIosAdd } from "react-icons/io";
import { IoPersonAddOutline } from "react-icons/io5";
import { LuUsers } from "react-icons/lu";
import { VscSignOut } from "react-icons/vsc";

import axios from "../services/axiosServices";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(true);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data } = await axios.get("/profile", {
          headers: { Authorization: `Bearer ${localStorage.access_token}` },
        });
        setUser(data);
      } catch (error) {
        console.error("Failed to fetch user", error);
      }
    };

    fetchUser();
  }, [localStorage.access_token]);

  const handleLogout = useCallback(() => {
    localStorage.clear();
    navigate("/login");
  }, [navigate]);

  const menuItems = useMemo(
    () => [
      { label: "Dashboard", icon: <RxDashboard />, path: "/" },
      { label: "Categories", icon: <TbCategoryPlus />, path: "/categories" },
      { label: "Add Cuisine", icon: <IoIosAdd />, path: "/add/cuisine" },
      { label: "Add Staff", icon: <IoPersonAddOutline />, path: "/add/staff" },
      ...(user?.role === "admin"
        ? [{ label: "Users", icon: <LuUsers />, path: "/users" }]
        : []),
    ],
    [user]
  );

  return (
    <motion.aside
      layout
      initial={{ width: isOpen ? 256 : 64 }}
      animate={{ width: isOpen ? 256 : 64 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="bg-white shadow-md h-screen flex flex-col overflow-hidden"
    >
      <div className="flex justify-end p-2">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 transition"
          aria-label="Toggle Sidebar"
        >
          {isOpen ? (
            <MdKeyboardDoubleArrowLeft />
          ) : (
            <MdKeyboardDoubleArrowRight />
          )}
        </button>
      </div>

      {/* Profil User */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex items-center gap-3 px-4 py-4 border-b"
      >
        <img
          src={user?.imageUrl || "https://via.placeholder.com/150"}
          alt="Profile"
          className={`rounded-full object-cover transition-all duration-300 ${
            isOpen ? "w-10 h-10" : "w-10 h-full "
          }`}
        />

        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex flex-col"
          >
            <span className="text-gray-700 font-semibold">
              {user?.username || "Loading..."}
            </span>
            <span className="text-gray-500 text-xs">
              {user?.role || "User"}
            </span>
          </motion.div>
        )}
      </motion.div>

      {/* Menu Sidebar */}
      <nav className="mt-4 flex-1">
        {menuItems.map((item, index) => (
          <motion.button
            key={item.path}
            onClick={() => navigate(item.path)}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex items-center gap-3 w-full px-4 py-2 text-gray-700 hover:bg-gray-100 transition"
          >
            {item.icon}
            {isOpen && <span>{item.label}</span>}
          </motion.button>
        ))}
      </nav>

      <motion.button
        onClick={handleLogout}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex items-center gap-3 w-full px-4 py-3 text-red-600 hover:bg-red-100 transition"
      >
        <VscSignOut />
        {isOpen && <span>Logout</span>}
      </motion.button>
    </motion.aside>
  );
}

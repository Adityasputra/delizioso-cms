import { useState, useEffect, useMemo, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { RxDashboard } from "react-icons/rx";
import { TbCategoryPlus } from "react-icons/tb";
import { IoIosAdd } from "react-icons/io";
import { IoPersonAddOutline } from "react-icons/io5";
import { LuUsers } from "react-icons/lu";
import { VscSignOut } from "react-icons/vsc";
import axios from "../services/axiosServices";
import ProfileUploader from "../components/ProfileUploader";

export default function Sidebar() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data } = await axios.get("/profile", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        });
        setUser(data);
      } catch (error) {
        console.error("Failed to fetch user", error);
      }
    };

    fetchUser();
  }, []);

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
      initial={{ width: 256 }}
      animate={{ width: 256 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="bg-white shadow-md h-screen flex flex-col overflow-hidden"
    >
      {/* Profil User dengan Upload */}
      <ProfileUploader user={user} setUser={setUser} />

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
            <span>{item.label}</span>
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
        <span>Logout</span>
      </motion.button>
    </motion.aside>
  );
}

import { useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import {
  MdKeyboardDoubleArrowRight,
  MdKeyboardDoubleArrowLeft,
} from "react-icons/md";

import { Link } from "react-router-dom";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <aside
      className={`bg-white shadow-md h-screen transition-all duration-300 ${
        isOpen ? "w-64" : "w-16"
      }`}
    >
      {/* Tombol Toggle Sidebar */}
      <div className="flex justify-end p-2">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 transition"
        >
          {isOpen ? (
            <MdKeyboardDoubleArrowLeft />
          ) : (
            <MdKeyboardDoubleArrowRight />
          )}
        </button>
      </div>

      {/* Menu Sidebar */}
      <nav className="mt-4 space-y-4">
        <Link
          to="/"
          className="flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-gray-100 transition"
        >
          <span className="text-xl">🏠</span>
          {isOpen && <span>Dashboard</span>}
        </Link>
        <Link
          to="/categories"
          className="flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-gray-100 transition"
        >
          <span className="text-xl">📂</span>
          {isOpen && <span>Categories</span>}
        </Link>
        <Link
          to="/settings"
          className="flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-gray-100 transition"
        >
          <span className="text-xl">⚙️</span>
          {isOpen && <span>Settings</span>}
        </Link>
      </nav>
    </aside>
  );
}

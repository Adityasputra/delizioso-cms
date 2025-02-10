import { Link } from "react-router-dom";
import { formatDate } from "../../../helper/formatDateHelper";
import { formatRupiah } from "../../../helper/rupiahFormatHelper";
import { Bounce, toast } from "react-toastify";
import axios from "../../../services/axiosServices";
import { useState } from "react";

import { GoTrash } from "react-icons/go";
import { FaRegEdit } from "react-icons/fa";
import { TbListDetails } from "react-icons/tb";
import Button from "../Button";

export default function TableCuisine({ data, onRemoveCuisine }) {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleRemoveCuisine = async (id) => {
    if (isDeleting) return;
    setIsDeleting(true);

    try {
      const token = localStorage.getItem("access_token");
      if (!token) throw new Error("No access token found");

      await axios.delete(`/cuisines/${id}/remove`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      onRemoveCuisine((prev) => prev.filter((cuisine) => cuisine.id !== id));

      toast.success("Successfully deleted cuisine!", {
        position: "top-right",
        autoClose: 3000,
        theme: "light",
        transition: Bounce,
      });
    } catch (error) {
      const message =
        error.response?.data?.message ||
        "Network error, please try again later!";
      toast.error(message, { position: "top-right", autoClose: 3000 });
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <tr>
      <td className="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
        <div className="flex pl-2 items-center gap-x-2">
          <img
            className="object-cover rounded-full h-7 w-7"
            src={data.User?.imageUrl || "https://via.placeholder.com/150"}
            alt="avatar"
          />
          <div>
            <h2 className="font-medium text-gray-800">
              {data.User?.username || "Unknown"}
            </h2>
            <p className="text-sm font-normal text-gray-600">
              {data.User?.email || "N/A"}
            </p>
          </div>
        </div>
      </td>
      <td className="px-12 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
        <div className="inline-flex items-center px-3 py-1 rounded-full gap-x-2 bg-[#181818]">
          <span className="h-1.5 w-1.5 rounded-full bg-[#fffcf9]" />
          <h2 className="text-sm font-normal text-[#fffcf9]">
            {formatRupiah(data.price)}
          </h2>
        </div>
      </td>
      <td className="px-4 py-4 text-sm text-gray-500 whitespace-nowrap">
        {data.name}
      </td>
      <td className="px-4 py-4 text-sm text-gray-500 whitespace-wrap line-clamp-1">
        {data.description}
      </td>
      <td className="px-4 py-4 text-center text-sm whitespace-nowrap">
        <p className="px-3 py-1 text-xs text-[#fffcf9] rounded-full bg-[#181818]">
          {data.Category?.name || "Unknown"}
        </p>
      </td>
      <td className="px-4 py-4 text-sm text-gray-500 whitespace-nowrap">
        {formatDate(new Date(data.createdAt))}
      </td>
      <td className="px-4 py-4 text-sm whitespace-nowrap">
        <div className="flex items-center gap-x-6">
          <Button
            onClick={() => handleRemoveCuisine(data.id)}
            disabled={isDeleting}
            className={`px-0 py-0 bg-transparent ${
              isDeleting && "opacity-50 cursor-not-allowed"
            }`}
          >
            <GoTrash className="w-5 h-5 text-gray-500 hover:text-red-500" />
          </Button>
          <Link
            className="text-gray-500 hover:text-yellow-500"
            to={`/cuisine/${data.id}/edit`}
          >
            <FaRegEdit className="w-5 h-5" />
          </Link>
          <Link
            className="text-gray-500 hover:text-yellow-500"
            to={`/cuisine/${data.id}/detail`}
          >
            <TbListDetails className="w-5 h-5" />
          </Link>
        </div>
      </td>
    </tr>
  );
}

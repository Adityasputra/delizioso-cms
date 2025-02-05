import axios from "../../../services/axiosServices";
import { Bounce, toast } from "react-toastify";
import { GoTrash } from "react-icons/go";

export default function TableCategory({ data, onRemoveCategory }) {
  const handleRemoveCategory = async (id) => {
    try {
      await axios.delete(`/categories/${id}/remove`, {
        headers: { Authorization: `Bearer ${localStorage.access_token}` },
      });

      onRemoveCategory((prevCategory) =>
        prevCategory.filter((category) => category.id !== id)
      );

      toast.success("Successfully deleted category!", {
        position: "top-right",
        autoClose: 5000,
        theme: "light",
        transition: Bounce,
      });
    } catch (error) {
      const message =
        error.response?.data.message ||
        "Network error, please try again later!";
      toast.error(message, {
        position: "top-right",
        autoClose: 5000,
      });
    }
  };

  return (
    <tr>
      <td className="px-4 py-4 text-sm font-medium text-gray-700 text-center">
        {data.name}
      </td>
      <td className="px-4 py-4 text-sm font-medium text-gray-700 text-center">
        <button
          className="text-gray-500 hover:text-red-500 transition-colors duration-200 focus:outline-none"
          onClick={() => handleRemoveCategory(data.id)}
        >
          <GoTrash className="w-5 h-5" />
        </button>
      </td>
    </tr>
  );
}

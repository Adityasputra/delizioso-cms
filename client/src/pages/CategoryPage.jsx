import { Bounce, toast } from "react-toastify";
import axios from "../services/axiosServices";
import { useEffect, useState, useCallback } from "react";
import TableCategory from "../components/ui/tables/TableCategory";

export default function CategoryPage() {
  const [name, setName] = useState("");
  const [category, setCategory] = useState([]);

  const handleAddCategory = useCallback(
    async (e) => {
        setCategory((prev) => [...prev, data]);
        toast.success("Successfully added category!", { transition: Bounce });
        setName("");
      } catch (error) {
        const message =
          error.response?.data?.message ||
          "Network error, please try again later!";
        (Array.isArray(message) ? message : [message]).forEach((msg) =>
          toast.error(msg)
        );
      }
    },
    [name]
  );

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const token = localStorage.getItem("access_token");
        if (!token) throw new Error("No access token found");

        const { data } = await axios.get("/categories", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setCategory(data);
      } catch (error) {
        toast.error("Failed to fetch categories");
      }
    };

    fetchCategories();
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
      <div className="bg-white shadow-lg rounded-lg p-4 h-auto">
        <h2 className="text-xl font-bold mb-4 text-[#181818]">Category List</h2>
        <table className="w-full border divide-y divide-gray-200">
          <thead className="bg-[#181818]">
            <tr>
              <th className="px-4 py-2 font-semibold text-[#fffcf9]">
                Category Name
              </th>
              <th className="px-4 py-2 font-semibold text-[#fffcf9]">Action</th>
            </tr>
          </thead>
          <tbody>
            {category.map((cat) => (
              <TableCategory
                key={cat.id}
                data={cat}
                onRemoveCategory={setCategory}
              />
            ))}
          </tbody>
        </table>
      </div>
      <div className="bg-white shadow-lg rounded-lg p-4 h-64">
        <h2 className="text-xl font-bold text-[#181818] mb-4">Add Category</h2>
        <form onSubmit={handleAddCategory}>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="categoryName"
            >
              Category Name
            </label>
            <input
              type="text"
              id="categoryName"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter category name"
              className="shadow border rounded w-full py-2 px-3 text-gray-700 focus:outline-none"
            />
          </div>
          <button
            type="submit"
            className="bg-[#181818] text-[#fffcf9] px-4 py-2 rounded hover:bg-gray-700 transition"
          >
            Add Category
          </button>
        </form>
      </div>
    </div>
  );
}

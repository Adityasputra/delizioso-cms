import axios from "../../services/axiosServices";
import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Bounce, toast } from "react-toastify";
import Button from "../../components/ui/Button";

export default function AddCuisinePage() {
  const [form, setForm] = useState({
    name: "",
    price: "",
    description: "",
    category: "",
    file: null,
  });

  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setForm((prev) => ({ ...prev, file }));
  };

  const handleAddCuisine = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { name, price, description, category, file } = form;
      if (!name || !price || !description || !category) {
        return toast.error("All fields are required!");
      }

      const dataUploadImage = new FormData();
      dataUploadImage.append("name", name);
      dataUploadImage.append("price", price);
      dataUploadImage.append("description", description);
      dataUploadImage.append("CategoryId", category);
      if (file) dataUploadImage.append("imgUrl", file);
      if (file) {
        console.log("File selected:", file);
      }

      console.log("Data before sending:", {
        name,
        price,
        description,
        category,
        file,
      });

      const token = localStorage.getItem("access_token");
      console.log("Token:", token);
      if (!token) {
        console.error("No access token found!");
      }

      const response = await axios.post("/cuisines", dataUploadImage, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("Response from server:", response.data);

      toast.success("Successfully added cuisine!", { transition: Bounce });
      navigate("/");
    } catch (error) {
      console.error("Error adding cuisine:", error);
      console.log("Full error response:", error.response);
      toast.error(error.response?.data?.message || "Failed to add cuisine.");
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = useCallback(async () => {
    try {
      const token = localStorage.getItem("access_token");
      if (!token) {
        console.error("No access token found!");
      }

      const { data } = await axios.get("/categories", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCategories(data);
    } catch (error) {
      console.log("Error fetching categories:", error);
    }
  }, []);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <section className="max-w-4xl w-full p-8 mx-auto bg-white rounded-lg shadow-md">
        <h2 className="text-3xl font-semibold text-center text-[#181818] mb-8 capitalize">
          Add Cuisine
        </h2>
        <form onSubmit={handleAddCuisine}>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div>
              <label className="text-gray-700 font-medium" htmlFor="name">
                Cuisine Name
              </label>
              <input
                id="name"
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Enter cuisine name"
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md focus:border-[#181818] focus:ring focus:ring-[#181818]/50 focus:ring-opacity-40 focus:outline-none hover:border-[#181818] transition-all"
              />
            </div>

            <div>
              <label className="text-gray-700 font-medium" htmlFor="price">
                Price
              </label>
              <input
                id="price"
                type="number"
                name="price"
                value={form.price}
                onChange={handleChange}
                min="0"
                placeholder="Enter price"
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md focus:border-[#181818] focus:ring focus:ring-[#181818]/50 focus:ring-opacity-40 focus:outline-none hover:border-[#181818] transition-all"
              />
            </div>

            <div>
              <label className="text-gray-700 font-medium" htmlFor="file">
                Upload Image
              </label>
              <input
                id="file"
                type="file"
                onChange={handleFileChange}
                accept="image/*"
                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-[#181818] file:text-[#fffcf9] hover:file:bg-[#383838] transition-all cursor-pointer"
              />
            </div>

            <div className="md:col-span-2">
              <label
                className="text-gray-700 font-medium"
                htmlFor="description"
              >
                Description
              </label>
              <textarea
                id="description"
                name="description"
                rows="4"
                value={form.description}
                onChange={handleChange}
                placeholder="Enter description"
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md focus:border-[#181818] focus:ring focus:ring-[#181818]/50 focus:ring-opacity-40 focus:outline-none hover:border-[#181818] transition-all"
              />
            </div>

            <div className="md:col-span-2">
              <label className="text-gray-700 font-medium" htmlFor="category">
                Categories
              </label>
              <select
                id="category"
                name="category"
                value={form.category}
                onChange={handleChange}
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md focus:border-[#181818] focus:ring focus:ring-[#181818]/50 focus:ring-opacity-40 focus:outline-none hover:border-[#181818] transition-all"
              >
                <option value="">Select a category</option>
                {categories.map((categoryItem) => (
                  <option key={categoryItem.id} value={categoryItem.id}>
                    {categoryItem.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex justify-end mt-8">
            <Button type="submit" disabled={loading}>
              {loading ? "Saving..." : "Save"}
            </Button>{" "}
          </div>
        </form>
      </section>
    </div>
  );
}

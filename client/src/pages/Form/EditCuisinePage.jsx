import axios from "../../services/axiosServices";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast, Bounce } from "react-toastify";
import Button from "../../components/ui/Button";

export default function EditCuisinePage() {
  const [form, setForm] = useState({
    name: "",
    price: "",
    description: "",
    category: "",
    imgUrl: null,
  });

  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data } = await axios.get("/categories", {
          headers: { Authorization: `Bearer ${localStorage.access_token}` },
        });
        setCategories(data);
      } catch (error) {
        console.log(error);
      }
    };

    const fetchCuisine = async () => {
      try {
        const { data } = await axios.get(`/cuisines/${id}/detail`, {
          headers: { Authorization: `Bearer ${localStorage.access_token}` },
        });

        setForm({
          name: data.name,
          price: data.price,
          description: data.description,
          category: data.CategoryId,
          imgUrl: data.imgUrl,
        });
      } catch (error) {
        console.log(error);
      }
    };

    fetchCategories();
    fetchCuisine();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleFileChange = (e) => {
    setForm({ ...form, imgUrl: e.target.files[0] });
  };

  const handleEditCuisine = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData();
      Object.entries(form).forEach(([key, value]) => {
        if (value) formData.append(key, value);
      });

      await axios.put(`/cuisines/${id}/edit`, formData, {
        headers: {
          Authorization: `Bearer ${localStorage.access_token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success("Successfully updated cuisine!", {
        autoClose: 3000,
        transition: Bounce,
      });
      navigate("/");
    } catch (error) {
      const messages = Array.isArray(error.response?.data)
        ? error.response.data
        : [error.response?.data?.message || "Something went wrong!"];

      messages.forEach((msg) => toast.error(msg, { autoClose: 3000 }));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <section className="max-w-4xl w-full p-8 mx-auto bg-white rounded-lg shadow-md">
        <h2 className="text-3xl font-semibold text-center text-[#181818] mb-8 capitalize">
          Edit Cuisine
        </h2>
        <form onSubmit={handleEditCuisine}>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {["name", "price", "description"].map((field) => (
              <div key={field}>
                <label className="text-gray-700 font-medium capitalize">
                  {field}
                </label>
                {field === "description" ? (
                  <textarea
                    name={field}
                    rows="4"
                    value={form[field]}
                    onChange={handleChange}
                    className="block w-full px-4 py-2 mt-2 border rounded-md focus:outline-none transition-colors"
                  />
                ) : (
                  <input
                    type={field === "price" ? "number" : "text"}
                    name={field}
                    value={form[field]}
                    onChange={handleChange}
                    className="block w-full px-4 py-2 mt-2 border rounded-md focus:outline-none transition-colors"
                  />
                )}
              </div>
            ))}

            <div>
              <label className="text-gray-700 font-medium">Upload Image</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="block w-full text-sm text-gray-500 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-[#181818] file:text-[#fffcf9] hover:file:bg-gray-700 transition-colors"
              />
            </div>

            <div className="md:col-span-2">
              <label className="text-gray-700 font-medium">Categories</label>
              <select
                name="category"
                value={form.category}
                onChange={handleChange}
                className="block w-full px-4 py-2 mt-2 bg-white border rounded-md focus:outline-none transition-colors"
              >
                <option value="">Select a category</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex justify-end gap-2 mt-8">
            <Button
              onClick={() => navigate("/")}
              className="bg-gray-400 hover:opacity-80"
            >
              Back
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? "Saving..." : "Save"}
            </Button>
          </div>
        </form>
      </section>
    </div>
  );
}

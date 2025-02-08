import axios from "../../services/axiosServices";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Button from "../../components/ui/Button";

export default function AddStaffPage() {
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAddStaff = async (e) => {
    e.preventDefault();
    if (loading) return;
    setLoading(true);

    try {
      await axios.post("/users", form, {
        headers: { Authorization: `Bearer ${localStorage.access_token}` },
      });

      toast.success("Successfully added new staff!", {
        position: "top-right",
        autoClose: 3000,
        theme: "light",
        transition: Bounce,
      });

      navigate("/");
    } catch (error) {
      const messages = Array.isArray(error.response?.data)
        ? error.response.data
        : [
            error.response?.data?.message ||
              "Network error, please try again later!",
          ];

      messages.forEach((msg) =>
        toast.error(msg, {
          position: "top-right",
          autoClose: 3000,
        })
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <section className="max-w-2xl w-full p-8 mx-auto bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-center text-[#181818] mb-6 capitalize">
          Add New Staff
        </h2>
        <form onSubmit={handleAddStaff}>
          <div className="grid grid-cols-1 gap-6">
            {["username", "email", "password"].map((field) => (
              <div key={field}>
                <label className="block text-gray-700 font-medium capitalize">
                  {field}
                </label>
                <input
                  type={field === "password" ? "password" : "text"}
                  name={field}
                  value={form[field]}
                  onChange={handleChange}
                  placeholder={`Enter ${field}`}
                  disabled={loading}
                  className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md focus:border-[#181818] focus:outline-none transition-colors"
                />
              </div>
            ))}
          </div>
          <div className="flex justify-end mt-8">
            <Button type="submit" disabled={loading}>
              {loading ? "Saving..." : "Save"}
            </Button>
          </div>
        </form>
      </section>
    </div>
  );
}

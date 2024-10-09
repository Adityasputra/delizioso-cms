import { Bounce, toast } from "react-toastify";
import axios from "../../services/axiosServices";
import { useEffect, useState } from "react";
import TableCategory from "./components/TableCategory";

export default function CategoryPage() {
  const [name, setName] = useState("");
  const [category, setCategory] = useState([]);

  const handleAddCategory = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios({
        method: "POST",
        url: "/categories",
        headers: {
          Authorization: `Bearer ${localStorage.access_token}`,
        },
        data: {
          name,
        },
      });

      setCategory((prevCategories) => [...prevCategories, data]);

      toast.success("Successfully added category!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });

      // Reset name input setelah berhasil menambahkan
      setName("");
    } catch (error) {
      if (error.response) {
        const errorData = error.response.data.message;
        if (Array.isArray(errorData)) {
          errorData.forEach((el) =>
            toast.error(`${el}`, {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            })
          );
        } else {
          toast.error(`${errorData}`, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        }
      } else {
        toast.error("Network error, please try again later!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }

      console.error(error);
    }
  };

  useEffect(() => {
    const fetchDataCategories = async () => {
      try {
        const { data } = await axios({
          method: "GET",
          url: "/categories",
          headers: {
            Authorization: `Bearer ${localStorage.access_token}`,
          },
        });

        console.log(data);
        setCategory(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchDataCategories();
  }, []);

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
        <div className="bg-white shadow-lg rounded-lg p-4 h-auto md:h-auto overflow-hidden">
          <h2 className="text-xl font-bold mb-4 text-[#B22222]">
            Category List
          </h2>
          <table className="w-full border divide-y divide-gray-200">
            <thead className="bg-[#FFD700]">
              <tr>
                <th
                  scope="col"
                  className="px-4 py-2 font-semiBold text-[#B22222]"
                >
                  <div className="flex items-center justify-center">
                    <span>Category Name</span>
                  </div>
                </th>
                <th
                  scope="col"
                  className="px-4 py-2 font-semiBold text-[#B22222]"
                >
                  <div className="flex items-center justify-center">
                    <span>Action</span>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              {category.map((category) => (
                <TableCategory
                  key={category.id}
                  data={category}
                  onRemoveCategory={setCategory}
                />
              ))}
            </tbody>
          </table>
        </div>

        <div className="bg-white shadow-lg rounded-lg p-4 h-64">
          <h2 className="text-xl font-bold text-[#B22222] mb-4">
            Add Category
          </h2>
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
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <button
              type="submit"
              className="bg-[#8B4513] text-white px-4 py-2 rounded hover:bg-[#B22222]"
            >
              Add Category
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

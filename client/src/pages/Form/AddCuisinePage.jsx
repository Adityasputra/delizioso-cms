import axios from "../../services/axiosServices";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Bounce, toast } from "react-toastify";

export default function AddCuisinePage() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [file, setFile] = useState(null);
  const [categories, setCategories] = useState([]);

  const navigate = useNavigate();

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleAddCuisine = async (e) => {
    e.preventDefault();

    try {
      const dataUploadImage = new FormData();
      dataUploadImage.append("name", name);
      dataUploadImage.append("price", price);
      dataUploadImage.append("description", description);
      dataUploadImage.append("CategoryId", category);
      if (file) {
        dataUploadImage.append("imgUrl", file);
      }

      await axios({
        method: "POST",
        url: "/cuisines",
        headers: {
          Authorization: `Bearer ${localStorage.access_token}`,
          "Content-Type": "multipart/form-data",
        },
        data: dataUploadImage,
      });

      toast.success("Successfully added cuisine!", {
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
      
      navigate("/");
    } catch (error) {
      if (error.response) {
        const errorData = error.response.data.message;
        // console.log(errorData, "This error data");
        errorData.map((el) =>
          toast.error(`${el}`, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          })
        );
      } else {
        toast.error("Network error, please try again later!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }

      console.error(error);
    }
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data } = await axios({
          method: "GET",
          url: "/categories",
          headers: {
            Authorization: `Bearer ${localStorage.access_token}`,
          },
        });

        setCategories(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchCategories();
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <section className="max-w-4xl w-full p-8 mx-auto bg-white rounded-lg shadow-md">
        <h2 className="text-3xl font-semibold text-center text-[#B22222] mb-8 capitalize">
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
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter cuisine name"
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md focus:border-blue-400 focus:ring focus:ring-blue-300 focus:ring-opacity-40 focus:outline-none hover:border-blue-400 transition-colors"
              />
            </div>

            <div>
              <label className="text-gray-700 font-medium" htmlFor="price">
                Price
              </label>
              <input
                id="price"
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                min="0"
                placeholder="Enter price"
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md focus:border-blue-400 focus:ring focus:ring-blue-300 focus:ring-opacity-40 focus:outline-none hover:border-blue-400 transition-colors"
              />
            </div>

            <div>
              <label
                className="text-gray-700 font-medium"
                htmlFor="imageUpload"
              >
                Upload Image
              </label>
              <input
                id="imageUpload"
                type="file"
                name="file"
                onChange={handleFileChange}
                accept="image/*"
                className="block w-full text-sm text-gray-500
                file:mr-4 file:py-2 file:px-4
                file:rounded-md file:border-0
                file:text-sm file:font-semibold
                file:bg-blue-50 file:text-[#8B4513]
                hover:file:bg-blue-100 transition-colors"
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
                rows="4"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter description"
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md focus:border-blue-400 focus:ring focus:ring-blue-300 focus:ring-opacity-40 focus:outline-none hover:border-blue-400 transition-colors"
              ></textarea>
            </div>

            <div className="md:col-span-2">
              <label className="text-gray-700 font-medium" htmlFor="category">
                Categories
              </label>
              <select
                id="CategoryId"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md focus:border-blue-400 focus:ring focus:ring-blue-300 focus:ring-opacity-40 focus:outline-none hover:border-blue-400 transition-colors"
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
            <button className="px-6 py-3 text-white bg-[#8B4513] rounded-md hover:bg-[#B22222] focus:outline-none transition-colors">
              Save
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}

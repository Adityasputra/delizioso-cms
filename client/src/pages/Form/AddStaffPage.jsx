import axios from "../../services/axiosServices";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function AddStaffPage() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleAddStaff = async (e) => {
    e.preventDefault();
    try {
      await axios({
        method: "POST",
        url: "/users",
        headers: {
          Authorization: `Bearer ${localStorage.access_token}`,
        },
        data: {
          username,
          email,
          password,
        },
      });

      toast.success("Successfully added new staff!", {
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

      console.log(error);
    }
  };

  return (
    <>
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <section className="max-w-2xl w-full p-8 mx-auto bg-white rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold text-center text-[#B22222] mb-6 capitalize">
            Add New Staff
          </h2>
          <form onSubmit={handleAddStaff}>
            <div className="grid grid-cols-1 gap-6">
              <div>
                <label
                  className="block text-gray-700 font-medium"
                  htmlFor="username"
                >
                  Username
                </label>
                <input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter username"
                  className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md focus:border-blue-400 focus:ring focus:ring-blue-300 focus:ring-opacity-40 focus:outline-none transition-colors"
                />
              </div>

              <div>
                <label
                  className="block text-gray-700 font-medium"
                  htmlFor="emailAddress"
                >
                  Email
                </label>
                <input
                  id="emailAddress"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter email"
                  className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md focus:border-blue-400 focus:ring focus:ring-blue-300 focus:ring-opacity-40 focus:outline-none transition-colors"
                />
              </div>

              <div>
                <label
                  className="block text-gray-700 font-medium"
                  htmlFor="password"
                >
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter password"
                  className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md focus:border-blue-400 focus:ring focus:ring-blue-300 focus:ring-opacity-40 focus:outline-none transition-colors"
                />
              </div>
            </div>

            <div className="flex justify-end mt-8">
              <button className="px-8 py-3 text-white bg-[#8B4513] rounded-md hover:bg-[#B22222] focus:outline-none focus:bg-gray-600 transition-colors">
                Save
              </button>
            </div>
          </form>
        </section>
      </div>
    </>
  );
}

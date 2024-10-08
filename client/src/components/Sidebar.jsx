import axios from "../services/axiosServices";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Modal from "react-modal";

Modal.setAppElement(document.getElementById("root"));

export default function Sidebar() {
  const [user, setUser] = useState([]);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [file, setFile] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchDataUser = async () => {
      try {
        const { data } = await axios({
          method: "GET",
          url: "/profile",
          headers: {
            Authorization: `Bearer ${localStorage.access_token}`,
          },
        });

        console.log(data);
        setUser(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchDataUser();
  }, []);

  const handleLogout = () => {
    try {
      localStorage.clear();
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const handleFileChange = async (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpdateImageProfile = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("imageUrl", file);

    try {
      await axios({
        method: "PUT",
        url: "/profile",
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.access_token}`,
        },
        data: formData,
      });

      setIsOpen(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <aside className="flex flex-col w-64 h-screen px-5 py-8 overflow-y-auto bg-[#DAA520] border-r rtl:border-r-0 rtl:border-l">
        <Link
          to="/"
          className="text-4xl text-center font-semiBold text-white font-vibes"
        >
          Delizioso
        </Link>
        <div className="flex flex-col justify-between flex-1 mt-6">
          <nav className="flex-1 -mx-3 space-y-3 ">
            <div className="relative mx-3">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                <svg
                  className="w-5 h-5 text-gray-400"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
              <input
                type="text"
                className="w-full py-1.5 pl-10 pr-4 text-gray-700 bg-white border rounded-md  focus:border-[#B22222] focus:ring-[#8B4513] focus:ring-opacity-40 focus:outline-none focus:ring"
                placeholder="Search"
              />
            </div>

            <Link
              className="flex items-center px-3 py-2 text-white transition-colors duration-300 transform rounded-lg hover:text-[#B22222] hover:bg-gray-100"
              to="/"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5m.75-9l3-3 2.148 2.148A12.061 12.061 0 0116.5 7.605"
                />
              </svg>
              <span className="mx-2 text-sm font-medium">Dashboard</span>
            </Link>

            <Link
              className="flex items-center px-3 py-2 text-white transition-colors duration-300 transform rounded-lg hover:text-[#B22222] hover:bg-gray-100"
              to="/add/cuisine"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
              </svg>
              <span className="mx-2 text-sm font-medium">Add Cuisine</span>
            </Link>

            <Link
              className="flex items-center px-3 py-2 text-white transition-colors duration-300 transform rounded-lg hover:bg-gray-100 hover:text-[#B22222]"
              to="/categories"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9.568 3H5.25A2.25 2.25 0 0 0 3 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 0 0 5.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 0 0 9.568 3Z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 6h.008v.008H6V6Z"
                />
              </svg>
              <span className="mx-2 text-sm font-medium">Categories</span>
            </Link>

            <Link
              className="flex items-center px-3 py-2 text-white transition-colors duration-300 transform rounded-lg hover:bg-gray-100 hover:text-[#B22222]"
              to="/add/staff"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M18 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0ZM3 19.235v-.11a6.375 6.375 0 0 1 12.75 0v.109A12.318 12.318 0 0 1 9.374 21c-2.331 0-4.512-.645-6.374-1.766Z"
                />
              </svg>

              <span className="mx-2 text-sm font-medium">Add Staff</span>
            </Link>

            {user.role === "admin" && (
              <Link
                className="flex items-center px-3 py-2 text-white transition-colors duration-300 transform rounded-lg hover:text-[#B22222] hover:bg-gray-100"
                to="/list/staff"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z"
                  />
                </svg>
                <span className="mx-2 text-sm font-medium">Users</span>
              </Link>
            )}
          </nav>

          <div className="mt-6">
            <div className="flex items-center justify-between bg-gray-100 p-2 rounded-lg mt-6">
              <button className="flex items-center gap-x-2" onClick={openModal}>
                {user.imageUrl ? (
                  <img
                    className="object-cover rounded-full h-7 w-7"
                    src={user.imageUrl}
                    alt="avatar"
                  />
                ) : (
                  <img
                    className="object-cover rounded-full h-7 w-7"
                    src="https://via.placeholder.com/150"
                    alt="avatar"
                  />
                )}
                <span className="text-sm font-medium text-gray-700">
                  {user.username}
                </span>
              </button>

              <button
                onClick={handleLogout}
                className="text-gray-500 transition-colors duration-200 rotate-180  rtl:rotate-0 hover:text-[#B22222]"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </aside>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Modal Upload Image Profile"
      >
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
          <form
            className="relative bg-white p-6 rounded-lg shadow-md w-96"
            onSubmit={handleUpdateImageProfile}
          >
            <button
              type="button"
              onClick={closeModal}
              className="absolute top-2 right-2 text-gray-500 hover:text-red-500"
            >
              ✕
            </button>

            <h2 className="text-2xl font-bold text-center mb-4">
              Upload Image
            </h2>

            <input
              type="file"
              id="file"
              name="file" 
              onChange={handleFileChange}
              accept="image/*"
              className="block w-full text-sm text-gray-500 
             file:mr-4 file:py-2 file:px-4
             file:rounded-md file:border-0 
             file:text-sm file:font-semibold
             file:bg-blue-50 file:text-[#8B4513]
             hover:file:bg-blue-100"
            />

            <button
              type="submit"
              className="mt-4 w-full bg-[#8B4513] text-white py-2 rounded-md 
             hover:bg-[#B22222] focus:outline-none focus:ring-2 
             focus:ring-blue-500 focus:ring-opacity-50"
            >
              Upload
            </button>
          </form>
        </div>
      </Modal>
    </>
  );
}

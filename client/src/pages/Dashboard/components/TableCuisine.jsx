import { Link } from "react-router-dom";
import { formatDate } from "../../../helper/formatDateHelper";
import { formatRupiah } from "../../../helper/rupiahFormatHelper";
import { Bounce, toast } from "react-toastify";
import axios from "../../../services/axiosServices";

export default function TableCuisine({ data, onRemoveCuisine }) {
  const handleRemoveCuisine = async (id) => {
    try {
      await axios({
        method: "DELETE",
        url: `/cuisines/${id}/remove`,
        headers: {
          Authorization: `Bearer ${localStorage.access_token}`,
        },
      });

      onRemoveCuisine((prevCuisine) =>
        prevCuisine.filter((cuisine) => cuisine.id !== id)
      );

      toast.success("Successfully deleted cuisine!", {
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
    } catch (error) {
      if (error.response) {
        const errorData = error.response.data.message;
        toast.error(`${errorData}`, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
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
      <tr>
        <td className="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
          <div className="inline-flex items-center gap-x-3">
            <div className="flex pl-2 items-center justify-center gap-x-2">
              {data.User.imageUrl ? (
                <img
                  className="object-cover rounded-full h-7 w-7"
                  src={data.User.imageUrl}
                  alt="avatar"
                />
              ) : (
                <img
                  className="object-cover rounded-full h-7 w-7"
                  src="https://via.placeholder.com/150"
                  alt="avatar"
                />
              )}
              <div>
                <h2 className="font-medium text-gray-800">
                  {data.User.username}
                </h2>
                <p className="text-sm font-normal text-gray-600">
                  {data.User.email}
                </p>
              </div>
            </div>
          </div>
        </td>
        <td className="px-12 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
          <div className="inline-flex items-center px-3 py-1 rounded-full gap-x-2 bg-[#ffecbd]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#B22222]" />
            <h2 className="text-sm font-normal text-[#B22222]">
              {formatRupiah(data.price)}
            </h2>
          </div>
        </td>
        <td className="px-4 py-4 text-sm text-gray-500  whitespace-nowrap">
          {data.name}
        </td>
        <td className="px-4 py-4 text-sm text-gray-500  whitespace-wrap line-clamp-1">
          {data.description}
        </td>
        <td className="px-4 py-4 text-sm whitespace-nowrap">
          <div className="flex items-center gap-x-2">
            <p className="px-3 py-1 text-xs text-[#B22222] rounded-full bg-[#ffecbd]">
              {data.Category.name}
            </p>
          </div>
        </td>
        <td className="px-4 py-4 text-sm text-gray-500  whitespace-nowrap">
          {formatDate(new Date(data.createdAt))}
        </td>
        <td className="px-4 py-4 text-sm whitespace-nowrap">
          <div className="flex items-center gap-x-6">
            <button
              className="text-gray-500 transition-colors duration-200 hover:text-red-500 focus:outline-none"
              onClick={() => handleRemoveCuisine(data.id)}
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
                  d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                />
              </svg>
            </button>
            <Link
              className="text-gray-500 transition-colors duration-200 hover:text-yellow-500 focus:outline-none"
              to={`/cuisine/${data.id}/detail`}
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
                  d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                />
              </svg>
            </Link>
            <Link
              className="text-gray-500 transition-colors duration-200 hover:text-yellow-500 focus:outline-none"
              to={`/cuisine/${data.id}/detail`}
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
                  d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m5.231 13.481L15 17.25m-4.5-15H5.625c-.621 0-1.125.504-1.125 1.125v16.5c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Zm3.75 11.625a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z"
                />
              </svg>
            </Link>
          </div>
        </td>
      </tr>
    </>
  );
}

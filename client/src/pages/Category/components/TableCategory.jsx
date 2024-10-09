import axios from "../../../services/axiosServices";
import { Bounce, toast } from "react-toastify";

export default function TableCategory({ data, onRemoveCategory }) {
  const handleRemoveCategory = async (id) => {
    try {
      await axios({
        method: "DELETE",
        url: `/categories/${id}/remove`,
        headers: {
          Authorization: `Bearer ${localStorage.access_token}`,
        },
      });

      onRemoveCategory((prevCategory) =>
        prevCategory.filter((category) => category.id !== id)
      );

      toast.success("Successfully deleted category!", {
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

      console.log(error.response, "This error");
    }
  };
  return (
    <>
      <tr>
        <td className="px-4 py-4 text-sm font-medium text-gray-700">
          <div className="flex justify-center">{data.name}</div>
        </td>
        <td className="px-4 py-4 text-sm font-medium flex justify-center text-gray-700">
          <button
            className="text-gray-500 transition-colors duration-200 hover:text-red-500 focus:outline-none"
            onClick={() => handleRemoveCategory(data.id)}
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
        </td>
      </tr>
    </>
  );
}

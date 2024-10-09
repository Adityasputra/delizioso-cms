import axios from "../../services/axiosServices";
import { useEffect, useState } from "react";
import TableCuisine from "./components/TableCuisine";

export default function Dashboard() {
  const [data, setData] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchDataCuisine = async () => {
      try {
        const { data } = await axios({
          method: "GET",
          url: "/cuisines",
          headers: {
            Authorization: `Bearer ${localStorage.access_token}`,
          },
        });

        console.log(data, "this data");
        setData(data.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchDataCuisine();
  }, []);

  useEffect(() => {
    const fetchAllUser = async () => {
      try {
        const { data } = await axios({
          method: "GET",
          url: "/users",
          headers: {
            Authorization: `Bearer ${localStorage.access_token}`,
          },
        });

        setUsers(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchAllUser();
  }, []);
  return (
    <>
      <section className="container px-4 mx-auto">
        <div className="flex items-center gap-x-3 mt-4">
          <h2 className="text-2xl font-bold text-gray-800">Management Data</h2>
          <span className="px-3 py-1 text-xs text-[#B22222] bg-[#ffecbd] rounded-full">
            {users.length} users
          </span>
        </div>

        <div className="flex flex-col mt-6">
          <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
              <div className="overflow-hidden border border-gray-200 md:rounded-lg">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-[#FFD700]">
                    <tr>
                      <th
                        scope="col"
                        className="px-4 text-sm font-semiBold text-[#B22222]"
                      >
                        <div className="flex items-center justify-center">
                          <span>Author</span>
                        </div>
                      </th>

                      <th
                        scope="col"
                        className="px-4 text-sm font-semiBold text-[#B22222]"
                      >
                        <div className="flex items-center justify-center">
                          <span>Price</span>
                        </div>
                      </th>

                      <th
                        scope="col"
                        className="px-4 py-3.5 text-sm font-semiBold text-[#B22222]"
                      >
                        <div className="flex items-center justify-center ">
                          <span>Name</span>
                        </div>
                      </th>

                      <th
                        scope="col"
                        className="px-4 py-3.5 text-sm font-semiBold text-[#B22222]"
                      >
                        <div className="flex items-center justify-center ">
                          <span>Description</span>
                        </div>
                      </th>

                      <th
                        scope="col"
                        className="px-4 py-3.5 text-sm font-semiBold text-[#B22222]"
                      >
                        <div className="flex items-center justify-center ">
                          <span>Categories</span>
                        </div>
                      </th>

                      <th
                        scope="col"
                        className="px-4 py-3.5 text-sm font-semiBold text-[#B22222]"
                      >
                        <div className="flex items-center justify-center ">
                          <span>CreatedAt</span>
                        </div>
                      </th>

                      <th
                        scope="col"
                        className="px-4 py-3.5 text-sm font-semiBold text-[#B22222]"
                      >
                        <div className="flex items-center justify-center ">
                          <span>Actions</span>
                        </div>
                      </th>
                    </tr>
                  </thead>

                  <tbody className="bg-white divide-y divide-gray-200">
                    {data.map((data) => (
                      <TableCuisine
                        key={data.id}
                        data={data}
                        onRemoveCuisine={setData}
                      />
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        {/* <div className="flex items-center justify-between mt-6">
          <a
            href="#"
            className="flex items-center px-5 py-2 text-sm text-gray-700 capitalize transition-colors duration-200 bg-white border rounded-md  hover:bg-gray-100"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-5 h-5 rtl:-scale-x-100"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18"
              />
            </svg>
            <span>previous</span>
          </a>
          <div className="items-center hidden lg:flex gap-x-3">
            <a
              href="#"
              className="px-2 py-1 text-sm text-blue-500 rounded-md bg-blue-100/60"
            >
              1
            </a>
            <a
              href="#"
              className="px-2 py-1 text-sm text-gray-500 rounded-md hover:bg-gray-100"
            >
              2
            </a>
            <a
              href="#"
              className="px-2 py-1 text-sm text-gray-500 rounded-md hover:bg-gray-100"
            >
              3
            </a>
            <a
              href="#"
              className="px-2 py-1 text-sm text-gray-500 rounded-md hover:bg-gray-100"
            >
              ...
            </a>
            <a
              href="#"
              className="px-2 py-1 text-sm text-gray-500 rounded-md hover:bg-gray-100"
            >
              12
            </a>
            <a
              href="#"
              className="px-2 py-1 text-sm text-gray-500 rounded-md hover:bg-gray-100"
            >
              13
            </a>
            <a
              href="#"
              className="px-2 py-1 text-sm text-gray-500 rounded-md hover:bg-gray-100"
            >
              14
            </a>
          </div>
          <a
            href="#"
            className="flex items-center px-5 py-2 text-sm text-gray-700 capitalize transition-colors duration-200 bg-white border rounded-md gap-x-2 hover:bg-gray-100"
          >
            <span>Next</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-5 h-5 rtl:-scale-x-100"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
              />
            </svg>
          </a>
        </div> */}
      </section>
    </>
  );
}

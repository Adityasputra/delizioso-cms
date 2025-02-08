import axios from "../services/axiosServices";
import { useEffect, useState } from "react";
import TableCuisine from "../components/ui/tables/TableCuisine";
import Button from "../components/ui/Button";

export default function Dashboard() {
  const [data, setData] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const pageSize = 6;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("access_token");
        if (!token) throw new Error("No access token found");

        const [cuisineRes, usersRes] = await Promise.all([
          axios.get(
            `/cuisines?search=${search}&page[number]=${page}&page[size]=${pageSize}`,
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          ),
          axios.get("/users", {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);

        setData(cuisineRes.data.data);
        setTotalPage(cuisineRes.data.totalPage);
        setUsers(usersRes.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [search, page]);

  const headerClass =
    "px-4 py-3.5 text-sm font-semibold text-[#FFFCF9] text-center";

  return (
    <section className="container px-4 mx-auto">
      <div className="flex items-center gap-x-3 mt-4">
        <h2 className="text-2xl font-bold text-gray-800">Management Data</h2>
        <span className="px-3 py-1 text-xs text-[#FFFCF9] bg-[#181818] rounded-full">
          {users.length} users
        </span>
      </div>

      <div className="mt-4 w-1/2">
        <input
          type="text"
          placeholder="Search cuisine..."
          className="w-full p-2 border rounded-md"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="flex flex-col">
        <div className="overflow-x-auto">
          <div className="inline-block min-w-full py-2 align-middle">
            <div className="overflow-hidden border border-gray-200 md:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-[#181818]">
                  <tr>
                    {[
                      "Author",
                      "Price",
                      "Name",
                      "Description",
                      "Categories",
                      "CreatedAt",
                      "Actions",
                    ].map((title) => (
                      <th key={title} scope="col" className={headerClass}>
                        {title}
                      </th>
                    ))}
                  </tr>
                </thead>

                <tbody className="bg-white divide-y divide-gray-200">
                  {loading ? (
                    <tr>
                      <td
                        colSpan={7}
                        className="text-center py-4 text-gray-500"
                      >
                        Loading...
                      </td>
                    </tr>
                  ) : data.length > 0 ? (
                    data.map((cuisine) => (
                      <TableCuisine
                        key={cuisine.id}
                        data={cuisine}
                        onRemoveCuisine={setData}
                      />
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan={7}
                        className="text-center py-4 text-gray-500"
                      >
                        No cuisines found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-center">
        <Button
          className={`px-4 py-2 mx-1 border-2 border-gray-300 bg-[#fffcf9] rounded-md ${
            page === 1
              ? "opacity-50 bg-white border-2 border-gray-200 cursor-not-allowed"
              : ""
          }`}
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
        >
          <p className="text-[#181818]">Previous</p>
        </Button>
        <span className="px-4 py-2 mx-1">{`Page ${page} of ${totalPage}`}</span>
        <Button
          className={`px-4 py-2 mx-1 border-2 border-gray-300 bg-[#fffcf9] rounded-md ${
            page === totalPage
              ? "opacity-50 bg-white border-2 border-gray-200 cursor-not-allowed"
              : ""
          }`}
          disabled={page === totalPage}
          onClick={() => setPage(page + 1)}
        >
          <p className="text-[#181818]">Next</p>
        </Button>
      </div>
    </section>
  );
}

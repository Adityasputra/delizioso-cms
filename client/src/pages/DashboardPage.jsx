import axios from "../services/axiosServices";
import { useEffect, useState, useCallback } from "react";
import TableCuisine from "../components/ui/tables/TableCuisine";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";

export default function Dashboard() {
  const [data, setData] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const pageSize = 6;

  const fetchData = useCallback(async () => {
    const token = localStorage.getItem("access_token");
    if (!token) return console.error("🔹 No access token found");

    setLoading(true);
    try {
      const response = await axios.get(
        `/cuisines?search=${search}&page=${page}&size=${pageSize}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const usersResponse = await axios.get("/users", {
        headers: { Authorization: `Bearer ${token}` },
      });

      setUsers(usersResponse.data || []);
      setData(response.data.data || []);
      setTotalPage(response.data.totalPages || 1);
    } catch (error) {
      console.error("❌ Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  }, [search, page, pageSize]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    setPage(1); // 🔥 Reset halaman ke 1 setiap kali pencarian berubah
  };

  const handleRemoveCuisine = (id) => {
    setData((prevData) => {
      const newData = prevData.filter((cuisine) => cuisine.id !== id);
      if (newData.length === 0 && page > 1) setPage((prev) => prev - 1);
      return newData;
    });
  };

  return (
    <section className="container px-4 mx-auto">
      <div className="flex items-center gap-x-3 mt-4">
        <h2 className="text-2xl font-bold text-gray-800">Management Data</h2>
        <span className="px-3 py-1 text-xs text-white bg-gray-900 rounded-full">
          {users.length} users
        </span>
      </div>

      <div className="mt-4 w-1/2">
        <Input
          type="text"
          placeholder="Search cuisine..."
          value={search}
          onChange={handleSearchChange}
          className="w-full"
        />
      </div>

      <div className="overflow-x-auto mt-4 border border-gray-200 rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-900 text-white">
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
                <th
                  key={title}
                  className="px-4 py-3.5 text-sm font-semibold text-center"
                >
                  {title}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {loading ? (
              <tr>
                <td colSpan={7} className="text-center py-4 text-gray-500">
                  Loading...
                </td>
              </tr>
            ) : data.length > 0 ? (
              data.map((cuisine) => (
                <TableCuisine
                  key={cuisine.id}
                  data={cuisine}
                  onRemoveCuisine={handleRemoveCuisine}
                />
              ))
            ) : (
              <tr>
                <td colSpan={7} className="text-center py-4 text-gray-500">
                  No cuisines found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="flex justify-center mt-4">
        <Button
          className={`px-4 py-2 mx-1 border-2 border-gray-300 bg-[#fffcf9] rounded-md ${
            page <= 1 ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={page <= 1}
          onClick={() => setPage((prev) => prev - 1)}
        >
          <p className="text-[#181818]">Previous</p>
        </Button>

        <span className="px-4 py-2 mx-1">{`Page ${page} of ${totalPage}`}</span>

        <Button
          className={`px-4 py-2 mx-1 border-2 border-gray-300 bg-[#fffcf9] rounded-md ${
            page >= totalPage ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={page >= totalPage}
          onClick={() => setPage((prev) => prev + 1)}
        >
          <p className="text-[#181818]">Next</p>
        </Button>
      </div>
    </section>
  );
}

import axios from "../services/axiosServices";
import { useEffect, useState } from "react";
import TableCuisine from "../components/TableCuisine";

export default function Dashboard() {
  const [data, setData] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [cuisineRes, usersRes] = await Promise.all([
          axios.get("/cuisines", {
            headers: { Authorization: `Bearer ${localStorage.access_token}` },
          }),
          axios.get("/users", {
            headers: { Authorization: `Bearer ${localStorage.access_token}` },
          }),
        ]);

        setData(cuisineRes.data.data);
        setUsers(usersRes.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

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

      <div className="flex flex-col mt-6">
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
                  ) : (
                    data.map((cuisine) => (
                      <TableCuisine
                        key={cuisine.id}
                        data={cuisine}
                        onRemoveCuisine={setData}
                      />
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

import { useEffect, useState } from "react";
import axios from "../services/axiosServices";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Input from "../components/ui/Input";
import TableUsers from "../components/ui/tables/TableUsers";
import Button from "../components/ui/Button";

export default function UserListPage() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      const token = localStorage.getItem("access_token");

      if (!token) {
        toast.error("Unauthorized: No access token found.");
        setLoading(false);
        return;
      }

      try {
        const { data } = await axios.get("/users", {
          headers: { Authorization: `Bearer ${token}` },
        });

        console.log("Fetched Users:", data);
        if (!Array.isArray(data)) {
          throw new Error("Invalid API response: Expected an array.");
        }

        setUsers(data);
      } catch (error) {
        toast.error("Failed to fetch users.");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const filteredUsers = users.filter((user) =>
    user.username?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-semibold mb-4">User List</h2>
      <div className="mb-4 flex justify-between">
        <Input
          type="text"
          placeholder="Search user..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-1/3"
        />
        <Button onClick={() => navigate("/add/staff")}>Add Staff</Button>
      </div>
      {loading ? (
        <p>Loading users...</p>
      ) : (
        <TableUsers
          headers={["Name", "Email", "Role"]}
          data={filteredUsers.map((user) => [
            user.username,
            user.email,
            user.role,
            // <div key={user.id}>
            //   <Button className="bg-red-500 text-white">Delete</Button>
            // </div>,
          ])}
        />
      )}
    </div>
  );
}

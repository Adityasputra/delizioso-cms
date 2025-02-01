import axios from "../services/axiosServices";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Button from "../components/ui/Button";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data } = await axios.post("/users/login", { email, password });
      localStorage.setItem("access_token", data.access_token);
      toast.success("Login successful!", { autoClose: 2000 });
      setTimeout(() => navigate("/"), 2000);
    } catch (err) {
      toast.error("Invalid email or password", { autoClose: 3000 });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen flex flex-col lg:flex-row">
      {/* Background Image */}
      <div className="hidden lg:flex w-1/2">
        <img
          src="./loginBG.webp"
          alt="Login"
          className="object-cover w-full h-full"
        />
      </div>

      {/* Login Form */}
      <div className="flex flex-col justify-center items-center w-full lg:w-1/2 min-h-screen p-8">
        <div className="w-full max-w-md">
          <h1 className="text-4xl font-bold mb-2 text-center">Welcome Back</h1>
          <p className="text-gray-600 text-center mb-6">
            Sign in to access your account
          </p>

          <form onSubmit={handleLogin} className="space-y-4">
            {/* Email Input */}
            <div>
              <label className="text-sm font-medium">Email</label>
              <input
                className="border bg-[#FFFCF9] py-2 px-4 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 mt-1 rounded-md"
                type="email"
                value={email}
                placeholder="Enter your email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            {/* Password Input */}
            <div>
              <label className="text-sm font-medium">Password</label>
              <input
                className="border bg-[#FFFCF9] py-2 px-4 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 mt-1 rounded-md"
                type="password"
                value={password}
                placeholder="Enter your password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            {/* Login Button */}
            <Button type="submit" disabled={loading} className="w-full">
              {loading ? "Logging in..." : "Login"}
            </Button>
          </form>

          <p className="text-gray-600 text-center mt-4">
            Don't have an account?{" "}
            <span className="text-blue-500">
              Contact Admin to create an account
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

import axios from "../services/axiosServices";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    try {
      e.preventDefault();
      const { data } = await axios({
        method: "POST",
        url: "/users/login",
        data: {
          email,
          password,
        },
      });

      localStorage.setItem("access_token", data.access_token);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div className="min-h-screen bg-[#DAA520] flex items-center justify-center">
        <div className="flex bg-white shadow-sm rounded-lg overflow-hidden max-w-sm lg:max-w-4xl w-full">
          <div
            className="hidden lg:block lg:w-1/2 bg-cover"
            style={{
              backgroundImage:
                'url("https://images.unsplash.com/photo-1593548615309-5a45c504f994?q=80&w=1376&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")',
            }}
          ></div>
          <div className="w-full p-8 lg:w-1/2">
            <form onSubmit={handleLogin}>
              <h2 className="text-2xl font-semibold text-center text-[#8B4513]">
                Delizioso
              </h2>
              <p className="text-xl text-[#2f3640] text-center">
                Welcome back!
              </p>

              <div className="mt-4 flex items-center justify-between">
                <span className="border-b w-1/5 lg:w-1/4 border-[#8B4513]"></span>
                <p className="text-xs text-center text-[#2f3640] uppercase">
                  Login with email
                </p>
                <span className="border-b w-1/5 lg:w-1/4 border-[#8B4513]"></span>
              </div>

              <div className="mt-4">
                <label className="block text-[#2f3640] text-sm font-bold mb-2">
                  Email
                </label>
                <input
                  className="bg-gray-200 text-[#2f3640] rounded py-2 px-4 block w-full appearance-none focus:outline-none focus:shadow-md"
                  type="email"
                  value={email}
                  placeholder="Enter your email"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="mt-4">
                <label className="block text-[#2f3640] text-sm font-bold mb-2">
                  Password
                </label>
                <input
                  className="bg-gray-200 text-[#2f3640] rounded py-2 px-4 block w-full appearance-none focus:outline-none focus:shadow-md"
                  type="password"
                  value={password}
                  placeholder="Enter your password"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <div className="mt-8">
                <button className="bg-[#8B4513] text-white font-bold py-2 px-4 w-full rounded hover:bg-[#B22222] transition duration-300">
                  Login
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

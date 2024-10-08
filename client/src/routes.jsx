import { createBrowserRouter, redirect } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import MainLayout from "./pages/MainLayout";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <LoginPage />,
    loader: () => {
      if (localStorage.access_token) return redirect("/");
      return null;
    },
  },
  {
    path: "/",
    element: <MainLayout />,
    loader: () => {
      if (!localStorage.access_token) return redirect("/login");
      return null;
    },
    children: [
        {
            path: "",
            element: <h1>Hello</h1>
        }
    ]
  },
]);

export default router;

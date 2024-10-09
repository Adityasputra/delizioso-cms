import { createBrowserRouter, redirect } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import MainLayout from "./pages/MainLayout";
import Dashboard from "./pages/Dashboard/DashboardPage";
import AddCuisinePage from "./pages/Form/AddCuisinePage";

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
        element: <Dashboard />,
      },
      {
        path: "/add/cuisine",
        element: <AddCuisinePage />,
      },
    ],
  },
]);

export default router;

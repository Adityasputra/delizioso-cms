import { createBrowserRouter, redirect } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import MainLayout from "./pages/MainLayout";
import Dashboard from "./pages/Dashboard/DashboardPage";
import AddCuisinePage from "./pages/Form/AddCuisinePage";
import AddStaffPage from "./pages/Form/AddStaffPage";
import CategoryPage from "./pages/Category/CategoryPage";
import CuisineDetailPage from "./pages/Cuisine/CuisineDetailPage";

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
      {
        path: "/add/staff",
        element: <AddStaffPage />,
      },
      {
        path: "/categories",
        element: <CategoryPage />,
      },
      {
        path: "/cuisine/:id/detail",
        element: <CuisineDetailPage />,
      },
    ],
  },
]);

export default router;

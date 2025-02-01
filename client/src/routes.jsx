import { createBrowserRouter, redirect } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import MainLayout from "./pages/MainLayout";
import Dashboard from "./pages/Dashboard/DashboardPage";
import AddCuisinePage from "./pages/Form/AddCuisinePage";
import AddStaffPage from "./pages/Form/AddStaffPage";
import CategoryPage from "./pages/Category/CategoryPage";
import CuisineDetailPage from "./pages/Cuisine/CuisineDetailPage";
import EditCuisinePage from "./pages/Form/EditCuisinePage";
import MobileWarning from "./pages/MobileWarning";

const checkAuth = () => {
  const token = localStorage.getItem("access_token");
  return token ? null : redirect("/login");
};

const checkAlreadyLoggedIn = () => {
  const token = localStorage.getItem("access_token");
  return token ? redirect("/") : null;
};

const checkMobile = () => {
  if (window.innerWidth < 768) {
    return redirect("/mobile-warning");
  }
  return null;
};

const router = createBrowserRouter([
  {
    path: "/login",
    element: <LoginPage />,
    loader: checkAlreadyLoggedIn,
  },
  {
    path: "/",
    element: <MainLayout />,
    loader: async () => {
      await checkAuth();
      return checkMobile();
    },
    children: [
      { path: "", element: <Dashboard /> },
      { path: "add/cuisine", element: <AddCuisinePage /> },
      { path: "add/staff", element: <AddStaffPage /> },
      { path: "categories", element: <CategoryPage /> },
      { path: "cuisine/:id/edit", element: <EditCuisinePage /> },
      { path: "cuisine/:id/detail", element: <CuisineDetailPage /> },
    ],
  },
  {
    path: "/mobile-warning",
    element: <MobileWarning />,
  },
]);

export default router;

import { createBrowserRouter, redirect } from "react-router-dom";
import { lazy, Suspense } from "react";
import MainLayout from "./pages/MainLayout";
import LoginPage from "./pages/LoginPage";

const Dashboard = lazy(() => import("./pages/Dashboard/DashboardPage"));
const AddCuisinePage = lazy(() => import("./pages/Form/AddCuisinePage"));
const AddStaffPage = lazy(() => import("./pages/Form/AddStaffPage"));
const CategoryPage = lazy(() => import("./pages/Category/CategoryPage"));
const CuisineDetailPage = lazy(() =>
  import("./pages/Cuisine/CuisineDetailPage")
);
const EditCuisinePage = lazy(() => import("./pages/Form/EditCuisinePage"));

const requireAuth = () => {
  if (!localStorage.access_token) return redirect("/login");
  return null;
};

const checkLogin = () => {
  if (localStorage.access_token) return redirect("/");
  return null;
};

const router = createBrowserRouter([
  {
    path: "/login",
    element: <LoginPage />,
    loader: checkLogin,
  },
  {
    path: "/",
    element: <MainLayout />,
    loader: requireAuth,
    children: [
      {
        path: "",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <Dashboard />
          </Suspense>
        ),
      },
      {
        path: "add/cuisine",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <AddCuisinePage />
          </Suspense>
        ),
      },
      {
        path: "add/staff",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <AddStaffPage />
          </Suspense>
        ),
      },
      {
        path: "categories",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <CategoryPage />
          </Suspense>
        ),
      },
      {
        path: "cuisine/:id/edit",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <EditCuisinePage />
          </Suspense>
        ),
      },
      {
        path: "cuisine/:id/detail",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <CuisineDetailPage />
          </Suspense>
        ),
      },
    ],
  },
]);

export default router;

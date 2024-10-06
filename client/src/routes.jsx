import { createBrowserRouter, redirect } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <h1>Login</h1>,
    loader: () => {
      if (localStorage.access_token) return redirect("/");
      return null;
    },
  },
  {
    path: "/",
    element: <hi>Hello</hi>,
  },
]);

export default router;
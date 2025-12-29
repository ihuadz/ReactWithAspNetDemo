import { createBrowserRouter } from "react-router";

import MainLayout from "@/layouts/MainLayout";

import UserManage from "@/pages/UserManage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
  },
  {
    path: "/users",
    element: <UserManage />,
  },
  {
    path: "/login",
    element: <div>Login Page</div>, // 独立于 MainLayout
  },
]);

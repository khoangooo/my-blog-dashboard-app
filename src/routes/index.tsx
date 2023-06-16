import { createBrowserRouter } from "react-router-dom";
import { ErrorPage, PermissionRequired } from "@/components/layout";
import Login from "@/modules/login";
import { PostDetails, PostsList } from "@/modules/posts";
import MainLayout from "@/modules/main-layout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <PermissionRequired><MainLayout /></PermissionRequired>,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <PostsList />,
      },
      {
        path: "/post/add",
        element: <PostDetails />,
      },
    ]
  },
  {
    path: "/login",
    element: <Login />
  },
]);

export default router;
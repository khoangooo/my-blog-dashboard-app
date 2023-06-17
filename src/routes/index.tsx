import { createBrowserRouter } from "react-router-dom";
import { ErrorPage, PrivatedRoute } from "@/components/layout";
import Login from "@/modules/login";
import { PostDetails, PostsList } from "@/modules/posts";
import MainLayout from "@/modules/main-layout";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <PrivatedRoute>
        <MainLayout />
      </PrivatedRoute>
    ),
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
import {
  createBrowserRouter,
} from "react-router-dom";
import { MainLayout, ErrorPage } from "@components/layout";
import Login from "@modules/Login";
import { PostDetails, PostsList } from "@modules/Posts";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        element: <PostsList />,
        index: true,
      },
      {
        element: <PostDetails />,
        path: "/post/add"
      },
    ]
  },
  {
    path: "/login",
    element: <Login />,
  },
]);

export default router;
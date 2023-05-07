import {
  createBrowserRouter,
} from "react-router-dom";
import {MainLayout, ErrorPage} from "../components/layout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        element: <h1>About</h1>,
        index: true
      },
    ]
  },
]);

export default router;
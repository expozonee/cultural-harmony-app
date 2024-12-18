import { HomePage } from "../pages/HomePage";
import { RootLayout } from "../layout/RootLayout";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import AdminPage from "../pages/AdminPage/AdminPage";
import AdminLayout from "../layout/AdminLayout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "/admin",
        element: <AdminLayout />,
        children: [
          {
            index: true,
            element: <AdminPage />,
          },
        ],
      },
    ],
  },
]);

export function RouterProviderComponent() {
  return <RouterProvider router={router} />;
}

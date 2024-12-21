import { HomePage } from "../pages/HomePage";
import { RootLayout } from "../layout/RootLayout";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import SignInPage from "./../pages/LoginPage/SignIn";
import SignUpPage from "./../pages/SignUp/SignUp";
import EventsList from "../components/EventsList";
import EventDescription from "../components/EventDescription";
import { eventsLoader } from "../../loaders/eventsLoader";
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
        path: "sign-up/*",
        element: <SignUpPage />,
      },
      {
        path: "sign-in/*",
        element: <SignInPage />,
      },
      {
        path: "/events",
        element: <EventsList />,
        loader: eventsLoader,
      },
      {
        path: "/events/:eventId",
        element: <EventDescription />,
      },
      {
        path: "/admin",
        element: <AdminLayout />,
        children: [
          {
            index: true,
            element: <AdminPage />,
          },
          {
            path: ":dashboard",
            element: <AdminPage />,
            loader: eventsLoader,
          },
        ],
      },
    ],
  },
]);

export function RouterProviderComponent() {
  return <RouterProvider router={router} />;
}

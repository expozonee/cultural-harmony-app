import { HomePage } from "../pages/homePage/HomePage";
import { RootLayout } from "../layout/RootLayout";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import SignInPage from "./../pages/LoginPage/SignIn";
import SignUpPage from "./../pages/SignUp/SignUp";
import EventsList from "../components/EventsList";
import EventDescription from "../components/EventDescription";
import { eventsLoader } from "../../loaders/eventsLoader";
import AdminPage from "../pages/AdminPage/AdminPage";
import AdminLayout from "../layout/AdminLayout";
import AddEventPage from "../components/add-update-EventPage/AddEventPage";
import UpdateEvent from "../components/add-update-EventPage/UpdateEvent";


const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <UpdateEvent/>,
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
            path: "events",
            element: <AdminPage dashboard={"events"} />,
            loader: eventsLoader,
          },
          {
            path: "users",
            element: <AdminPage dashboard={"users"} />,
          },
        ],
      },
    ],
  },
]);

export function RouterProviderComponent() {
  return <RouterProvider router={router} />;
}

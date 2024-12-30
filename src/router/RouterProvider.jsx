import { HomePage } from "../pages/homePage/HomePage";
import { RootLayout } from "../layout/RootLayout";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import SignInPage from "./../pages/LoginPage/SignIn";
import SignUpPage from "./../pages/SignUp/SignUp";
import EventsList from "../components/EventsList";
import EventDescription from "../components/EventDescription";
import CreatePoll from "../components/CreatePoll";
import { eventsLoader } from "../../loaders/eventsLoader";
import { upcomingEventsLoader } from "../../loaders/upcomingEventsLoader";
import AdminPage from "../pages/AdminPage/AdminPage";
import AdminLayout from "../layout/AdminLayout";
import AddEventPage from "./../pages/AddEventPage/AddEventPage";
import UpdateEventPage, {
  getEventByIdLoader,
} from "../pages/UpdateEventPage/UpdateEventPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
        loader: upcomingEventsLoader,
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
        path: "/events/add-event",
        element: <AddEventPage />,
      },
      {
        path: "/events/:eventId/update-event",
        element: <UpdateEventPage />,
        loader: getEventByIdLoader,
      },
      {
        path: "/events/:eventId",
        element: <EventDescription />,
        children: [
          {
            path: "create-poll",
            element: <CreatePoll />,
          },
        ],
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

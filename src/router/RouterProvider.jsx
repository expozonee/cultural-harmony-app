import { HomePage } from "../pages/HomePage";
import { RootLayout } from "../layout/RootLayout";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import EventsList from "../components/EventsList";
import EventDescription from "../components/EventDescription";
import { eventsLoader } from "../../loaders/eventsLoader";

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
        path: "/events",
        element: <EventsList />,
        loader: eventsLoader,
      },
      {
        path: "/events/:eventId",
        element: <EventDescription />,
      },
    ],
  },
]);

export function RouterProviderComponent() {
  return <RouterProvider router={router} />;
}

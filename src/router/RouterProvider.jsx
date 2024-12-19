import { HomePage } from "../pages/HomePage";
import { RootLayout } from "../layout/RootLayout";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import SignInPage from "./../pages/LoginPage/SignIn";
import SignUpPage from "./../pages/SignUp/SignUp";

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
    ],
  },
]);

export function RouterProviderComponent() {
  return <RouterProvider router={router} />;
}

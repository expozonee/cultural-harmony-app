import { Outlet } from "react-router";
import NavBar from "../components/NavBar/NavBar";

export function RootLayout() {
  return (
    <div>
      <NavBar />
      <Outlet />
    </div>
  );
}

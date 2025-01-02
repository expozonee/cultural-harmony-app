import { Outlet } from "react-router";
import NavBar from "../components/NavBar/NavBar";
import { LoadScript } from "@react-google-maps/api";

export function RootLayout() {
  return (
    <>
      <LoadScript
        googleMapsApiKey={import.meta.env.VITE_APP_GOOGLE_MAPS_API_KEY}
      >
        <NavBar />
        <Outlet />
      </LoadScript>
    </>
  );
}

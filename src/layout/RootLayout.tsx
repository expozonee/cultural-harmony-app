import React from "react";
import { Outlet } from "react-router";

export function RootLayout() {
  return (
    <div>
      RootLayout
      <Outlet />
    </div>
  );
}

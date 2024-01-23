import React from "react";
import { Outlet } from "react-router-dom";
import { useMediaQuery } from "@/hooks";
import { NavBar, Sidebar } from "..";

export const AppLayout: React.FC = () => {
  const isDesktop = useMediaQuery("(min-width: 1024px)");

  if (!isDesktop) {
    return (
      <main className="relative">
        <NavBar />
        <Outlet />
      </main>
    );
  }

  return (
    <div className="relative grid grid-cols-5 max-w-screen-2xl mx-auto">
      <div className="col-span-1">
        <Sidebar />
      </div>
      <div className="col-span-4">
        <Outlet />
      </div>
    </div>
  );
};

export default AppLayout;

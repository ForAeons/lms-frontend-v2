import React from "react";
import { Outlet } from "react-router-dom";
import { NavBar, Sidebar } from "..";

export const AppLayout: React.FC = () => {
	return (
		<div className="relative h-[100vh] w-[100vw] grid lg:grid-cols-5">
			<Sidebar />
			<main className="col-span-3 lg:col-span-4">
				<NavBar />
				<Outlet />
			</main>
		</div>
	);
};

export default AppLayout;

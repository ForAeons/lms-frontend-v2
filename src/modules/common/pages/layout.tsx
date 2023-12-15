import React from "react";
import { Outlet } from "react-router-dom";
import { Sidebar } from "..";

export const AppLayout: React.FC = () => {
	return (
		<div className="relative h-[100vh] w-[100vw] grid lg:grid-cols-5">
			<Sidebar />
			<div className="col-span-3 lg:col-span-4">
				<Outlet />
			</div>
		</div>
	);
};

export default AppLayout;

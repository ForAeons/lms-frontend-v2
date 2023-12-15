import React from "react";
import { Outlet } from "react-router-dom";
import { Footer, Navbar, Sidebar } from "..";

export const AppLayout: React.FC = () => {
	return (
		<div className="relative h-[100vh] w-[100vw] pb-12 flex flex-col items-center">
			<Navbar />

			<div className="grid lg:grid-cols-5 w-full h-full">
				<Sidebar />

				<div className="col-span-3 lg:col-span-4">
					<Outlet />
				</div>
			</div>

			<Footer />
		</div>
	);
};

export default AppLayout;

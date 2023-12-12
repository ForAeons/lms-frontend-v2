import React from "react";
import { Outlet } from "react-router-dom";
import { Footer, Navbar, Sidebar } from "..";

export const AppLayout: React.FC = () => {
	return (
		<div className="relative min-h-[calc(100vh+1px)] w-full flex flex-col items-center">
			<Navbar />

			<div className="flex-grow flex w-full h-full gap-3 justify-center">
				<Sidebar />

				<div className="flex-grow">
					<Outlet />
				</div>
			</div>

			<Footer />
		</div>
	);
};

export default AppLayout;

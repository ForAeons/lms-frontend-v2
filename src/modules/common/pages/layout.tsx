import React from "react";
import { Outlet } from "react-router-dom";
import { Footer, Navbar, Sidebar } from "..";
import AppLogic from "../components/app-logic";

export const AppLayout: React.FC = () => {
	return (
		<div className="relative h-[100vh] w-[100vw] px-3 pb-12 flex flex-col items-center">
			<AppLogic />
			<Navbar />

			<div className="flex flex-row gap-3 w-full h-full justify-center">
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

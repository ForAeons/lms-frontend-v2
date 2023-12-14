import React from "react";
import { HomeBtn, ModeToggle } from ".";
import { SidebarToggle } from "./sidebar-toggle";

export const Navbar: React.FC = () => {
	return (
		<div className="w-full flex flex-row items-center justify-between lg:gap-3 p-2">
			<SidebarToggle />
			<HomeBtn />
			<ModeToggle />
		</div>
	);
};

export default Navbar;

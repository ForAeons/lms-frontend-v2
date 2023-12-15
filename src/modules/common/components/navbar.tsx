import React from "react";
import { HomeBtn, ModeToggle, SideBarMobileBtn } from ".";

export const Navbar: React.FC = () => {
	return (
		<div className="w-full flex flex-row items-center justify-between lg:gap-3 p-2">
			<SideBarMobileBtn />
			<HomeBtn />
			<ModeToggle />
		</div>
	);
};

export default Navbar;

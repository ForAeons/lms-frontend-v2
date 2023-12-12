import React from "react";
import { ChevronsLeftIcon, ChevronsRightIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useDispatch, useSelector } from "react-redux";
import { appSlice } from "@/store/slices/app-slice";
import { RootState } from "@/store";

export const SidebarToggle: React.FC = () => {
	const appState = useSelector((state: RootState) => state.app);

	const dispatch = useDispatch();
	return (
		<Button
			variant="ghost"
			size="icon"
			className="relative lg:hidden"
			onClick={() => dispatch(appSlice.actions.toggleSideBar())}
		>
			<ChevronsLeftIcon
				className={`h-[1.2rem] w-[1.2rem] transition-all ${
					appState.showSideBar ? "rotate-0 scale-100" : "-rotate-90 scale-0"
				}`}
			/>
			<ChevronsRightIcon
				className={`absolute h-[1.2rem] w-[1.2rem] transition-all ${
					appState.showSideBar ? "rotate-90 scale-0" : "rotate-0 scale-100"
				}`}
			/>
			<span className="sr-only">Toggle Sidebar</span>
		</Button>
	);
};

import React from "react";
import { Outlet } from "react-router-dom";
import {
	ResizableHandle,
	ResizablePanel,
	ResizablePanelGroup,
} from "@/components/ui/resizable";
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
		<ResizablePanelGroup
			direction="horizontal"
			className="relative h-[100vh] w-[100vw]"
		>
			<ResizablePanel defaultSize={20}>
				<Sidebar />
			</ResizablePanel>
			<ResizableHandle withHandle />
			<ResizablePanel>
				<Outlet />
			</ResizablePanel>
		</ResizablePanelGroup>
	);
};

export default AppLayout;

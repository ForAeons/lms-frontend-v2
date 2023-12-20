import React from "react";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { NavContent } from ".";

export const Sidebar: React.FC<React.HTMLAttributes<HTMLDivElement>> = () => {
	return (
		<ScrollArea className="h-[100vh] hidden lg:block">
			<NavContent />
			<ScrollBar />
		</ScrollArea>
	);
};

export default Sidebar;

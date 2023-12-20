import React from "react";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { DraggableNavButton, NavContent } from ".";

export const SidebarMobileBtn: React.FC = () => {
	return (
		<Sheet>
			<SheetTrigger className="absolute lg:hidden bottom-0">
				<DraggableNavButton />
			</SheetTrigger>
			<SheetContent side="left">
				<ScrollArea className="h-[100vh]">
					<NavContent />
					<ScrollBar />
				</ScrollArea>
			</SheetContent>
		</Sheet>
	);
};

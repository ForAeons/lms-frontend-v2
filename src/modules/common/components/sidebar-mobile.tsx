import React from "react";
import { useLocation } from "react-router-dom";
import { ChevronsRightIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { LG_ICON_SIZE } from "@/constants";
import { NavContent } from ".";

export const NavbarMobileBtn: React.FC = () => {
	const [open, setOpen] = React.useState(false);

	const location = useLocation();
	// Close the sheet when the route changes
	React.useEffect(() => {
		setOpen(false);
	}, [location]);

	return (
		<Sheet open={open} onOpenChange={setOpen}>
			<SheetTrigger asChild>
				<Button
					variant="ghost"
					className="rounded-xl p-2 m-0"
					onClick={() => setOpen(true)}
				>
					<ChevronsRightIcon size={LG_ICON_SIZE} />
				</Button>
			</SheetTrigger>
			<SheetContent side="left" className="p-0">
				<ScrollArea className="h-[100vh]">
					<NavContent />
					<ScrollBar />
				</ScrollArea>
			</SheetContent>
		</Sheet>
	);
};

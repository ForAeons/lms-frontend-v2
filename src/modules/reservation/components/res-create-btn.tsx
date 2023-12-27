import React from "react";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import {
	Drawer,
	DrawerContent,
	DrawerDescription,
	DrawerHeader,
	DrawerTitle,
	DrawerTrigger,
} from "@/components/ui/drawer";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { CreateBtn } from "@/modules";
import { ResCreateForm } from ".";
import { useMediaQuery } from "@/hooks";

export const ResCreateDialog: React.FC = () => {
	const isDesktop = useMediaQuery("(min-width: 1024px)");

	if (isDesktop) {
		return (
			<Dialog>
				<DialogTrigger asChild>
					<div>
						<CreateBtn subject="reservation" />
					</div>
				</DialogTrigger>
				<DialogContent className="max-h-[75vh] p-0">
					<ScrollArea className="max-h-[70vh]">
						<div className="p-6">
							<DialogHeader>
								<DialogTitle>Create a reservation</DialogTitle>
								<DialogDescription>
									{"Select the user and book. Click upload when you're done."}
								</DialogDescription>
							</DialogHeader>
							<ResCreateForm />
						</div>
						<ScrollBar />
					</ScrollArea>
				</DialogContent>
			</Dialog>
		);
	}

	return (
		<Drawer>
			<DrawerTrigger asChild>
				<div>
					<CreateBtn subject="reservation" />
				</div>
			</DrawerTrigger>
			<DrawerContent>
				<DrawerHeader>
					<DrawerTitle>Create a reservation</DrawerTitle>
					<DrawerDescription>
						{"Select the user and book. Click upload when you're done."}
					</DrawerDescription>
				</DrawerHeader>
				<div className="p-3">
					<ResCreateForm />
				</div>
			</DrawerContent>
		</Drawer>
	);
};

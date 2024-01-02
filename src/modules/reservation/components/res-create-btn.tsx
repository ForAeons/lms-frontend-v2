import React from "react";
import { useIntl } from "react-intl";
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
import { useMediaQuery } from "@/hooks";
import { ResCreateForm } from ".";

export const ResCreateDialog: React.FC = () => {
	const intl = useIntl();
	const reservation = intl.formatMessage({
		id: "DjAt8v",
		defaultMessage: "reservation",
	});
	const createRes = intl.formatMessage({
		id: "exNENh",
		defaultMessage: "Create reservation",
	});
	const createResDescription = intl.formatMessage({
		id: "SbUqp8",
		defaultMessage: "Select the user and book. Click upload when you're done.",
	});

	const isDesktop = useMediaQuery("(min-width: 1024px)");

	if (isDesktop) {
		return (
			<Dialog>
				<DialogTrigger asChild>
					<div>
						<CreateBtn subject={reservation} />
					</div>
				</DialogTrigger>
				<DialogContent className="max-h-[75vh] p-0">
					<ScrollArea className="max-h-[70vh]">
						<div className="p-6">
							<DialogHeader>
								<DialogTitle>{createRes}</DialogTitle>
								<DialogDescription>{createResDescription}</DialogDescription>
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
					<CreateBtn subject={reservation} />
				</div>
			</DrawerTrigger>
			<DrawerContent>
				<DrawerHeader>
					<DrawerTitle>{createRes}</DrawerTitle>
					<DrawerDescription>{createResDescription}</DrawerDescription>
				</DrawerHeader>
				<div className="p-3">
					<ResCreateForm />
				</div>
			</DrawerContent>
		</Drawer>
	);
};

import React from "react";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { CreateBtn } from "@/modules";
import { ResCreateForm } from ".";

export const ResCreateDialog: React.FC = () => {
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
};

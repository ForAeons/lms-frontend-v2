import React from "react";
import * as z from "zod";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { CreateBtn } from "@/modules";
import { createLogThunk, useAppDispatch } from "@/store";
import { AuditlogFormSchema } from "@/schema";
import { AuditLogForm } from "./auditlog-form";

export const LogCreateDialog: React.FC = () => {
	const defaultValues = { action: "" };

	const dispatch = useAppDispatch();
	function onSubmit(values: z.infer<typeof AuditlogFormSchema>) {
		dispatch(
			createLogThunk({
				log: values,
			}),
		);
	}

	return (
		<Dialog>
			<DialogTrigger asChild>
				<div>
					<CreateBtn subject="audit log" />
				</div>
			</DialogTrigger>
			<DialogContent className="max-h-[75vh] p-0">
				<ScrollArea className="max-h-[70vh]">
					<div className="p-6">
						<DialogHeader>
							<DialogTitle>Log an event</DialogTitle>
							<DialogDescription>
								{"Describe the event here. Click upload when you're done."}
							</DialogDescription>
						</DialogHeader>
						<AuditLogForm
							defaultValues={defaultValues}
							onSubmit={onSubmit}
							action="Create"
						/>
					</div>
					<ScrollBar />
				</ScrollArea>
			</DialogContent>
		</Dialog>
	);
};

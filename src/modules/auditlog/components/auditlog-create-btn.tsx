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
import {
	Drawer,
	DrawerContent,
	DrawerDescription,
	DrawerHeader,
	DrawerTitle,
	DrawerTrigger,
} from "@/components/ui/drawer";
import { CreateBtn } from "@/modules";
import { createLogThunk, useAppDispatch } from "@/store";
import { AuditlogFormSchema } from "@/schema";
import { AuditLogForm } from "./auditlog-form";
import { useMediaQuery } from "@/hooks";

export const LogCreateBtn: React.FC = () => {
	const isDesktop = useMediaQuery("(min-width: 1024px)");
	const defaultValues = { action: "", date: new Date() };

	const dispatch = useAppDispatch();
	function onSubmit(values: z.infer<typeof AuditlogFormSchema>) {
		dispatch(
			createLogThunk({
				log: { ...values, date: values.date.toISOString() },
			}),
		);
	}

	if (isDesktop) {
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
	}

	return (
		<Drawer>
			<DrawerTrigger asChild>
				<div>
					<CreateBtn subject="audit log" />
				</div>
			</DrawerTrigger>
			<DrawerContent>
				<DrawerHeader>
					<DrawerTitle>Log an event</DrawerTitle>
					<DrawerDescription>
						{"Describe the event here. Click upload when you're done."}
					</DrawerDescription>
				</DrawerHeader>
				<div className="p-3">
					<AuditLogForm
						defaultValues={defaultValues}
						onSubmit={onSubmit}
						action="Create"
					/>
				</div>
			</DrawerContent>
		</Drawer>
	);
};

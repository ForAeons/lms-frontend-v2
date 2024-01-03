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
import { useMediaQuery } from "@/hooks";
import { useTranslations } from "@/hooks";
import { AuditLogForm } from "./auditlog-form";

export const LogCreateBtn: React.FC = () => {
	const translate = useTranslations();
	const auditLogText = translate["auditLog"]();
	const logAnEvent = translate["logAnEvent"]();
	const logAnEventDescription = translate["logEventDesc"]();
	const createAction = translate["Create"]();

	const isDesktop = useMediaQuery("(min-width: 1024px)");
	const defaultValues = { action: "", date: new Date() };

	const dispatch = useAppDispatch();
	function onSubmit(values: z.infer<typeof AuditlogFormSchema>) {
		dispatch(
			createLogThunk({ log: { ...values, date: values.date.toISOString() } }),
		);
	}

	if (isDesktop) {
		return (
			<Dialog>
				<DialogTrigger asChild>
					<div>
						<CreateBtn subject={auditLogText} />
					</div>
				</DialogTrigger>
				<DialogContent className="max-h-[75vh] p-0">
					<ScrollArea className="max-h-[70vh]">
						<div className="p-6">
							<DialogHeader>
								<DialogTitle>{logAnEvent}</DialogTitle>
								<DialogDescription>{logAnEventDescription}</DialogDescription>
							</DialogHeader>
							<AuditLogForm
								defaultValues={defaultValues}
								onSubmit={onSubmit}
								action={createAction}
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
					<CreateBtn subject={auditLogText} />
				</div>
			</DrawerTrigger>
			<DrawerContent>
				<DrawerHeader>
					<DrawerTitle>{logAnEvent}</DrawerTitle>
					<DrawerDescription>{logAnEventDescription}</DrawerDescription>
				</DrawerHeader>
				<div className="p-3">
					<AuditLogForm
						defaultValues={defaultValues}
						onSubmit={onSubmit}
						action={createAction}
					/>
				</div>
			</DrawerContent>
		</Drawer>
	);
};

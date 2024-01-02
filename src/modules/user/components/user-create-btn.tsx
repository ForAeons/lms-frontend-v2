import React from "react";
import * as z from "zod";
import { useIntl } from "react-intl";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { useAppDispatch, createUserThunk } from "@/store";
import { CreateBtn } from "@/modules";
import { UserFormSchema } from "@/schema";
import { UserForm } from ".";

export const UserCreateBtn: React.FC = () => {
	const intl = useIntl();
	const user = intl.formatMessage({
		id: "sUNhQE",
		defaultMessage: "user",
	});
	const addNewUser = intl.formatMessage({
		id: "j3duXc",
		defaultMessage: "Add New User",
	});
	const createAction = intl.formatMessage({
		id: "VzzYJk",
		defaultMessage: "Create",
	});
	const createUserDescription = intl.formatMessage({
		id: "ERkFf1",
		defaultMessage:
			"Add the new user's profile details here. Click save when you're done.",
	});

	const defaultValues = {
		username: "",
		password: "",
		confirmPassword: "",
		full_name: "",
		preferred_name: "",
	};

	const dispatch = useAppDispatch();
	function onSubmit(values: z.infer<typeof UserFormSchema>) {
		dispatch(
			createUserThunk({
				username: values.username,
				password: values.password,
				person_attributes: {
					full_name: values.full_name,
					preferred_name: values.preferred_name,
				},
			}),
		);
	}

	return (
		<Dialog>
			<DialogTrigger asChild>
				<div>
					<CreateBtn subject={user} />
				</div>
			</DialogTrigger>
			<DialogContent className="max-h-[75vh] p-0">
				<ScrollArea className="max-h-[70vh]">
					<div className="p-6">
						<DialogHeader>
							<DialogTitle>{addNewUser}</DialogTitle>
							<DialogDescription>{createUserDescription}</DialogDescription>
						</DialogHeader>
						<UserForm
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
};

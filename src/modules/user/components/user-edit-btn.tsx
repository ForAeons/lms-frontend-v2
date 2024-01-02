import React from "react";
import { useIntl } from "react-intl";
import * as z from "zod";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { useAppDispatch, updateUserThunk } from "@/store";
import { EditBtn } from "@/modules";
import { UserFormSchema } from "@/schema";
import { UserForm } from ".";

export const UserEditBtn: React.FC<{
	userPerson: UserPerson;
}> = ({ userPerson }) => {
	const intl = useIntl();
	const editUserProfile = intl.formatMessage({
		id: "J29+pZ",
		defaultMessage: "Edit user profile",
	});
	const editUserDescription = intl.formatMessage({
		id: "mq++y1",
		defaultMessage:
			"Make changes to this user's profile here. Click save when you're done.",
	});
	const saveAction = intl.formatMessage({
		id: "jvo0vs",
		defaultMessage: "Save",
	});

	const defaultValues = {
		username: userPerson.username,
		password: "",
		confirmPassword: "",
		full_name: userPerson.person_attributes.full_name,
		preferred_name: userPerson.person_attributes.preferred_name,
	};

	const dispatch = useAppDispatch();
	function onSubmit(values: z.infer<typeof UserFormSchema>) {
		dispatch(
			updateUserThunk({
				id: userPerson.id,
				username: values.username,
				password: values.password,
				person_attributes: {
					id: userPerson.person_attributes.id,
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
					<EditBtn />
				</div>
			</DialogTrigger>
			<DialogContent className="max-h-[75vh] p-0">
				<ScrollArea className="max-h-[70vh]">
					<div className="p-6">
						<DialogHeader>
							<DialogTitle>{editUserProfile}</DialogTitle>
							<DialogDescription>{editUserDescription}</DialogDescription>
						</DialogHeader>
						<UserForm
							defaultValues={defaultValues}
							onSubmit={onSubmit}
							action={saveAction}
						/>
					</div>
				</ScrollArea>
			</DialogContent>
		</Dialog>
	);
};

import React from "react";
import { toast } from "sonner";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { useTranslations } from "@/components/language-provider";
import { UserRoutes, userApi } from "@/api";
import { UserFormValues } from "@/schema";
import { EditBtn } from "@/modules";
import { UserForm } from ".";

export const UserEditBtn: React.FC<{
	userPerson: UserPerson;
}> = ({ userPerson }) => {
	const translate = useTranslations();
	const editUserProfile = translate.editUserProfile();
	const editUserDescription = translate.editUserDesc();
	const saveAction = translate.Save();

	const defaultValues = {
		username: userPerson.username,
		password: "",
		confirmPassword: "",
		full_name: userPerson.person_attributes.full_name,
		preferred_name: userPerson.person_attributes.preferred_name,
	};

	const [open, setOpen] = React.useState(false);

	const queryClient = useQueryClient();
	const updateUserMutation = useMutation({
		mutationKey: [UserRoutes.BASE, userPerson.id],
		mutationFn: userApi.UpdateUser,
		onSuccess: (data) => {
			setOpen(false);
			const user = data!.data;
			queryClient.invalidateQueries({ queryKey: [UserRoutes.BASE] });
			toast.success(translate.Success(), {
				description: translate.updateUserSuccessDesc({
					username: user.username,
				}),
			});
		},
	});

	const onSubmit = (values: UserFormValues) => {
		updateUserMutation.mutate({
			id: userPerson.id,
			username: values.username,
			password: values.password,
			person_attributes: {
				id: userPerson.person_attributes.id,
				full_name: values.full_name,
				preferred_name: values.preferred_name,
			},
		});
	};

	return (
		<Dialog open={open} onOpenChange={setOpen}>
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

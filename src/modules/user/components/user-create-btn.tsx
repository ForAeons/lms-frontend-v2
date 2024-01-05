import React from "react";
import { toast } from "sonner";
import { useMutation, useQueryClient } from "@tanstack/react-query";
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
import { useTranslations } from "@/components/language-provider";
import { UserRoutes, userApi } from "@/api";
import { UserFormSchema } from "@/schema";
import { CreateBtn } from "@/modules";
import { UserForm } from ".";

export const UserCreateBtn: React.FC = () => {
	const translate = useTranslations();
	const user = translate.user();
	const addNewUser = translate.addNewUser();
	const createAction = translate.Create();
	const createUserDescription = translate.createUserDesc();

	const defaultValues = {
		username: "",
		password: "",
		confirmPassword: "",
		full_name: "",
		preferred_name: "",
	};

	const queryClient = useQueryClient();
	const createUserMutation = useMutation({
		mutationKey: [UserRoutes.BASE, "new"],
		mutationFn: userApi.CreateUser,
		onSuccess: (data) => {
			const user = data!.data;
			queryClient.invalidateQueries({ queryKey: [UserRoutes.BASE] });
			toast.success(translate.Success(), {
				description: translate.createUserSuccessDesc({
					username: user.username,
				}),
			});
		},
	});

	const onSubmit = (values: z.infer<typeof UserFormSchema>) => {
		createUserMutation.mutate({
			username: values.username,
			password: values.password,
			person_attributes: {
				full_name: values.full_name,
				preferred_name: values.preferred_name,
			},
		});
	};

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

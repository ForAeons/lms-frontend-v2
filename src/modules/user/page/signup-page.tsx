import React from "react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import * as z from "zod";
import { Card, CardContent } from "@/components/ui/card";
import { useTranslations } from "@/components/language-provider";
import { UserRoutes, userApi } from "@/api";
import { UserFormSchema } from "@/schema";
import { UserForm } from "..";

export const SignupPage: React.FC = () => {
	const translate = useTranslations();

	const defaultValues = {
		username: "",
		password: "",
		confirmPassword: "",
		full_name: "",
		preferred_name: "",
	};

	const navigate = useNavigate();
	const queryClient = useQueryClient();
	const signInMutation = useMutation({
		mutationKey: [UserRoutes.BASE, "new"],
		mutationFn: userApi.CreateUser,
		onSuccess: (data) => {
			const user = data!.data;
			queryClient.invalidateQueries({ queryKey: [UserRoutes.BASE] });
			navigate("/signin");
			toast.success(translate.Success(), {
				description: translate.createUserSuccessDesc({
					username: user.username,
				}),
			});
		},
	});

	const onSubmit = (values: z.infer<typeof UserFormSchema>) => {
		signInMutation.mutate({
			username: values.username,
			password: values.password,
			person_attributes: {
				full_name: values.full_name,
				preferred_name: values.preferred_name,
			},
		});
	};

	const signUpAction = translate.Signup();
	const signInHere = translate.signInHere();
	const alreadyHaveAnAccount = translate.alreadyHaveAnAccount();

	return (
		<div className="w-[100vw] h-[100vh] flex justify-center items-center">
			<div className="m-6">
				<Card className="lg:w-[400px] w-[300px] border-none transition-shadow shadow-md hover:shadow-lg">
					<CardContent className="p-6">
						<UserForm
							defaultValues={defaultValues}
							onSubmit={onSubmit}
							action={signUpAction}
						/>
					</CardContent>
				</Card>

				<div className="mt-3 text-xs text-muted-foreground text-right">
					<p>{alreadyHaveAnAccount}</p>
					<a
						href="/signin"
						className="text-primary hover:opacity-70 transition-colors"
					>
						{signInHere}
					</a>
				</div>
			</div>
		</div>
	);
};

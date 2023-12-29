import React from "react";
import * as z from "zod";
import { Card, CardContent } from "@/components/ui/card";
import { createUserThunk, useAppDispatch } from "@/store";
import { UserFormSchema } from "@/schema";
import { UserForm } from "..";
import { useNavigate } from "react-router-dom";

export const SignupPage: React.FC = () => {
	const defaultValues = {
		username: "",
		password: "",
		confirmPassword: "",
		full_name: "",
		preferred_name: "",
	};

	const dispatch = useAppDispatch();
	const navigate = useNavigate();
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
		).then(() => navigate("/signin"));
	}
	return (
		<div className="w-[100vw] h-[100vh] flex justify-center items-center">
			<div className="m-6">
				<Card className="lg:w-[400px] w-[300px] border-none transition-shadow shadow-md hover:shadow-lg">
					<CardContent className="p-6">
						<UserForm
							defaultValues={defaultValues}
							onSubmit={onSubmit}
							action="Sign up"
						/>
					</CardContent>
				</Card>

				<div className="mt-3 text-xs text-muted-foreground text-right">
					<p>{"Already have an account?"}</p>
					<p>
						Signin{" "}
						<a
							href="/signin"
							className="text-primary hover:opacity-70 transition-colors"
						>
							here
						</a>
					</p>
				</div>
			</div>
		</div>
	);
};

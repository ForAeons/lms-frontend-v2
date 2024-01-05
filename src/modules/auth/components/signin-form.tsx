import React from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { useTranslations } from "@/components/language-provider";
import { userSignInSchema } from "@/schema";

export const SigninForm: React.FC<{
	onSubmit: UnaryHandler<z.infer<typeof userSignInSchema>>;
}> = ({ onSubmit }) => {
	const translate = useTranslations();
	const username = translate.Username();
	const yourUsername = translate.yourUsername();
	const usernameDescription = translate.usernameDesc();
	const password = translate.Password();
	const yourPassword = translate.yourPassword();
	const passwordDescription = translate.passwordDesc();
	const submitAction = translate.signIn();
	const homePage = translate.homePage();

	const form = useForm<z.infer<typeof userSignInSchema>>({
		resolver: zodResolver(userSignInSchema),
		defaultValues: { username: "", password: "" },
	});

	const navigate = useNavigate();

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className="space-y-8 min-w-[250px]"
			>
				<FormField
					control={form.control}
					name="username"
					render={({ field }) => (
						<FormItem>
							<FormLabel>{username}</FormLabel>
							<FormControl>
								<Input placeholder={yourUsername} {...field} />
							</FormControl>
							<FormDescription>{usernameDescription}</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="password"
					render={({ field }) => (
						<FormItem>
							<FormLabel>{password}</FormLabel>
							<FormControl>
								<Input placeholder={yourPassword} {...field} />
							</FormControl>
							<FormDescription>{passwordDescription}</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>

				<div className="flex">
					<Button
						variant={"outline"}
						onClick={() => navigate("/")}
						className="mr-auto"
					>
						{homePage}
					</Button>
					<Button type="submit">{submitAction}</Button>
				</div>
			</form>
		</Form>
	);
};

import React from "react";
import { useIntl } from "react-intl";
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
import { userSignInSchema } from "@/schema";
import { useAppDispatch, signInThunk } from "@/store";

export const SigninForm: React.FC = () => {
	const intl = useIntl();
	const username = intl.formatMessage({
		id: "JCIgkj",
		defaultMessage: "Username",
	});
	const yourUsername = intl.formatMessage({
		id: "k9XuYY",
		defaultMessage: "Your username",
	});
	const usernameDescription = intl.formatMessage({
		id: "aohCSR",
		defaultMessage: "This is your public display name.",
	});
	const password = intl.formatMessage({
		id: "5sg7KC",
		defaultMessage: "Password",
	});
	const yourPassword = intl.formatMessage({
		id: "/aWpsO",
		defaultMessage: "Your password",
	});
	const passwordDescription = intl.formatMessage({
		id: "xsQkIU",
		defaultMessage: "This is your password.",
	});
	const submitAction = intl.formatMessage({
		id: "Ub+AGc",
		defaultMessage: "Sign In",
	});
	const homePage = intl.formatMessage({
		id: "xHJnaY",
		defaultMessage: "Home Page",
	});

	const form = useForm<z.infer<typeof userSignInSchema>>({
		resolver: zodResolver(userSignInSchema),
		defaultValues: { username: "", password: "" },
	});

	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const onSubmit = (v: z.infer<typeof userSignInSchema>) => {
		dispatch(
			signInThunk({ user: { username: v.username, password: v.password } }),
		).then(() => navigate("/"));
	};

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

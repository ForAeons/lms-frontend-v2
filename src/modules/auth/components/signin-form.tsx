import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { passwordPattern } from "@/constants";
import { loginThunk } from "@/store/slices/app-slice";
import { useAppDispatch, useAppSelector } from "@/store";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";

const formSchema = z.object({
	username: z
		.string()
		.min(5, { message: "Username must be at least 5 characters." })
		.max(30, { message: "Username must be no more than 30 characters." }),
	password: z
		.string()
		.regex(passwordPattern, {
			message:
				"Password must include at least one lowercase and uppercase letter, a number, and a special character (!@#$%^&*).",
		})
		.min(8, { message: "Password must be at least 8 characters." })
		.max(32, { message: "Password must be no more than 32 characters." }),
});

export const SigninForm: React.FC = () => {
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			username: "",
			password: "",
		},
	});

	const dispatch = useAppDispatch();
	const onSubmit = (values: z.infer<typeof formSchema>) => {
		dispatch(
			loginThunk({
				username: values.username,
				password: values.password,
			}),
		);
	};

	const { toast } = useToast();
	const navigate = useNavigate();
	const loginStatus = useAppSelector((state) => state.app.loginStatus);
	React.useEffect(() => {
		if (loginStatus === "loggedIn") {
			toast({
				title: "Sign in Successful",
				description: "You are now signed in.",
			});
			navigate("/");
		} else if (loginStatus === "failure") {
			toast({
				variant: "destructive",
				title: "Login Failed",
				description: "Please check your username and password.",
			});
		}
		form.reset();
	}, [loginStatus]);

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
				<FormField
					control={form.control}
					name="username"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Username</FormLabel>
							<FormControl>
								<Input placeholder="username" {...field} />
							</FormControl>
							<FormDescription>
								This is your public display name.
							</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="password"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Password</FormLabel>
							<FormControl>
								<Input placeholder="password" {...field} />
							</FormControl>
							<FormDescription>This is your password.</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>
				<Button type="submit">Submit</Button>
			</form>
		</Form>
	);
};

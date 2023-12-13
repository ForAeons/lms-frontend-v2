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
import { useDispatch } from "react-redux";
import { appSlice } from "@/store/slices/app-slice";

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
	const dispatch = useDispatch();

	// 1. Define your form.
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			username: "",
			password: "",
		},
	});

	// 2. Define a submit handler.
	function onSubmit(values: z.infer<typeof formSchema>) {
		// Do something with the form values.
		// ✅ This will be type-safe and validated.
		console.log(values);
		dispatch(
			appSlice.actions.login({
				username: values.username,
				id: 1,
				email: "test@gmail.com",
				personId: 1,
				person: {
					id: 1,
					fullName: values.username,
					preferredName: values.username,
					languagePreference: "EN",
				},
			}),
		);
	}

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

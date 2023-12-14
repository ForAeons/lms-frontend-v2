import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { emailPattern, passwordPattern } from "@/constants";
import { useAppDispatch, createUserThunk } from "@/store";

const formSchema = z
	.object({
		username: z
			.string()
			.min(5, { message: "Username must be at least 5 characters." })
			.max(30, { message: "Username must be no more than 30 characters." }),
		email: z
			.string()
			.regex(emailPattern, {
				message: "Invalid email format.",
			})
			.optional(),
		password: z
			.string()
			.regex(passwordPattern, {
				message:
					"Password must include at least one lowercase and uppercase letter, a number, and a special character (!@#$%^&*).",
			})
			.min(8, { message: "Password must be at least 8 characters." })
			.max(32, { message: "Password must be no more than 32 characters." }),
		confirmPassword: z.string(),
		full_name: z.string().min(2).max(255),
		preferred_name: z.string().min(2).max(255).optional(),
		language_preference: z.string().min(2).max(2),
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: "Passwords do not match",
		path: ["confirmPassword"],
	});

export const UserCreateDialog: React.FC = () => {
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			username: "",
			email: "",
			password: "",
			confirmPassword: "",
			full_name: "",
			preferred_name: "",
			language_preference: "",
		},
	});

	const dispatch = useAppDispatch();
	function onSubmit(values: z.infer<typeof formSchema>) {
		console.log("CCLicked"); // this doesnt seem to be triggered
		dispatch(
			createUserThunk({
				username: values.username,
				email: values.email,
				password: values.password,
				person_attributes: {
					full_name: values.full_name,
					preferred_name: values.preferred_name,
					language_preference: values.language_preference,
				},
			}),
		);
	}

	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button variant="secondary">Create</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Add New User</DialogTitle>
					<DialogDescription>
						{
							"Make changes to the new user's profile here. Click save when you're done."
						}
					</DialogDescription>
				</DialogHeader>
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(onSubmit)}
						className="space-y-8 max-w-xl w-full"
					>
						<FormField
							control={form.control}
							name="username"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Username</FormLabel>
									<FormControl>
										<Input placeholder="username" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="full_name"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Full Name</FormLabel>
									<FormControl>
										<Input placeholder="New full name" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="preferred_name"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Preferred name</FormLabel>
									<FormControl>
										<Input placeholder="New preferred name" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="language_preference"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Language preference</FormLabel>
									<FormControl>
										<Input placeholder="EN" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="email"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Email</FormLabel>
									<FormControl>
										<Input placeholder="email" {...field} />
									</FormControl>
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
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="confirmPassword"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Confirm Password</FormLabel>
									<FormControl>
										<Input placeholder="password" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<DialogFooter>
							<Button type="submit">Save changes</Button>
						</DialogFooter>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	);
};

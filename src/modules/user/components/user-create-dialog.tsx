import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
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
import { emailPattern, passwordPattern } from "@/constants";
import { useAppDispatch, createUserThunk } from "@/store";
import * as Constants from "@/constants";
import { PlusIcon } from "lucide-react";

const formSchema = z
	.object({
		username: z
			.string()
			.min(Constants.MINIMUM_USERNAME_LENGTH, {
				message: "Username must be at least 5 characters.",
			})
			.max(Constants.MAXIMUM_USERNAME_LENGTH, {
				message: "Username must be no more than 30 characters.",
			}),
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
			.min(Constants.MINIMUM_PASSWORD_LENGTH, {
				message: "Password must be at least 8 characters.",
			})
			.max(Constants.MAXIMUM_PASSWORD_LENGTH, {
				message: "Password must be no more than 32 characters.",
			}),
		confirmPassword: z.string(),
		full_name: z.string().min(2).max(255),
		preferred_name: z.string().min(2).max(255).optional(),
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
		},
	});

	const dispatch = useAppDispatch();
	function onSubmit(values: z.infer<typeof formSchema>) {
		dispatch(
			createUserThunk({
				username: values.username,
				email: values.email,
				password: values.password,
				person_attributes: {
					full_name: values.full_name,
					preferred_name: values.preferred_name,
				},
			}),
		);
	}

	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button variant="ghost" className="rounded-full">
					<PlusIcon size={Constants.LG_ICON_SIZE} />
				</Button>
			</DialogTrigger>
			<DialogContent className="max-h-[70%] p-0">
				<ScrollArea className="max-h-[70%]">
					<div className="p-6">
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
									<Button type="submit">Create</Button>
								</DialogFooter>
							</form>
						</Form>
					</div>
					<ScrollBar />
				</ScrollArea>
			</DialogContent>
		</Dialog>
	);
};

import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
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
import { useAppDispatch, updateUserThunk } from "@/store";
import * as Constants from "@/constants";
import { EditBtn } from "@/modules";

const formSchema = z.object({
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
	full_name: z.string().min(2).max(255),
	preferred_name: z.string().min(2).max(255).optional(),
	language_preference: z.string().min(2).max(2),
});

export const UserEditDialog: React.FC<{
	userPerson: UserPerson;
}> = ({ userPerson }) => {
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			username: userPerson.username,
			email: userPerson.email,
			password: userPerson.password,
			full_name: userPerson.person_attributes.full_name,
			preferred_name: userPerson.person_attributes.preferred_name,
			language_preference: userPerson.person_attributes.language_preference,
		},
	});

	const dispatch = useAppDispatch();
	function onSubmit(values: z.infer<typeof formSchema>) {
		dispatch(
			updateUserThunk({
				id: userPerson.id,
				username: values.username,
				email: values.email,
				password: values.password,
				person_attributes: {
					id: userPerson.person_attributes.id,
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
				<div>
					<EditBtn />
				</div>
			</DialogTrigger>
			<DialogContent className="max-h-[70%] p-0">
				<ScrollArea className="max-h-[70%]">
					<div className="p-6">
						<DialogHeader>
							<DialogTitle>Edit user profile</DialogTitle>
							<DialogDescription>
								{
									"Make changes to this user's profile here. Click save when you're done."
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
								<DialogFooter>
									<Button type="submit">Save changes</Button>
								</DialogFooter>
							</form>
						</Form>
					</div>
				</ScrollArea>
			</DialogContent>
		</Dialog>
	);
};

import React from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
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
import { useAppDispatch, loginThunk } from "@/store";

const formSchema = z.object({
	username: z
		.string()
		.min(5, { message: "Username must be at least 5 characters." })
		.max(30, { message: "Username must be no more than 30 characters." }),
	password: z
		.string()
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
	const navigate = useNavigate();
	const onSubmit = (values: z.infer<typeof formSchema>) => {
		dispatch(
			loginThunk({
				user: {
					username: values.username,
					password: values.password,
				},
			}),
		).then(() => navigate("/"));
	};

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

				<div className="flex">
					<Button
						variant={"outline"}
						onClick={() => navigate("/")}
						className="mr-auto"
					>
						Home
					</Button>
					<Button type="submit">Submit</Button>
				</div>
			</form>
		</Form>
	);
};

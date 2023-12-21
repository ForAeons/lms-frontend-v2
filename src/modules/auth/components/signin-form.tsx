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
import * as Constants from "@/constants";

const formSchema = z.object({
	username: z
		.string()
		.min(Constants.MINIMUM_USERNAME_LENGTH, {
			message: "Username must be at least 5 characters.",
		})
		.max(Constants.MAXIMUM_USERNAME_LENGTH, {
			message: "Username must be no more than 30 characters.",
		}),
	password: z
		.string()
		.min(Constants.MINIMUM_PASSWORD_LENGTH, {
			message: "Password must be at least 8 characters.",
		})
		.max(Constants.MAXIMUM_PASSWORD_LENGTH, {
			message: "Password must be no more than 32 characters.",
		}),
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
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className="space-y-8 min-w-[250px]"
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

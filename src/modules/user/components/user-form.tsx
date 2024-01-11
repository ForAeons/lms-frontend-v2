import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DialogFooter } from "@/components/ui/dialog";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { useTranslations } from "@/components/language-provider";
import { GetUserFormSchema, UserFormValues } from "@/schema";

export const UserForm: React.FC<{
	defaultValues: UserFormValues;
	onSubmit: UnaryHandler<UserFormValues>;
	action: string;
}> = ({ defaultValues, onSubmit, action }) => {
	const translate = useTranslations();
	const username = translate.Username();
	const usernamePlaceholder = translate.anUniqueName();
	const fullName = translate.Fullname();
	const fullNamePlaceholder = translate.yourFullName();
	const password = translate.Password();
	const passwordPlaceholder = translate.aStrongPassword();
	const confirmPassword = translate.confirmPassword();
	const confirmPasswordPlaceholder = translate.enterYourPasswordAgain();

	const form = useForm<UserFormValues>({
		resolver: zodResolver(GetUserFormSchema()),
		defaultValues: defaultValues,
	});

	return (
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
							<FormLabel>{username}</FormLabel>
							<FormControl>
								<Input placeholder={usernamePlaceholder} {...field} />
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
							<FormLabel>{fullName}</FormLabel>
							<FormControl>
								<Input placeholder={fullNamePlaceholder} {...field} />
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
							<FormLabel>{password}</FormLabel>
							<FormControl>
								<Input placeholder={passwordPlaceholder} {...field} />
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
							<FormLabel>{confirmPassword}</FormLabel>
							<FormControl>
								<Input placeholder={confirmPasswordPlaceholder} {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<DialogFooter>
					<Button type="submit">{action}</Button>
				</DialogFooter>
			</form>
		</Form>
	);
};

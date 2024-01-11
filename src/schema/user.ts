import * as z from "zod";
import * as Constants from "@/constants";

export const GetUserFormSchema = () =>
	z
		.object({
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
				.regex(Constants.passwordPattern, {
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

export type UserFormValues = z.infer<ReturnType<typeof GetUserFormSchema>>;

export const GetUserSignInSchema = () =>
	z.object({
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

export type UserSignInValues = z.infer<ReturnType<typeof GetUserSignInSchema>>;

export const GetBookUserFormSchema = () =>
	z.object({
		user_id: z.number().int(),
		book_id: z.number().int(),
	});

export type BookUserFormValues = z.infer<
	ReturnType<typeof GetBookUserFormSchema>
>;

export const GetUserRoleSchema = () =>
	z.object({
		role_id: z.number().int(),
	});

export type UserRoleValues = z.infer<ReturnType<typeof GetUserRoleSchema>>;

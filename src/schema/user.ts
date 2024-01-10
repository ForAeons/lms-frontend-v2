import * as z from "zod";
import * as Constants from "@/constants";

export const UserFormSchema = z
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

export const userSignInSchema = z.object({
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

export const BookUserFormSchema = z.object({
	user_id: z.number().int(),
	book_id: z.number().int(),
});

export const UserRoleSchema = z.object({
	role_id: z.number().int(),
});

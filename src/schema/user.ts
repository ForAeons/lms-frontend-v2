import * as z from "zod";
import * as Constants from "@/constants";
import { IntlWrapper } from "@/components/language-provider";

export const GetUserFormSchema = () =>
	z
		.object({
			username: z
				.string()
				.min(Constants.MINIMUM_USERNAME_LENGTH, {
					message: IntlWrapper.translator.username5Characters(),
				})
				.max(Constants.MAXIMUM_USERNAME_LENGTH, {
					message: IntlWrapper.translator.username30Characters(),
				}),
			password: z
				.string()
				.regex(Constants.passwordPattern, {
					message: IntlWrapper.translator.passwordPattern(),
				})
				.min(Constants.MINIMUM_PASSWORD_LENGTH, {
					message: IntlWrapper.translator.password8Characters(),
				})
				.max(Constants.MAXIMUM_PASSWORD_LENGTH, {
					message: IntlWrapper.translator.password32Characters(),
				}),
			confirmPassword: z.string(),
			full_name: z
				.string()
				.min(2, {
					message: IntlWrapper.translator.fullName2Characters(),
				})
				.max(255, {
					message: IntlWrapper.translator.fullName255Characters(),
				}),
		})
		.refine((data) => data.password === data.confirmPassword, {
			message: IntlWrapper.translator.passwordsDoNotMatch(),
			path: ["confirmPassword"],
		});

export type UserFormValues = z.infer<ReturnType<typeof GetUserFormSchema>>;

export const GetUserSignInSchema = () =>
	z.object({
		username: z
			.string()
			.min(Constants.MINIMUM_USERNAME_LENGTH, {
				message: IntlWrapper.translator.username5Characters(),
			})
			.max(Constants.MAXIMUM_USERNAME_LENGTH, {
				message: IntlWrapper.translator.username30Characters(),
			}),
		password: z
			.string()
			.min(Constants.MINIMUM_PASSWORD_LENGTH, {
				message: IntlWrapper.translator.password8Characters(),
			})
			.max(Constants.MAXIMUM_PASSWORD_LENGTH, {
				message: IntlWrapper.translator.password32Characters(),
			}),
	});

export type UserSignInValues = z.infer<ReturnType<typeof GetUserSignInSchema>>;

export const GetBookUserFormSchema = () =>
	z.object({
		user_id: z.number().int({
			message: IntlWrapper.translator.userIDInt(),
		}),
		book_id: z.number().int({
			message: IntlWrapper.translator.bookIDInt(),
		}),
	});

export type BookUserFormValues = z.infer<
	ReturnType<typeof GetBookUserFormSchema>
>;

export const GetUserRoleSchema = () =>
	z.object({
		role_id: z.number().int({
			message: IntlWrapper.translator.roleIDInt(),
		}),
	});

export type UserRoleValues = z.infer<ReturnType<typeof GetUserRoleSchema>>;

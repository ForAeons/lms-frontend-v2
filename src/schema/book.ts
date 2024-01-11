import * as z from "zod";
import { IntlWrapper } from "@/components/language-provider";

export const GetBookFormSchema = () =>
	z
		.object({
			title: z
				.string()
				.min(2, {
					message: IntlWrapper.translator.title2Characters(),
				})
				.max(255, {
					message: IntlWrapper.translator.title255Characters(),
				}),
			author: z
				.string()
				.min(2, {
					message: IntlWrapper.translator.author2Characters(),
				})
				.max(255, {
					message: IntlWrapper.translator.author255Characters(),
				}),
			isbn: z.string(),
			publisher: z
				.string()
				.min(2, {
					message: IntlWrapper.translator.publisher2Characters(),
				})
				.max(100, {
					message: IntlWrapper.translator.publisher100Characters(),
				}),
			publication_date: z.date(),
			genre: z
				.string()
				.min(2, {
					message: IntlWrapper.translator.genre2Characters(),
				})
				.max(50, {
					message: IntlWrapper.translator.genre50Characters(),
				}),
			language: z.string().length(2, {
				message: IntlWrapper.translator.language2Characters(),
			}),
		})
		.refine((v) => v.isbn?.length === 10 || v.isbn?.length === 13, {
			message: IntlWrapper.translator.isbn10Or13Characters(),
			path: ["isbn"],
		})
		.refine(
			(v) =>
				v.publication_date < new Date() &&
				v.publication_date > new Date("1900-01-01"),
			{
				message: IntlWrapper.translator.publicationDateBetween1900AndToday(),
				path: ["publication_date"],
			},
		);

export type BookFormValues = z.infer<ReturnType<typeof GetBookFormSchema>>;

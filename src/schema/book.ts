import * as z from "zod";

export const GetBookFormSchema = () =>
	z
		.object({
			title: z
				.string()
				.min(2, {
					message: "Title must be at least 2 characters.",
				})
				.max(255, {
					message: "Title must be no more than 255 characters.",
				}),
			author: z
				.string()
				.min(2, {
					message: "Author must be at least 2 characters.",
				})
				.max(255, {
					message: "Author must be no more than 255 characters.",
				}),
			isbn: z.string(),
			publisher: z
				.string()
				.min(2, {
					message: "Publisher must be at least 2 characters.",
				})
				.max(100, {
					message: "Publisher must be no more than 100 characters.",
				}),
			publication_date: z.date(),
			genre: z
				.string()
				.min(2, {
					message: "Genre must be at least 2 characters.",
				})
				.max(50, {
					message: "Genre must be no more than 50 characters.",
				}),
			language: z.string().length(2, {
				message: "Language must be 2 characters.",
			}),
		})
		.refine((v) => v.isbn?.length === 10 || v.isbn?.length === 13, {
			message: "ISBN should be 10 or 13 characters long.",
			path: ["isbn"],
		})
		.refine(
			(v) =>
				v.publication_date < new Date() &&
				v.publication_date > new Date("1900-01-01"),
			{
				message: "Publication date should be between 1900 and today.",
				path: ["publication_date"],
			},
		);

export type BookFormValues = z.infer<ReturnType<typeof GetBookFormSchema>>;

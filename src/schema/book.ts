import * as z from "zod";

export const BookFormSchema = z
	.object({
		title: z.string().max(255),
		author: z.string().max(255),
		isbn: z.string(),
		publisher: z.string().max(100),
		publication_date: z.date(),
		genre: z.string().max(50),
		language: z.string().length(2),
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

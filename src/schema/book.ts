import * as z from "zod";

export const BookFormSchema = z.object({
	title: z.string(),
	author: z.string(),
	isbn: z.string(),
	publisher: z.string(),
	publication_date: z.date(),
	genre: z.string(),
	language: z.string().length(2),
});

export const QueryBookSchema = z
	.object({
		title: z.string().optional(),
		author: z.string().optional(),
		publisher: z.string().optional(),
		isbn: z.string().optional(),
	})
	.refine((v) => v.isbn?.length !== 10 && v.isbn?.length !== 13, {
		message: "ISBN should be 10 or 13 characters long.",
		path: ["isbn"],
	})
	.refine((v) => !v.title && !v.author && !v.publisher && !v.isbn, {
		message: "Either title, author, publisher, or isbn must be provided.",
		path: ["isbn"],
	});

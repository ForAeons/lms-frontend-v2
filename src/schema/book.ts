import * as z from "zod";

export const BookFormSchema = z.object({
	title: z.string(),
	author: z.string(),
	isbn: z.string(),
	publisher: z.string(),
	publication_date: z.string(),
	genre: z.string(),
	language: z.string().min(2).max(2),
});

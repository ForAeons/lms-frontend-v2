import * as z from "zod";
import { IntlWrapper } from "@/components/language-provider";
import { Translator } from "@/util";

export const GetBookCopyFormSchema = () =>
	z.object({
		book_id: z.number().int({
			message: IntlWrapper.translator.userIDInt(),
		}),
		count: z
			.number()
			.int({
				message: IntlWrapper.translator.userIDInt(),
			})
			.optional(),
	});

export type BookCopyFormValues = z.infer<
	ReturnType<typeof GetBookCopyFormSchema>
>;

export const GetBookCopyDetailedSchema = (t: Translator) =>
	z.object({
		id: z.number().int({
			message: t.userIDInt(),
		}),
		book_id: z.number().int({
			message: t.userIDInt(),
		}),
		status: z.string(),
	});

export type BookCopyDetailedValues = z.infer<
	ReturnType<typeof GetBookCopyDetailedSchema>
>;

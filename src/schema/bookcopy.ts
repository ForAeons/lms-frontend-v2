import * as z from "zod";
import { IntlWrapper } from "@/components/language-provider";

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

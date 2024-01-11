import * as z from "zod";
import { IntlWrapper } from "@/components/language-provider";

// We need to lazy load this due to need to dynamically render translations
export const GetAuditlogFormSchema = () =>
	z
		.object({
			action: z
				.string()
				.min(2, {
					message: IntlWrapper.translator.action2Characters(),
				})
				.max(255, {
					message: IntlWrapper.translator.action255Characters(),
				}),
			date: z.date(),
		})
		.refine((v) => v.date < new Date() && v.date > new Date("1900-01-01"), {
			message: IntlWrapper.translator.dateBetween1900AndToday(),
			path: ["date"],
		});

export type AuditlogFormValues = z.infer<
	ReturnType<typeof GetAuditlogFormSchema>
>;

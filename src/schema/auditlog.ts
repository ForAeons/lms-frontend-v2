import * as z from "zod";

// We need to lazy load this due to need to dynamically render translations
export const GetAuditlogFormSchema = () =>
	z
		.object({
			action: z.string({
				required_error: "Please enter the action.",
			}),
			date: z.date({
				required_error: "Please enter the date.",
			}),
		})
		.refine((v) => v.date < new Date() && v.date > new Date("1900-01-01"), {
			message: "Date should be between 1900 and today.",
			path: ["date"],
		});

export type AuditlogFormValues = z.infer<
	ReturnType<typeof GetAuditlogFormSchema>
>;

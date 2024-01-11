import * as z from "zod";

export const AuditlogFormSchema = z.object({
	action: z.string(),
	date: z.date(),
});

// We need to lazy load this due to need to dynamically render translations
export const GetAuditlogSchema = () =>
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

export type AuditlogFormValues = z.infer<ReturnType<typeof GetAuditlogSchema>>;

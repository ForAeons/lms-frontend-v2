import * as z from "zod";

// We need to lazy load this due to need to dynamically render translations
export const GetAuditlogFormSchema = () =>
	z
		.object({
			action: z
				.string()
				.min(2, {
					message: "Action must be at least 2 characters.",
				})
				.max(255, {
					message: "Action must be no more than 255 characters.",
				}),
			date: z.date(),
		})
		.refine((v) => v.date < new Date() && v.date > new Date("1900-01-01"), {
			message: "Date should be between 1900 and today.",
			path: ["date"],
		});

export type AuditlogFormValues = z.infer<
	ReturnType<typeof GetAuditlogFormSchema>
>;

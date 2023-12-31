import * as z from "zod";

export const AuditlogFormSchema = z.object({
	action: z.string(),
	date: z.date(),
});

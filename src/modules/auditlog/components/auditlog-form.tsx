import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { DialogFooter } from "@/components/ui/dialog";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { AuditlogFormSchema } from "@/schema";

export const AuditLogForm: React.FC<{
	defaultValues: z.infer<typeof AuditlogFormSchema>;
	onSubmit: UnaryHandler<z.infer<typeof AuditlogFormSchema>>;
	action: string;
}> = ({ defaultValues, onSubmit, action }) => {
	const form = useForm<z.infer<typeof AuditlogFormSchema>>({
		resolver: zodResolver(AuditlogFormSchema),
		defaultValues: defaultValues,
	});

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className="space-y-8 max-w-xl w-full"
			>
				<FormField
					control={form.control}
					name="action"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Event</FormLabel>
							<FormControl>
								<Textarea placeholder="What happened?" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<DialogFooter>
					<Button type="submit">{action}</Button>
				</DialogFooter>
			</form>
		</Form>
	);
};

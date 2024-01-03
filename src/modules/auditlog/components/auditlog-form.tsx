import React from "react";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
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
import { Calendar } from "@/components/ui/calendar";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { AuditlogFormSchema } from "@/schema";
import { cn } from "@/lib/utils";
import { useTranslations } from "@/hooks";

export const AuditLogForm: React.FC<{
	defaultValues: z.infer<typeof AuditlogFormSchema>;
	onSubmit: UnaryHandler<z.infer<typeof AuditlogFormSchema>>;
	action: string;
}> = ({ defaultValues, onSubmit, action }) => {
	const translate = useTranslations();
	const event = translate["m1czzY"]();
	const whatHappened = translate["eF7TQV"]();
	const date = translate["P7PLVj"]();
	const pickADate = translate["idkGk/"]();

	const form = useForm<z.infer<typeof AuditlogFormSchema>>({
		resolver: zodResolver(AuditlogFormSchema),
		defaultValues: defaultValues,
	});

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full">
				<FormField
					control={form.control}
					name="action"
					render={({ field }) => (
						<FormItem>
							<FormLabel>{event}</FormLabel>
							<FormControl>
								<Textarea placeholder={whatHappened} {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="date"
					render={({ field }) => (
						<FormItem className="flex flex-col">
							<FormLabel>{date}</FormLabel>
							<Popover>
								<PopoverTrigger asChild>
									<FormControl>
										<Button
											variant={"outline"}
											className={cn(
												"w-[240px] pl-3 text-left font-normal",
												!field.value && "text-muted-foreground",
											)}
										>
											{field.value ? (
												format(field.value, "P")
											) : (
												<span>{pickADate}</span>
											)}
											<CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
										</Button>
									</FormControl>
								</PopoverTrigger>
								<PopoverContent className="w-auto p-0" align="start">
									<Calendar
										mode="single"
										selected={field.value}
										onSelect={field.onChange}
										disabled={(date) =>
											date > new Date() || date < new Date("1900-01-01")
										}
										showOutsideDays
										initialFocus
									/>
								</PopoverContent>
							</Popover>
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

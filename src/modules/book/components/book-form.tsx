import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DialogFooter } from "@/components/ui/dialog";
import { Calendar } from "@/components/ui/calendar";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { BookFormSchema } from "@/schema";
import { LANGUAGE_SELECT_OPTIONS } from "@/constants";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { format } from "date-fns";

export const BookForm: React.FC<{
	defaultValues: z.infer<typeof BookFormSchema>;
	onSubmit: UnaryHandler<z.infer<typeof BookFormSchema>>;
	action: string;
}> = ({ defaultValues, onSubmit, action }) => {
	const form = useForm<z.infer<typeof BookFormSchema>>({
		resolver: zodResolver(BookFormSchema),
		defaultValues: defaultValues,
	});

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full">
				<FormField
					control={form.control}
					name="title"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Volume Title</FormLabel>
							<FormControl>
								<Input placeholder="The Great Gatsby" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="author"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Volume Author</FormLabel>
							<FormControl>
								<Input placeholder="F. Scott Fitzgerald" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="publisher"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Publisher</FormLabel>
							<FormControl>
								<Input placeholder="Alma Classics" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="publication_date"
					render={({ field }) => (
						<FormItem className="flex flex-col">
							<FormLabel>Publication Date</FormLabel>
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
												<span>Pick a date</span>
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
				<FormField
					control={form.control}
					name="genre"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Genre</FormLabel>
							<FormControl>
								<Input placeholder="Tragedy" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="language"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Language</FormLabel>
							<Select onValueChange={field.onChange} defaultValue={field.value}>
								<FormControl>
									<SelectTrigger>
										<SelectValue placeholder="Select language" />
									</SelectTrigger>
								</FormControl>
								<SelectContent>
									{LANGUAGE_SELECT_OPTIONS.map((opt) => {
										return (
											<SelectItem key={opt.value} value={opt.value}>
												{opt.label}
											</SelectItem>
										);
									})}
								</SelectContent>
							</Select>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="isbn"
					render={({ field }) => (
						<FormItem>
							<FormLabel>ISBN</FormLabel>
							<FormControl>
								<Input placeholder="978-1-84749-614-0" {...field} />
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

import React from "react";
import { useIntl } from "react-intl";
import { format } from "date-fns";
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

export const BookForm: React.FC<{
	defaultValues: z.infer<typeof BookFormSchema>;
	onSubmit: UnaryHandler<z.infer<typeof BookFormSchema>>;
	action: string;
}> = ({ defaultValues, onSubmit, action }) => {
	const intl = useIntl();
	const volumeTitle = intl.formatMessage({
		id: "0cfEAN",
		defaultMessage: "Volume Title",
	});
	const volumeTitlePlaceholder = intl.formatMessage({
		id: "aD09Do",
		defaultMessage: "The Great Gatsby",
	});
	const volumeAuthor = intl.formatMessage({
		id: "3kESYm",
		defaultMessage: "Volume Author",
	});
	const volumeAuthorPlaceholder = intl.formatMessage({
		id: "7iInTF",
		defaultMessage: "F. Scott Fitzgerald",
	});
	const publisher = intl.formatMessage({
		id: "Kdc67U",
		defaultMessage: "Publisher",
	});
	const publisherPlaceholder = intl.formatMessage({
		id: "20IX1q",
		defaultMessage: "Alma Classics",
	});
	const publicationDate = intl.formatMessage({
		id: "oR7LVU",
		defaultMessage: "Publication Date",
	});
	const pickADate = intl.formatMessage({
		id: "idkGk/",
		defaultMessage: "Pick a date",
	});
	const genre = intl.formatMessage({
		id: "O70sde",
		defaultMessage: "Genre",
	});
	const genrePlaceholder = intl.formatMessage({
		id: "a/NIGu",
		defaultMessage: "Tragedy",
	});
	const language = intl.formatMessage({
		id: "y1Z3or",
		defaultMessage: "Language",
	});
	const selectLanguage = intl.formatMessage({
		id: "eVlu1R",
		defaultMessage: "Select language",
	});
	const isbn = intl.formatMessage({
		id: "YXUQIi",
		defaultMessage: "ISBN",
	});

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
							<FormLabel>{volumeTitle}</FormLabel>
							<FormControl>
								<Input placeholder={volumeTitlePlaceholder} {...field} />
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
							<FormLabel>{volumeAuthor}</FormLabel>
							<FormControl>
								<Input placeholder={volumeAuthorPlaceholder} {...field} />
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
							<FormLabel>{publisher}</FormLabel>
							<FormControl>
								<Input placeholder={publisherPlaceholder} {...field} />
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
							<FormLabel>{publicationDate}</FormLabel>
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
				<FormField
					control={form.control}
					name="genre"
					render={({ field }) => (
						<FormItem>
							<FormLabel>{genre}</FormLabel>
							<FormControl>
								<Input placeholder={genrePlaceholder} {...field} />
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
							<FormLabel>{language}</FormLabel>
							<Select onValueChange={field.onChange} defaultValue={field.value}>
								<FormControl>
									<SelectTrigger>
										<SelectValue placeholder={selectLanguage} />
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
							<FormLabel>{isbn}</FormLabel>
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

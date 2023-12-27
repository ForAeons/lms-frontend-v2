import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DialogFooter } from "@/components/ui/dialog";
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
import { LANGUAGE_SELECT_OPTIONS } from "@/constants/select";

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
							<FormLabel>Title</FormLabel>
							<FormControl>
								<Input placeholder="Book title" {...field} />
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
							<FormLabel>Author name</FormLabel>
							<FormControl>
								<Input placeholder="David Martinez" {...field} />
							</FormControl>
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
								<Input placeholder="978-3-16-148410-0" {...field} />
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
								<Input placeholder="Penguin Random House" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="publication_date"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Publication Date</FormLabel>
							<FormControl>
								<Input placeholder={new Date().toISOString()} {...field} />
							</FormControl>
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
								<Input placeholder="Fantasy" {...field} />
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
							<FormLabel>Language Preference</FormLabel>
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

				<DialogFooter>
					<Button type="submit">{action}</Button>
				</DialogFooter>
			</form>
		</Form>
	);
};

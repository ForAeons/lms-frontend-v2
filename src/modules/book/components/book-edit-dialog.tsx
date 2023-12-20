import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { EditBtn } from "@/modules";
import { updateBookThunk, useAppDispatch } from "@/store";

const bookFormSchema = z.object({
	title: z.string(),
	author: z.string(),
	isbn: z.string(),
	publisher: z.string(),
	publication_date: z.string(),
	genre: z.string(),
	language: z.string().min(2).max(2),
});

export const BookEditDialog: React.FC<{
	book: Book;
}> = ({ book }) => {
	const form = useForm<z.infer<typeof bookFormSchema>>({
		resolver: zodResolver(bookFormSchema),
		defaultValues: {
			title: book.title,
			author: book.author,
			isbn: book.isbn,
			publisher: book.publisher,
			publication_date: book.publication_date,
			genre: book.genre,
			language: book.language,
		},
	});

	const dispatch = useAppDispatch();
	function onSubmit(values: z.infer<typeof bookFormSchema>) {
		dispatch(
			updateBookThunk({
				book: {
					id: book.id,
					title: values.title,
					author: values.author,
					isbn: values.isbn,
					publisher: values.publisher,
					publication_date: values.publication_date,
					genre: values.genre,
					language: values.language,
				},
			}),
		);
	}

	return (
		<Dialog>
			<DialogTrigger asChild>
				<div>
					<EditBtn />
				</div>
			</DialogTrigger>
			<DialogContent className="p-0">
				<ScrollArea className="max-h-[70vh]">
					<div className="p-6">
						<DialogHeader>
							<DialogTitle>Edit user profile</DialogTitle>
							<DialogDescription>
								{
									"Make changes to this user's profile here. Click save when you're done."
								}
							</DialogDescription>
						</DialogHeader>
						<Form {...form}>
							<form
								onSubmit={form.handleSubmit(onSubmit)}
								className="space-y-8 max-w-xl w-full"
							>
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
												<Input
													placeholder={new Date().toISOString()}
													{...field}
												/>
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
											<FormLabel>Language</FormLabel>
											<FormControl>
												<Input placeholder="EN" {...field} />
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>

								<DialogFooter>
									<Button type="submit">Edit</Button>
								</DialogFooter>
							</form>
						</Form>
					</div>
				</ScrollArea>
			</DialogContent>
		</Dialog>
	);
};

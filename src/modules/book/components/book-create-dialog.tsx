import React from "react";
import * as z from "zod";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { CreateBtn } from "@/modules";
import { createBookThunk, useAppDispatch } from "@/store";
import { BookFormSchema } from "@/schema";
import { BookForm } from ".";

export const BookCreateDialog: React.FC = () => {
	const defaultValues = {
		title: "",
		author: "",
		isbn: "",
		publisher: "",
		publication_date: "",
		genre: "",
		language: "",
	};

	const dispatch = useAppDispatch();
	function onSubmit(values: z.infer<typeof BookFormSchema>) {
		dispatch(
			createBookThunk({
				book: {
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
					<CreateBtn subject="book" />
				</div>
			</DialogTrigger>
			<DialogContent className="max-h-[75vh] p-0">
				<ScrollArea className="max-h-[70vh]">
					<div className="p-6">
						<DialogHeader>
							<DialogTitle>Add New Book</DialogTitle>
							<DialogDescription>
								{
									"	Add the details of the book here. Click upload when you're done."
								}
							</DialogDescription>
						</DialogHeader>
						<BookForm
							defaultValues={defaultValues}
							onSubmit={onSubmit}
							action="Create"
						/>
					</div>
					<ScrollBar />
				</ScrollArea>
			</DialogContent>
		</Dialog>
	);
};

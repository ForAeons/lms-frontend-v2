import React from "react";
import * as z from "zod";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { EditBtn } from "@/modules";
import { updateBookThunk, useAppDispatch } from "@/store";
import { BookFormSchema } from "@/schema";
import { BookForm } from ".";

export const BookEditDialog: React.FC<{
	book: Book;
}> = ({ book }) => {
	const defaultValues = {
		title: book.title,
		author: book.author,
		isbn: book.isbn,
		publisher: book.publisher,
		publication_date: book.publication_date,
		genre: book.genre,
		language: book.language,
	};

	const dispatch = useAppDispatch();
	function onSubmit(values: z.infer<typeof BookFormSchema>) {
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
						<BookForm
							defaultValues={defaultValues}
							onSubmit={onSubmit}
							action="Save"
						/>
					</div>
				</ScrollArea>
			</DialogContent>
		</Dialog>
	);
};

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
import { useTranslations } from "@/hooks";
import { BookForm } from ".";

export const BookCreateBtn: React.FC = () => {
	const translate = useTranslations();
	const bookText = translate["book"]();
	const createBook = translate["addNewBook"]();
	const createBookDesc = translate["addBookDesc"]();
	const createAction = translate["Create"]();

	const defaultValues = {
		title: "",
		author: "",
		isbn: "",
		publisher: "",
		publication_date: new Date(),
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
					publication_date: values.publication_date.toISOString(),
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
					<CreateBtn subject={bookText} />
				</div>
			</DialogTrigger>
			<DialogContent className="max-h-[75vh] p-0">
				<ScrollArea className="max-h-[70vh]">
					<div className="p-6">
						<DialogHeader>
							<DialogTitle>{createBook}</DialogTitle>
							<DialogDescription>{createBookDesc}</DialogDescription>
						</DialogHeader>
						<BookForm
							defaultValues={defaultValues}
							onSubmit={onSubmit}
							action={createAction}
						/>
					</div>
					<ScrollBar />
				</ScrollArea>
			</DialogContent>
		</Dialog>
	);
};

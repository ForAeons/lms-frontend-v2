import React from "react";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { BookEditDialog, BookNavBtn } from ".";
import { deleteBookThunk, useAppDispatch } from "@/store";
import { DeleteBtn } from "@/modules";
import { Badge } from "@/components/ui/badge";

export const BookCard: React.FC<{ book: Book; editable?: boolean }> = ({
	book,
	editable = false,
}) => {
	const dispatch = useAppDispatch();
	const handleDelete = () => dispatch(deleteBookThunk({ bookID: book.id }));
	return (
		<Card className="relative border-none hover:shadow-md transition-shadow pr-10">
			<div className="absolute right-0 top-1/2 -translate-y-1/2 flex flex-col items-end">
				{!editable && <BookNavBtn book={book} />}
				{editable && (
					<>
						<DeleteBtn handler={handleDelete} subject="book" />
						<BookEditDialog book={book} />
					</>
				)}
			</div>

			<CardHeader className="relative pr-10">
				<CardTitle>{book.title}</CardTitle>
				<CardDescription>By {book.author}</CardDescription>
				<div className="flex flex-wrap gap-3">
					<Badge className="w-fit">Genre - {book.genre}</Badge>
				</div>
			</CardHeader>

			<CardContent>
				<p>{book.language}</p>
				<p>{book.publisher}</p>
				<p>{book.publication_date}</p>
				<p className="text-sm text-muted-foreground self-start">{book.isbn}</p>
			</CardContent>
		</Card>
	);
};

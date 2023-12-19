import React from "react";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { BookDeleteBtn, BookEditDialog } from ".";

export const BookManageCard: React.FC<{ book: Book }> = ({ book }) => {
	return (
		<Card className="border-none hover:shadow-md transition-shadow">
			<CardHeader className="relative pr-10">
				<div className="absolute right-0 flex flex-col">
					<BookEditDialog book={book} />
					<BookDeleteBtn book={book} />
				</div>
				<CardTitle>{book.title}</CardTitle>
				<CardDescription>{book.genre}</CardDescription>
				<small className="text-sm font-medium leading-none">
					{book.author}
				</small>
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

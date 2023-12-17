import React from "react";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { BookDeleteBtn, BookEditDialog } from "./";

export const BookCard: React.FC<{ book: Book }> = ({ book }) => {
	return (
		<Card className="border-none hover:shadow-md transition-shadow">
			<CardHeader>
				<CardTitle>Title {book.title}</CardTitle>
				<CardDescription>Genre {book.genre}</CardDescription>
			</CardHeader>
			<CardContent>
				<p>Author {book.author}</p>
				<p>{book.language}</p>
				<p>{book.publisher}</p>
				<p>{book.publication_date}</p>
			</CardContent>
			<CardFooter className="w-full flex flex-col">
				<p className="text-sm text-muted-foreground self-start">{book.isbn}</p>
				<div className="w-full flex justify-between">
					<BookEditDialog book={book} />
					<BookDeleteBtn book={book} />
				</div>
			</CardFooter>
		</Card>
	);
};

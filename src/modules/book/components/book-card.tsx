import React from "react";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { BookMenuBtn } from "./book-menu-btn";

export const BookCard: React.FC<{ book: Book }> = ({ book }) => {
	return (
		<Card className="border-none hover:shadow-md">
			<CardHeader className="relative">
				<BookMenuBtn book={book} />
				<CardTitle>{book.title}</CardTitle>
				<CardDescription>{book.genre}</CardDescription>
			</CardHeader>
			<CardContent>
				<p>{book.author}</p>
				<p>{book.language}</p>
				<p>{book.publisher}</p>
				<p>{book.publication_date}</p>
			</CardContent>
			<CardFooter>
				<p>{book.isbn}</p>
			</CardFooter>
		</Card>
	);
};

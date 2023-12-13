import React from "react";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";

// interface Book {
// 	id: number;
// 	title: string;
// 	author: string;
// 	isbn: string;
// 	publisher: string;
// 	publicationDate: string;
// 	genre: string;
// 	language: string;
// }

export const BookCard: React.FC<{ book: Book }> = ({ book }) => {
	return (
		<Card className="w-full lg:w-96">
			<CardHeader>
				<CardTitle>{book.title}</CardTitle>
				<CardDescription>{book.genre}</CardDescription>
			</CardHeader>
			<CardContent>
				<p>{book.author}</p>
				<p>{book.language}</p>
				<p>{book.publisher}</p>
				<p>{book.publicationDate}</p>
			</CardContent>
			<CardFooter>
				<p>{book.isbn}</p>
			</CardFooter>
		</Card>
	);
};

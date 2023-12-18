import React from "react";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";

export const BookCard: React.FC<{ book: Book }> = ({ book }) => {
	return (
		<Card className="border-none hover:shadow-md transition-shadow">
			<CardHeader>
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
			</CardContent>
			<CardFooter className="w-full flex flex-col">
				<p className="text-sm text-muted-foreground self-start">{book.isbn}</p>
			</CardFooter>
		</Card>
	);
};

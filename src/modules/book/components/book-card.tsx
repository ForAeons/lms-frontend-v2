import React from "react";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export const BookCard: React.FC<{
	book: Book;
	children?: React.ReactNode;
	badges?: BadgeProps[];
}> = ({ book, children, badges }) => {
	return (
		<Card className="relative hover:shadow-md transition-shadow pr-10">
			<div className="absolute right-0 top-1/2 -translate-y-1/2 flex flex-col items-end">
				{children}
			</div>

			<CardHeader className="relative pr-10">
				<CardTitle>{book.title}</CardTitle>
				<CardDescription>By {book.author}</CardDescription>

				<div className="flex flex-wrap gap-3">
					<Badge className="w-fit">Genre - {book.genre}</Badge>

					{badges?.map((badge) => {
						return (
							<Badge className="w-fit" variant={badge.variant} key={badge.text}>
								{badge.text}
							</Badge>
						);
					})}
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

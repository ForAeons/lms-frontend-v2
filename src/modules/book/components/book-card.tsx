import React from "react";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { LANGUAGE_SELECT_OPTIONS } from "@/constants";
import { BookPicture } from ".";

export const BookCard: React.FC<{
	book: Book;
	children?: React.ReactNode;
	badges?: BadgeProps[];
}> = ({ book, children, badges }) => {
	const pubDate = new Date(book.publication_date);
	const langLabel =
		LANGUAGE_SELECT_OPTIONS.find((opt) => opt.value === book.language)?.label ??
		book.language;

	return (
		<Card className="relative flex lg:flex-row flex-col hover:shadow-md transition-shadow pr-10">
			<div className="absolute right-0 top-1/2 -translate-y-1/2 flex flex-col items-end">
				{children}
			</div>

			<div className="lg:w-[200px] w-[150px] h-fit lg:mr-0 lg:mb-6 mb-0 m-6 bg-muted rounded-md shadow-sm hover:shadow-md transition-shadow flex-shrink-0">
				<BookPicture book={book} />
			</div>

			<div>
				<CardHeader className="whitespace-pre-wrap">
					<CardTitle>{book.title}</CardTitle>
					<CardDescription>By {book.author}</CardDescription>
					<small className="text-sm font-medium leading-none">
						{`Published: ${pubDate.getFullYear()}-${pubDate.getMonth()}-${pubDate.getDate()} | ${langLabel}`}
					</small>
				</CardHeader>

				<CardContent className="flex flex-wrap gap-3">
					<Badge className="w-fit">Genre - {book.genre}</Badge>

					{badges?.map((badge) => {
						return (
							<Badge className="w-fit" variant={badge.variant} key={badge.text}>
								{badge.text}
							</Badge>
						);
					})}
				</CardContent>

				<CardFooter className="flex flex-col items-start">
					<p className="text-sm text-muted-foreground">
						{`Published by ${book.publisher}`}
					</p>
					<p className="text-sm text-muted-foreground">
						{`ISBN - ${book.isbn}`}
					</p>
				</CardFooter>
			</div>
		</Card>
	);
};

import React from "react";
import { useIntl } from "react-intl";
import { format } from "date-fns";
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
	const pubDate = format(new Date(book.publication_date), "P");
	const langLabel =
		LANGUAGE_SELECT_OPTIONS.find((opt) => opt.value === book.language)?.label ??
		book.language;

	const intl = useIntl();
	const byAuthor = intl.formatMessage(
		{ id: "br61pm", defaultMessage: "By {author}" },
		{ author: book.author },
	);
	const bookDescription = intl.formatMessage(
		{ id: "S1xMcR", defaultMessage: "Published: {date} | {lang}" },
		{ date: pubDate, lang: langLabel },
	);
	const genre = intl.formatMessage(
		{ id: "U0QrR1", defaultMessage: "Genre: {genre}" },
		{ genre: book.genre },
	);
	const publishedBy = intl.formatMessage(
		{ id: "rqygQ8", defaultMessage: "Published by {publisher}" },
		{ publisher: book.publisher },
	);
	const isbn = intl.formatMessage(
		{ id: "rTUFJj", defaultMessage: "ISBN: {isbn}" },
		{ isbn: book.isbn },
	);

	return (
		<Card className="relative flex lg:flex-row flex-col hover:shadow-md transition-shadow pr-10">
			<div className="absolute right-0 top-1/2 -translate-y-1/2 h-full flex flex-col justify-around">
				{children}
			</div>

			<div className="lg:w-[200px] w-[150px] h-fit lg:mr-0 lg:mb-6 mb-0 m-6 bg-muted rounded-md shadow-xl transition-shadow flex-shrink-0">
				<BookPicture book={book} />
			</div>

			<div>
				<CardHeader className="whitespace-pre-wrap">
					<CardTitle>{book.title}</CardTitle>
					<small className="text-sm font-medium leading-none">{byAuthor}</small>
					<CardDescription>{bookDescription}</CardDescription>
				</CardHeader>

				<CardContent className="flex flex-wrap gap-3">
					<Badge className="w-fit">{genre}</Badge>

					{badges?.map((badge) => (
						<Badge className="w-fit" variant={badge.variant} key={badge.text}>
							{badge.text}
						</Badge>
					))}
				</CardContent>

				<CardFooter className="flex flex-col items-start">
					<p className="text-sm text-muted-foreground">{publishedBy}</p>
					<p className="text-sm text-muted-foreground">{isbn}</p>
				</CardFooter>
			</div>
		</Card>
	);
};

import React from "react";
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
import { useTranslations } from "@/components/language-provider";
import { BookEditablePicture } from ".";

export const BookCard: React.FC<{
	book: Book;
	children?: React.ReactNode;
	badges?: BadgeProps[];
}> = ({ book, children, badges }) => {
	const pubDate = format(new Date(book.publication_date), "P");
	const langLabel =
		LANGUAGE_SELECT_OPTIONS.find((opt) => opt.value === book.language)?.label ??
		book.language;

	const translate = useTranslations();
	const byAuthor = translate.byAuthor({ author: book.author });
	const bookDesc = translate.publishedDateLang({
		date: pubDate,
		lang: langLabel,
	});
	const genre = translate.genreIs({ genre: book.genre });
	const publishedBy = translate.publishedBy({ publisher: book.publisher });
	const isbn = translate.ISBNIs({ isbn: book.isbn });

	return (
		<Card className="relative flex lg:flex-row flex-col hover:shadow-md transition-shadow pr-10">
			<div className="absolute right-0 top-1/2 -translate-y-1/2 h-full flex flex-col justify-around">
				{children}
			</div>

			<div className="relative lg:mr-0 lg:mb-6 mb-0 m-6 lg:w-[200px] w-[150px] rounded-md shadow-lg flex-shrink-0">
				<BookEditablePicture book={book} />
			</div>

			<div>
				<CardHeader className="whitespace-pre-wrap">
					<CardTitle>{book.title}</CardTitle>
					<small className="text-sm font-medium leading-none">{byAuthor}</small>
					<CardDescription>{bookDesc}</CardDescription>
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

import React from "react";
import { AspectRatio } from "@/components/ui/aspect-ratio";

export const BookPicture: React.FC<{ book: Omit<BookSimple, "id"> }> = ({
	book,
}) => {
	return (
		<AspectRatio ratio={7 / 10} className="overflow-hidden rounded-md">
			{book.thumbnail_url && (
				<img
					src={book.thumbnail_url}
					alt={book.title}
					className="object-cover h-full w-full object-center"
				/>
			)}
			{!book.thumbnail_url && (
				<div className="bg-muted px-2 h-full w-full">
					<small className="text-left text-5xl font-medium leading-none text-muted-foreground">
						{book.title}
					</small>
				</div>
			)}
		</AspectRatio>
	);
};

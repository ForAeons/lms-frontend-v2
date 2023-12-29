import React from "react";
import { AspectRatio } from "@/components/ui/aspect-ratio";

export const BookPicture: React.FC<{ book: BookSimple }> = ({ book }) => {
	return (
		<AspectRatio ratio={7 / 10} className="overflow-hidden">
			<small className="text-5xl font-medium leading-none text-muted-foreground">
				{book.title}
			</small>
		</AspectRatio>
	);
};

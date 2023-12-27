import React from "react";
import { AspectRatio } from "@/components/ui/aspect-ratio";

const BookPicture: React.FC<{ book: Book }> = ({ book }) => {
	return (
		<div className="overflow-hidden lg:w-[20vw] w-[30vw]">
			<AspectRatio ratio={7 / 10}>
				<small className="sm:text-5xl text-3xl font-medium leading-none text-muted-foreground">
					{book.title}
				</small>
			</AspectRatio>
		</div>
	);
};

export default BookPicture;

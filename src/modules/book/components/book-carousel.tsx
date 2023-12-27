import React from "react";
import { useNavigate } from "react-router-dom";
import Autoplay from "embla-carousel-autoplay";
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from "@/components/ui/carousel";
import { Card } from "@/components/ui/card";
import BookPicture from "./book-picture";

export const BookCarousel: React.FC<{ books: Book[] }> = ({ books }) => {
	const navigate = useNavigate();
	return (
		<Carousel
			className="w-full lg:max-w-2xl sm:max-w-md max-w-xs"
			opts={{
				align: "start",
			}}
			plugins={[
				Autoplay({
					delay: 3000,
				}),
			]}
		>
			<CarouselContent className="py-6 -ml-6">
				{books.map((book) => {
					return (
						<CarouselItem
							key={book.isbn}
							className="pl-6 basis-1/2 lg:basis-1/3"
						>
							<Card
								className="border-none shadow-md hover:shadow-lg transition-shadow flex bg-muted px-3 hover:cursor-pointer"
								onClick={() => navigate(`/book/${book.id}`)}
							>
								<BookPicture book={book} />
							</Card>
						</CarouselItem>
					);
				})}
			</CarouselContent>
			<CarouselNext />
			<CarouselPrevious />
		</Carousel>
	);
};

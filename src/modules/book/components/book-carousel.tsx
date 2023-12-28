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
import { BookPicture } from ".";
import { useMediaQuery } from "@/hooks";

export const BookCarousel: React.FC<{ books: Book[] }> = ({ books }) => {
	const isDesktop = useMediaQuery("(min-width: 1024px)");
	const navigate = useNavigate();
	return (
		<Carousel
			className="w-full lg:w-[calc(100%-100px)] max-w-fit lg:max-w-none"
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
							className="pl-6 basis-1/2 lg:basis-1/4"
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

			{isDesktop && (
				<>
					<CarouselNext />
					<CarouselPrevious />
				</>
			)}
		</Carousel>
	);
};

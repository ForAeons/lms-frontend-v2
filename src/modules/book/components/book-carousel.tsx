import React from "react";
import { useNavigate } from "react-router-dom";
import Autoplay from "embla-carousel-autoplay";
import {
	Carousel,
	CarouselApi,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from "@/components/ui/carousel";
import { Card } from "@/components/ui/card";
import { BookPicture } from ".";
import { useMediaQuery } from "@/hooks";

let carouselInstanceCount = 0;

export const BookCarousel: React.FC<{ books: BookSimple[] }> = ({ books }) => {
	const [api, setApi] = React.useState<CarouselApi>();
	const instanceIndex = React.useRef(carouselInstanceCount++).current;
	const isDesktop = useMediaQuery("(min-width: 1024px)");
	const navigate = useNavigate();

	React.useEffect(() => {
		return () => {
			carouselInstanceCount--;
		};
	}, []);

	React.useEffect(() => {
		if (!api) return;

		const timeOutID = setTimeout(() => {
			api.plugins().autoplay.play();
		}, instanceIndex * 250);

		return () => clearTimeout(timeOutID);
	}, [api, instanceIndex]);

	const carouselOpt = {
		align: "start",
		loop: true,
	};

	const autoPlayPlugin = Autoplay({
		playOnInit: false,
		delay: 4000,
		stopOnInteraction: false,
		stopOnMouseEnter: true,
	});

	return (
		<Carousel
			className="w-full lg:w-[calc(100%-100px)] max-w-fit lg:max-w-none"
			setApi={setApi}
			opts={carouselOpt}
			plugins={[autoPlayPlugin]}
		>
			<CarouselContent className="py-6 -ml-6">
				{books.map((book) => {
					return (
						<CarouselItem key={book.id} className="pl-6 basis-1/2 lg:basis-1/4">
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

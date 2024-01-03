import React from "react";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { LoaderPage, SearchBar } from "@/modules";
import {
	listBookThunk,
	listPopularBooksThunk,
} from "@/store/thunks/book-thunk";
import { useAppDispatch, useAppSelector } from "@/store";
import { useTranslations } from "@/hooks";
import { BookCarousel } from "..";

export const BookIndexPage: React.FC = () => {
	const translate = useTranslations();
	const dispatch = useAppDispatch();
	const bookState = useAppSelector((s) => s.book);
	const popularState = useAppSelector((s) => s.book.popular);

	const cq: CollectionQuery = {
		limit: 10,
		offset: 0,
		sortBy: "created_at",
		orderBy: "desc",
		filters: {},
	};

	React.useEffect(() => {
		const c = new AbortController();
		dispatch(listBookThunk({ q: cq, signal: c.signal }));
		return () => c.abort();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [dispatch]);

	React.useEffect(() => {
		const c = new AbortController();
		dispatch(listPopularBooksThunk({ signal: c.signal }));
		return () => c.abort();
	}, [dispatch]);

	if (bookState.isFetching || popularState.isFetching) {
		return <LoaderPage />;
	}

	const newArrivals = translate["Qpxx+l"]();
	const popularBooks = translate["yLinlZ"]();

	return (
		<ScrollArea className="lg:h-[100vh] space-y-1 lg:space-y-4 lg:py-4">
			<div className="grid lg:grid-cols-2 grid-cols-1 gap-3 px-3">
				<div className="col-span-full flex gap-3">
					<SearchBar cq={cq} baseUrl="/book" />
				</div>

				<h2 className="col-span-full scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
					{newArrivals}
				</h2>

				<div className="col-span-full flex justify-center">
					<BookCarousel books={bookState.books} />
				</div>

				<h2 className="col-span-full scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
					{popularBooks}
				</h2>

				<div className="col-span-full flex justify-center">
					<BookCarousel books={popularState.books} />
				</div>
			</div>
			<ScrollBar />
		</ScrollArea>
	);
};

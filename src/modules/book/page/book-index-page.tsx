import React from "react";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { LoaderPage } from "@/modules";
import { listBookThunk } from "@/store/thunks/book-thunk";
import { useAppDispatch, useAppSelector } from "@/store";
import { BookCarousel } from "..";

export const BookIndexPage: React.FC = () => {
	const dispatch = useAppDispatch();
	const bookState = useAppSelector((s) => s.book);
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

	if (bookState.isFetching) {
		return <LoaderPage />;
	}

	return (
		<ScrollArea className="lg:h-[100vh] space-y-1 lg:space-y-4 lg:py-4">
			<div className="grid grid-cols-1 gap-3 px-3">
				<h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
					New Arrivals
				</h2>

				<div className="w-full flex justify-center">
					<BookCarousel books={bookState.books} />
				</div>
			</div>
			<ScrollBar />
		</ScrollArea>
	);
};

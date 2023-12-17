import React from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { LoaderPage } from "@/modules";
import { useAppDispatch, useAppSelector } from "@/store";
import { BookCreateDialog, BookList } from "..";
import { listBookThunk } from "@/store/thunks/book-thunk";
import { Query } from "@/util";
import { BookSearchBar } from "../components/book-search-bar";

export const BookPage: React.FC = () => {
	const dispatch = useAppDispatch();
	const bookState = useAppSelector((s) => s.book);

	const [cq] = React.useState<CollectionQuery>({
		offset: bookState.offset,
		limit: bookState.limit,
		sortBy: "title",
		orderBy: "asc",
		filters: {},
	});

	React.useEffect(() => {
		dispatch(listBookThunk({ q: new Query(cq) }));
	}, [dispatch, cq]);

	if (bookState.isFetching) {
		return <LoaderPage />;
	}

	return (
		<ScrollArea className="h-[100vh] space-y-1 lg:space-y-4 py-4">
			<div className="w-full flex flex-col gap-3 px-3">
				<div className="w-full flex gap-3">
					<BookCreateDialog />
					<BookSearchBar cq={cq} />
				</div>
				<BookList books={bookState.books} />
			</div>
		</ScrollArea>
	);
};

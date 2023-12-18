import React from "react";
import { useNavigate } from "react-router-dom";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { LoaderPage } from "@/modules";
import { listBookThunk } from "@/store/thunks/book-thunk";
import { useAppDispatch, useAppSelector } from "@/store";
import { useQueryParams } from "@/hooks";
import { cqToUrl, getCollectionQuery, isValidCq } from "@/util";
import {
	BookCard,
	BookOrderBtn,
	BookPagination,
	BookSortBtn,
	BookSearchBar,
} from "..";

export const BookIndexPage: React.FC = () => {
	const dispatch = useAppDispatch();
	const bookState = useAppSelector((s) => s.book);
	const navigate = useNavigate();
	const queryParams = useQueryParams();
	const cq = getCollectionQuery(queryParams);

	React.useEffect(() => {
		dispatch(listBookThunk({ q: cq }));
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [dispatch, window.location.search]);

	React.useEffect(() => {
		const isValid = isValidCq(cq, bookState.meta.filtered_count);
		if (!isValid) navigate(`/book?${cqToUrl(cq)}`);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [navigate, window.location.search]);

	if (bookState.isFetching) {
		return <LoaderPage />;
	}

	return (
		<ScrollArea className="h-[100vh] space-y-1 lg:space-y-4 py-4">
			<div className="grid grid-cols-1 lg:grid-cols-2 gap-3 px-3">
				<div className="col-span-full flex gap-3">
					<BookOrderBtn cq={cq} />
					<BookSearchBar cq={cq} />
					<Separator orientation="vertical" />
					<BookSortBtn cq={cq} />
				</div>

				{bookState.books.map((book) => {
					return <BookCard key={book.isbn} book={book} />;
				})}

				<BookPagination cq={cq} />
			</div>
		</ScrollArea>
	);
};

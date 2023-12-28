import React from "react";
import { useNavigate } from "react-router-dom";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import {
	DeleteBtn,
	LoaderPage,
	OrderBtn,
	PaginationBar,
	SearchBar,
	SortSelect,
} from "@/modules";
import {
	deleteBookThunk,
	listBookThunk,
	useAppDispatch,
	useAppSelector,
} from "@/store";
import { useQueryParams } from "@/hooks";
import { cqToUrl, getCollectionQuery, isValidCq } from "@/util";
import { BookCard, BookCreateBtn, BookEditBtn } from "..";
import { BOOK_SORT_OPTIONS } from "@/constants";

export const ManageBookPage: React.FC = () => {
	const dispatch = useAppDispatch();
	const bookState = useAppSelector((s) => s.book);
	const navigate = useNavigate();
	const queryParams = useQueryParams();
	const cq = getCollectionQuery(queryParams);

	React.useEffect(() => {
		const c = new AbortController();
		dispatch(listBookThunk({ q: cq, signal: c.signal }));
		return () => c.abort();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [dispatch, window.location.search]);

	React.useEffect(() => {
		const isValid = isValidCq(cq, bookState.meta.filtered_count);
		if (!isValid) navigate(`/book?${cqToUrl(cq)}`);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [navigate, window.location.search]);

	if (bookState.isFetching) return <LoaderPage />;

	return (
		<ScrollArea className="lg:h-[100vh] space-y-1 lg:space-y-4 lg:py-4">
			<div className="w-full grid grid-cols-1 gap-3 px-3">
				<div className="flex gap-3">
					<BookCreateBtn />
					<SearchBar cq={cq} />
				</div>

				<div className="flex gap-3">
					<OrderBtn cq={cq} />
					<SortSelect cq={cq} opt={BOOK_SORT_OPTIONS} />
				</div>

				{bookState.books.map((book) => (
					<BookCard key={book.id} book={book}>
						<DeleteBtn
							handler={() => dispatch(deleteBookThunk({ bookID: book.id }))}
							subject="book"
						/>
						<BookEditBtn book={book} />
					</BookCard>
				))}

				<PaginationBar cq={cq} total={bookState.meta.filtered_count} />
			</div>
			<ScrollBar />
		</ScrollArea>
	);
};

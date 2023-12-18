import React from "react";
import { useNavigate } from "react-router-dom";
import { ScrollArea } from "@/components/ui/scroll-area";
import { LoaderPage } from "@/modules";
import { listBookThunk } from "@/store/thunks/book-thunk";
import { useAppDispatch, useAppSelector } from "@/store";
import { useQueryParams } from "@/hooks";
import { cqToUrl, getCollectionQuery, isValidCq } from "@/util";
import { BookCreateDialog, BookList, BookSearchBar } from "..";
import { BookPagination } from "../components/book-pagination";

export const BookPage: React.FC = () => {
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
			<div className="w-full flex flex-col gap-3 px-3">
				<div className="w-full flex gap-3">
					<BookCreateDialog />
					<BookSearchBar cq={cq} />
				</div>

				<BookList books={bookState.books} />
				<BookPagination cq={cq} />
			</div>
		</ScrollArea>
	);
};

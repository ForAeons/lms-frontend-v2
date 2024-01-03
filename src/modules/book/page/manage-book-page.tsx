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
	CheckPermission,
	deleteBookThunk,
	listBookThunk,
	useAppDispatch,
	useAppSelector,
} from "@/store";
import { useQueryParams, useTranslations } from "@/hooks";
import { cqToUrl, getCollectionQuery, isValidCq } from "@/util";
import {
	BOOK_SORT_OPTIONS,
	CREATE_BOOK,
	DELETE_BOOK,
	UPDATE_BOOK,
} from "@/constants";
import { BookCard, BookCreateBtn, BookEditBtn } from "..";

export const ManageBookPage: React.FC = () => {
	const translate = useTranslations();
	const dispatch = useAppDispatch();
	const bookState = useAppSelector((s) => s.book);
	const canCreateBook = useAppSelector((s) => CheckPermission(s, CREATE_BOOK));
	const canUpdateBook = useAppSelector((s) => CheckPermission(s, UPDATE_BOOK));
	const canDeleteBook = useAppSelector((s) => CheckPermission(s, DELETE_BOOK));
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

	const bookTitle = translate["manageBooks"]();
	const bookText = translate["book"]();

	return (
		<ScrollArea className="lg:h-[100vh] space-y-1 lg:space-y-4 lg:py-4">
			<div className="w-full grid grid-cols-1 gap-3 px-3">
				<h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
					{bookTitle}
				</h2>

				<div className="flex gap-3">
					{canCreateBook && <BookCreateBtn />}
					<SearchBar cq={cq} />
				</div>

				<div className="flex gap-3">
					<OrderBtn cq={cq} />
					<SortSelect cq={cq} opt={BOOK_SORT_OPTIONS} />
				</div>

				{bookState.books.map((book) => (
					<BookCard key={book.id} book={book}>
						{canDeleteBook && (
							<DeleteBtn
								handler={() => dispatch(deleteBookThunk({ bookID: book.id }))}
								subject={bookText}
							/>
						)}

						{canUpdateBook && <BookEditBtn book={book} />}
					</BookCard>
				))}

				<PaginationBar cq={cq} total={bookState.meta.filtered_count} />
			</div>
			<ScrollBar />
		</ScrollArea>
	);
};

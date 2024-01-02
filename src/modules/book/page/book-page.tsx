import React from "react";
import { useIntl } from "react-intl";
import { useParams } from "react-router-dom";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { LoaderPage, NavBackBtn } from "@/modules";
import { getBookThunk, useAppDispatch, useAppSelector } from "@/store";
import { BookCard, BookLoanBtn, BookReserveBtn, bookToBadgeProps } from "..";

export const BookPage: React.FC = () => {
	const intl = useIntl();
	const dispatch = useAppDispatch();
	const bookState = useAppSelector((s) => s.book);
	const book = useAppSelector((s) => s.book.book);
	const { book_id } = useParams();

	React.useEffect(() => {
		const id = parseInt(book_id ?? "");
		if (isNaN(id)) return;

		const c = new AbortController();
		dispatch(getBookThunk({ bookID: id, signal: c.signal }));
		return () => c.abort();
	}, [dispatch, book_id]);

	if (bookState.isFetching || !book) return <LoaderPage />;

	const availCopy = book.book_copies.find((bc) => bc.status === "available");

	return (
		<ScrollArea className="lg:h-[100vh] space-y-1 lg:space-y-4 lg:py-4">
			<div className="w-full flex flex-col gap-3 px-3">
				<BookCard book={book} badges={bookToBadgeProps(book, intl)}>
					<NavBackBtn />
					{availCopy && <BookLoanBtn book={book} copyID={availCopy.id} />}
					{availCopy && <BookReserveBtn book={book} copyID={availCopy.id} />}
				</BookCard>
			</div>
			<ScrollBar />
		</ScrollArea>
	);
};

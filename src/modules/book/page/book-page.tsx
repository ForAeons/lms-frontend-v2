import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { LoadingPage, NavBackBtn } from "@/modules";
import { useValidateIntegerOrReroute } from "@/hooks";
import { BookRoutes, bookApi } from "@/api";
import { BookCard, BookLoanBtn, BookReserveBtn, bookToBadgeProps } from "..";

export const BookPage: React.FC = () => {
	const { book_id: book_id_param } = useParams();
	const book_id = useValidateIntegerOrReroute(book_id_param, "/book");

	const { status, data } = useQuery({
		enabled: !!book_id,
		queryKey: [BookRoutes.BASE, book_id],
		queryFn: ({ signal }) => bookApi.GetBook(book_id, signal),
	});

	if (status === "pending" || !data?.data) return <LoadingPage />;

	const book = data.data;
	const availCopy = book.book_copies.find((bc) => bc.status === "available");

	return (
		<ScrollArea className="lg:h-[100vh] space-y-1 lg:space-y-4 lg:py-4">
			<div className="w-full flex flex-col gap-3 px-3">
				<BookCard book={book} badges={bookToBadgeProps(book)}>
					<NavBackBtn />
					{availCopy && <BookLoanBtn book={book} copyID={availCopy.id} />}
					{availCopy && <BookReserveBtn book={book} copyID={availCopy.id} />}
				</BookCard>
			</div>
			<ScrollBar />
		</ScrollArea>
	);
};

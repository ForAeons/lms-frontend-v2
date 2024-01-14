import React from "react";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { DataTable, LoadingPage, NavBackBtn } from "@/modules";
import { BookCard, BookEditBtn, useTranslatedColumns } from "..";
import { useParams } from "react-router-dom";
import { useValidateIntegerOrReroute } from "@/hooks";
import { useQuery } from "@tanstack/react-query";
import { BookRoutes, bookApi } from "@/api";
import { CheckPermission, useAppSelector } from "@/store";
import { UPDATE_BOOK } from "@/constants";
import { useTranslations } from "@/components/language-provider";

export const ManageBookCopyPage: React.FC = () => {
	const translate = useTranslations();
	const { book_id: book_id_param } = useParams();
	const book_id = useValidateIntegerOrReroute(book_id_param, "/manage/book");

	const bookQuery = useQuery({
		enabled: !!book_id && !isNaN(book_id),
		queryKey: [BookRoutes.BASE, book_id],
		queryFn: () => bookApi.GetBook(book_id),
	});

	const canUpdateBook = useAppSelector((s) => CheckPermission(s, UPDATE_BOOK));

	const book = bookQuery.data?.data;

	const columns = useTranslatedColumns();

	const bookTitle = translate.manageBooks();
	const copies = translate.copies();

	return (
		<ScrollArea className="lg:h-[100vh] space-y-1 lg:space-y-4 lg:py-4">
			<div className="w-full grid grid-cols-1 gap-3 px-3">
				<h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
					{bookTitle}
				</h2>

				{(bookQuery.status === "pending" || !book) && <LoadingPage />}

				{!(bookQuery.status === "pending" || !book) && (
					<>
						<BookCard book={book}>
							<NavBackBtn />
							{canUpdateBook && <BookEditBtn book={book} />}
						</BookCard>

						<h2 className="scroll-m-20 text-2xl font-semibold tracking-tight">
							{copies}
						</h2>

						<DataTable columns={columns} data={book.book_copies} />
					</>
				)}
			</div>
			<ScrollBar />
		</ScrollArea>
	);
};

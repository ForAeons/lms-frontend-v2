import React from "react";
import { useParams } from "react-router-dom";
import { LoaderPage } from "@/modules";
import { useAppDispatch, useAppSelector } from "@/store";
import { getBookThunk } from "@/store/thunks/book-thunk";
import { toast } from "@/components/ui/use-toast";
import { BookCard } from "..";
import { ScrollArea } from "@/components/ui/scroll-area";

export const BookPage: React.FC = () => {
	const dispatch = useAppDispatch();
	const book = useAppSelector((s) => s.book);

	const { book_id } = useParams();

	React.useEffect(() => {
		if (!book_id) return;

		const id = parseInt(book_id);
		if (isNaN(id)) {
			toast({
				variant: "destructive",
				title: "Bad Book ID",
				description: `The book id "${book_id}" is not a number`,
			});
			return;
		}

		dispatch(
			getBookThunk({
				bookID: id,
			}),
		);
	}, [dispatch, book_id]);

	if (book.isFetching || !book.book) return <LoaderPage />;

	return (
		<ScrollArea className="h-[100vh] space-y-1 lg:space-y-4 py-4">
			<div className="w-full flex flex-col gap-3 px-3">
				<BookCard book={book.book} />
			</div>
		</ScrollArea>
	);
};

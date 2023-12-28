import React from "react";
import { useParams } from "react-router-dom";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { toast } from "@/components/ui/use-toast";
import { LoaderPage, NavBackBtn } from "@/modules";
import {
	getBookThunk,
	loanBookThunk,
	reserveBookThunk,
	useAppDispatch,
	useAppSelector,
} from "@/store";
import { BookCard, BookLoanBtn, BookReserveBtn } from "..";

export const BookPage: React.FC = () => {
	const dispatch = useAppDispatch();
	const bookState = useAppSelector((s) => s.book);
	const book = useAppSelector((s) => s.book.book);
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

		const c = new AbortController();
		dispatch(
			getBookThunk({
				bookID: id,
				signal: c.signal,
			}),
		);
		return () => c.abort();
	}, [dispatch, book_id]);

	if (bookState.isFetching || !book) return <LoaderPage />;

	const handBorrow = () => {
		dispatch(
			loanBookThunk({
				bookID: book.id,
			}),
		);
	};

	const handleRes = () => {
		dispatch(
			reserveBookThunk({
				bookID: book.id,
			}),
		);
	};

	const isAvailable = book.book_copies.some((bc) => bc.status === "available");
	const total = book.book_copies.length;
	const onHoldTotal = book.book_copies.filter(
		(bc) => bc.status !== "available",
	).length;
	const copy = book.book_copies.length === 1 ? "copy" : "copies";
	const badgeText = `${onHoldTotal} on hold | ${total} ${copy}`;
	const badgeVariant = isAvailable ? "secondary" : "destructive";
	const badges: BadgeProps[] = [
		{
			text: badgeText,
			variant: badgeVariant,
		},
	];

	return (
		<ScrollArea className="lg:h-[100vh] space-y-1 lg:space-y-4 lg:py-4">
			<div className="w-full flex flex-col gap-3 px-3">
				<BookCard book={book} badges={badges}>
					<NavBackBtn />
					{isAvailable && <BookLoanBtn handler={handBorrow} book={book} />}
					{isAvailable && <BookReserveBtn handler={handleRes} book={book} />}
				</BookCard>
			</div>
			<ScrollBar />
		</ScrollArea>
	);
};

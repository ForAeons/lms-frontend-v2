import React from "react";
import { useParams } from "react-router-dom";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
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
import { BookBadge, BookLoanBtn, BookReserveBtn } from "..";

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

		dispatch(
			getBookThunk({
				bookID: id,
			}),
		);
	}, [dispatch, book_id]);

	if (bookState.isFetching || !book) return <LoaderPage />;

	const handBorrow = () => {
		dispatch(
			loanBookThunk({
				bookID: book.id,
			}),
		);
	};

	const handleReserve = () => {
		dispatch(
			reserveBookThunk({
				bookID: book.id,
			}),
		);
	};

	return (
		<ScrollArea className="h-[100vh] space-y-1 lg:space-y-4 py-4">
			<div className="w-full flex flex-col gap-3 px-3">
				<Card className="relative border-none hover:shadow-md transition-shadow pr-10">
					<div className="absolute right-0 top-1/2 -translate-y-1/2 flex flex-col items-end">
						<NavBackBtn />
						{bookState.bookStatus === "available" && (
							<>
								<BookLoanBtn handler={handBorrow} book={book} />
								<BookReserveBtn handler={handleReserve} book={book} />
							</>
						)}
					</div>

					<CardHeader>
						<CardTitle>{book.title}</CardTitle>
						<CardDescription>By {book.author}</CardDescription>
						<div className="flex flex-wrap gap-3">
							<Badge className="w-fit">Genre - {book.genre}</Badge>
							<BookBadge status={bookState.bookStatus} />
						</div>
					</CardHeader>

					<CardContent>
						<p>{book.language}</p>
						<p>{book.publisher}</p>
						<p>{book.publication_date}</p>
						<p className="text-sm text-muted-foreground self-start">
							{book.isbn}
						</p>
					</CardContent>
				</Card>
			</div>
			<ScrollBar />
		</ScrollArea>
	);
};

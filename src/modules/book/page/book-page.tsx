import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { toast } from "@/components/ui/use-toast";
import { LoaderPage } from "@/modules";
import {
	getBookThunk,
	loanBookThunk,
	reserveBookThunk,
	useAppDispatch,
	useAppSelector,
} from "@/store";
import { MD_ICON_SIZE } from "@/constants";
import { BookBadge } from "..";
import { ArrowLeftToLineIcon, BookLockIcon, BookUpIcon } from "lucide-react";

export const BookPage: React.FC = () => {
	const dispatch = useAppDispatch();
	const bookState = useAppSelector((s) => s.book);
	const book = useAppSelector((s) => s.book.book);
	const navigate = useNavigate();
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
				<Card className="border-none hover:shadow-md transition-shadow">
					<CardHeader className="relative pr-10">
						<Button
							variant="ghost"
							className="absolute right-0 hover:bg-transparent hover:opacity-50 transition-opacity"
							onClick={() => navigate(-1)}
						>
							<ArrowLeftToLineIcon size={MD_ICON_SIZE} />
						</Button>
						<CardTitle>{book.title}</CardTitle>
						<CardDescription>{book.genre}</CardDescription>
						<small className="text-sm font-medium leading-none">
							{book.author}
						</small>
						<BookBadge status={bookState.bookStatus} />
					</CardHeader>
					<CardContent>
						<p>{book.language}</p>
						<p>{book.publisher}</p>
						<p>{book.publication_date}</p>
						<p className="text-sm text-muted-foreground self-start">
							{book.isbn}
						</p>
					</CardContent>
					{bookState.bookStatus === "available" && (
						<CardFooter className="flex justify-around">
							<Button onClick={handBorrow}>
								<BookUpIcon size={MD_ICON_SIZE} className="mr-3" />
								Borrow
							</Button>
							<Button variant="secondary" onClick={handleReserve}>
								<BookLockIcon size={MD_ICON_SIZE} className="mr-3" />
								Reserve
							</Button>
						</CardFooter>
					)}
				</Card>
			</div>
		</ScrollArea>
	);
};

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
import { getBookThunk, useAppDispatch, useAppSelector } from "@/store";
import { MD_ICON_SIZE } from "@/constants";
import { BookBadge } from "..";

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

	return (
		<ScrollArea className="h-[100vh] space-y-1 lg:space-y-4 py-4">
			<div className="w-full flex flex-col gap-3 px-3">
				<Card className="border-none hover:shadow-md transition-shadow">
					<CardHeader className="relative pr-10">
						<Button
							variant="ghost"
							className="absolute right-0 hover:bg-transparent hover:opacity-50 transition-opacity"
							onClick={() => navigate(`${book.id}`)}
						>
							<svg
								width={MD_ICON_SIZE}
								height={MD_ICON_SIZE}
								viewBox="0 0 15 15"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									fillRule="evenodd"
									clipRule="evenodd"
									d="M12 13C12.5523 13 13 12.5523 13 12V3C13 2.44771 12.5523 2 12 2H3C2.44771 2 2 2.44771 2 3V6.5C2 6.77614 2.22386 7 2.5 7C2.77614 7 3 6.77614 3 6.5V3H12V12H8.5C8.22386 12 8 12.2239 8 12.5C8 12.7761 8.22386 13 8.5 13H12ZM9 6.5C9 6.5001 9 6.50021 9 6.50031V6.50035V9.5C9 9.77614 8.77614 10 8.5 10C8.22386 10 8 9.77614 8 9.5V7.70711L2.85355 12.8536C2.65829 13.0488 2.34171 13.0488 2.14645 12.8536C1.95118 12.6583 1.95118 12.3417 2.14645 12.1464L7.29289 7H5.5C5.22386 7 5 6.77614 5 6.5C5 6.22386 5.22386 6 5.5 6H8.5C8.56779 6 8.63244 6.01349 8.69139 6.03794C8.74949 6.06198 8.80398 6.09744 8.85143 6.14433C8.94251 6.23434 8.9992 6.35909 8.99999 6.49708L8.99999 6.49738"
									fill="currentColor"
								></path>
							</svg>
						</Button>
						<CardTitle>{book.title}</CardTitle>
						<CardDescription>{book.genre}</CardDescription>
						<small className="text-sm font-medium leading-none">
							{book.author}
						</small>
						<BookBadge book={book} />
					</CardHeader>
					<CardContent>
						<p>{book.language}</p>
						<p>{book.publisher}</p>
						<p>{book.publication_date}</p>
						<p className="text-sm text-muted-foreground self-start">
							{book.isbn}
						</p>
					</CardContent>
					<CardFooter></CardFooter>
				</Card>
			</div>
		</ScrollArea>
	);
};

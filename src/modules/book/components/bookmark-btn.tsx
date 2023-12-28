import React from "react";
import { BookmarkIcon, BookmarkXIcon } from "lucide-react";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { LG_ICON_SIZE } from "@/constants";
import {
	createBookmarkThunk,
	deleteBookmarkThunk,
	useAppDispatch,
	useAppSelector,
} from "@/store";

export const BookmarkBtn: React.FC<{ book: Book; bm?: Bookmark }> = ({
	book,
}) => {
	const dispatch = useAppDispatch();
	const bookmarks = useAppSelector((state) => state.app.bookmarks);

	const handleBookmark = () =>
		dispatch(createBookmarkThunk({ bookID: book.id }));

	const handleUnbookmark = (bookmarkID: number) => () =>
		dispatch(deleteBookmarkThunk({ bookID: book.id, bookmarkID: bookmarkID }));

	const marked = bookmarks.find((bookmark) => bookmark.book_id === book.id);

	return (
		<TooltipProvider>
			<Tooltip>
				<TooltipTrigger asChild>
					<Button
						variant="ghost"
						className="hover:bg-transparent hover:opacity-50 transition-opacity"
						onClick={marked ? handleUnbookmark(marked.id) : handleBookmark}
					>
						{!marked && (
							<BookmarkIcon className="text-primary" size={LG_ICON_SIZE} />
						)}
						{marked && (
							<BookmarkXIcon className="text-destructive" size={LG_ICON_SIZE} />
						)}
					</Button>
				</TooltipTrigger>
				<TooltipContent>
					<p>Borrow</p>
				</TooltipContent>
			</Tooltip>
		</TooltipProvider>
	);
};

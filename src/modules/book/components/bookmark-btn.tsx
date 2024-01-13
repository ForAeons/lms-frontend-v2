import React from "react";
import { toast } from "sonner";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { BookmarkIcon, BookmarkXIcon } from "lucide-react";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { useTranslations } from "@/components/language-provider";
import { BookmarkRoutes, bookApi, bookmarkApi } from "@/api";
import { newUserCollectionQuery } from "@/util";
import { LG_ICON_SIZE, TOOLTIP_DELAY } from "@/constants";
import { useAppSelector } from "@/store";

export const BookmarkBtn: React.FC<{ book: Book }> = ({ book }) => {
	const translate = useTranslations();
	const user_id = useAppSelector((state) => state.app.user?.id);
	const cq = newUserCollectionQuery(user_id);

	// we can afford to use useQuery here for all bookmarks since its cached
	const { status, data } = useQuery({
		enabled: !!user_id,
		queryKey: [BookmarkRoutes.BASE],
		queryFn: ({ signal }) => bookmarkApi.ListBookmarks(cq, signal),
	});

	const myBookmarks = data?.data;

	const queryClient = useQueryClient();
	const createBookmarkMutation = useMutation({
		mutationKey: [BookmarkRoutes.BASE, "new"],
		mutationFn: bookApi.CreateBookmark,
		onSuccess: (data) => {
			const bookmark = data!.data;
			queryClient.invalidateQueries({ queryKey: [BookmarkRoutes.BASE] });
			toast.success(translate.Success(), {
				description: translate.createBookmarkDesc({
					title: bookmark.book.title,
				}),
			});
		},
	});

	const deleteBookmarkMutation = useMutation({
		mutationKey: [BookmarkRoutes.BASE, book.id],
		mutationFn: bookmarkApi.DeleteBookmark,
		onSuccess: (data) => {
			const bookmark = data!.data;
			queryClient.invalidateQueries({ queryKey: [BookmarkRoutes.BASE] });
			toast.success(translate.Success(), {
				description: translate.deleteBookmarkDesc({
					title: bookmark.book.title,
				}),
			});
		},
	});

	const marked = myBookmarks?.find((bookmark) => bookmark.book_id === book.id);
	const handleBookmark = () => createBookmarkMutation.mutate(book.id);
	const handleUnbookmark = () => {
		if (!marked) return;
		deleteBookmarkMutation.mutate(marked.id);
	};

	const bookmark = translate.Bookmark();
	const remove = translate.Remove();

	return (
		<TooltipProvider delayDuration={TOOLTIP_DELAY}>
			<Tooltip>
				<TooltipTrigger asChild>
					<Button
						variant="ghost"
						disabled={status === "pending"}
						className="hover:bg-transparent hover:opacity-50 transition-opacity"
						onClick={marked ? handleUnbookmark : handleBookmark}
					>
						{!marked && (
							<BookmarkIcon className="text-primary" size={LG_ICON_SIZE} />
						)}
						{marked && (
							<BookmarkXIcon className="text-destructive" size={LG_ICON_SIZE} />
						)}
						<span className="sr-only">{marked ? remove : bookmark}</span>
					</Button>
				</TooltipTrigger>
				<TooltipContent>
					<p>{marked ? remove : bookmark}</p>
				</TooltipContent>
			</Tooltip>
		</TooltipProvider>
	);
};

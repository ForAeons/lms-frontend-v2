import React from "react";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { useAppSelector } from "@/store";
import {
	BookCard,
	BookNavBtn,
	BookmarkBtn,
	bookToBadgeProps,
} from "@/modules/book";
import { useTranslations } from "@/components/language-provider";

export const BookmarkPage: React.FC = () => {
	const translate = useTranslations();
	const myBookmarks = translate.myBookmarks();

	const bookmarks = useAppSelector((state) => state.app.bookmarks);
	return (
		<ScrollArea className="lg:h-[100vh] space-y-1 lg:space-y-4 lg:py-4">
			<div className="w-full grid grid-cols-1 gap-3 px-3">
				<h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
					{myBookmarks}
				</h2>

				{bookmarks.map((b) => (
					<BookCard key={b.id} book={b.book} badges={bookToBadgeProps(b.book)}>
						<BookNavBtn book={b.book} url={`/book/${b.book_id}`} />
						<BookmarkBtn book={b.book} />
					</BookCard>
				))}
			</div>
			<ScrollBar />
		</ScrollArea>
	);
};

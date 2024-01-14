import React from "react";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { useAppSelector } from "@/store";
import { BookCard, BookmarkBtn, bookToBadgeProps } from "@/modules/book";
import { useTranslations } from "@/components/language-provider";
import { useQuery } from "@tanstack/react-query";
import { BookmarkRoutes, bookmarkApi } from "@/api";
import { newUserCollectionQuery } from "@/util";
import { LoadingPage } from "@/modules";

export const BookmarkPage: React.FC = () => {
	const translate = useTranslations();
	const user_id = useAppSelector((state) => state.app.user?.id);
	const cq = newUserCollectionQuery(user_id);

	const { status, data } = useQuery({
		enabled: !!user_id,
		queryKey: [BookmarkRoutes.BASE, cq],
		queryFn: ({ signal }) => bookmarkApi.ListBookmarks(cq, signal),
	});

	const myBookmarks = translate.myBookmarks();
	const nothingHere = translate.nothingHereYet();

	return (
		<ScrollArea className="lg:h-[100vh] space-y-1 lg:space-y-4 lg:py-4">
			<div className="w-full grid grid-cols-1 gap-3 px-3">
				<h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
					{myBookmarks}
				</h2>

				{(status === "pending" || !data) && <LoadingPage />}

				{!(status === "pending" || !data) && data.data.length === 0 && (
					<p className="text-sm text-muted-foreground">{nothingHere}</p>
				)}

				{!(status === "pending" || !data) &&
					data.data.map((b) => (
						<BookCard
							key={b.id}
							book={b.book}
							badges={bookToBadgeProps(b.book, translate)}
						>
							<BookmarkBtn book={b.book} />
						</BookCard>
					))}
			</div>
			<ScrollBar />
		</ScrollArea>
	);
};

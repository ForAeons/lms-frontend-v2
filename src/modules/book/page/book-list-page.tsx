import React from "react";
import {
	keepPreviousData,
	useQuery,
	useQueryClient,
} from "@tanstack/react-query";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import {
	SearchBar,
	LoaderPage,
	PaginationBar,
	OrderBtn,
	SortSelect,
} from "@/modules";
import { useCollectionQuery, useValidateCqOrReroute } from "@/hooks";
import { useTranslations } from "@/components/language-provider";
import { BOOK_SORT_OPTIONS } from "@/constants";
import { BookRoutes, bookApi } from "@/api";
import {
	getNextPage,
	getPreviousPage,
	hasNextPage,
	hasPreviousPage,
} from "@/util";
import { BookCard, BookNavBtn, BookmarkBtn, bookToBadgeProps } from "..";

export const BookListPage: React.FC = () => {
	const translate = useTranslations();
	const cq = useCollectionQuery();

	const { status, data } = useQuery({
		queryKey: [BookRoutes.BASE, cq],
		queryFn: ({ signal }) => bookApi.ListBook(cq, signal),
		placeholderData: keepPreviousData,
	});

	useValidateCqOrReroute(cq, data?.meta.filtered_count);

	// prefetch previous and next page
	const queryClient = useQueryClient();
	if (hasPreviousPage(cq)) {
		const prevCq = getPreviousPage(cq);
		queryClient.prefetchQuery({
			queryKey: [BookRoutes.BASE, prevCq],
			queryFn: ({ signal }) => bookApi.ListBook(prevCq, signal),
		});
	}
	if (hasNextPage(cq)) {
		const nextCq = getNextPage(cq);
		queryClient.prefetchQuery({
			queryKey: [BookRoutes.BASE, nextCq],
			queryFn: ({ signal }) => bookApi.ListBook(nextCq, signal),
		});
	}

	if (status === "pending" || !data) return <LoaderPage />;

	const bookTitle = translate.Books();
	const books = data.data;

	return (
		<ScrollArea className="lg:h-[100vh] space-y-1 lg:space-y-4 lg:py-4">
			<div className="grid grid-cols-1 gap-3 px-3">
				<h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
					{bookTitle}
				</h2>

				<div className="flex gap-3">
					<SearchBar cq={cq} />
				</div>

				<div className="flex gap-3">
					<OrderBtn cq={cq} />
					<SortSelect cq={cq} opt={BOOK_SORT_OPTIONS} />
				</div>

				{books.map((b) => (
					<BookCard key={b.id} book={b} badges={bookToBadgeProps(b)}>
						<BookNavBtn book={b} />
						<BookmarkBtn book={b} />
					</BookCard>
				))}

				<PaginationBar cq={cq} total={data.meta.filtered_count} />
			</div>
			<ScrollBar />
		</ScrollArea>
	);
};

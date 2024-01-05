import React from "react";
import {
	keepPreviousData,
	useQuery,
	useQueryClient,
} from "@tanstack/react-query";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { useTranslations } from "@/components/language-provider";
import { useCollectionQuery, useValidateCqOrReroute } from "@/hooks";
import {
	FilterSelect,
	LoadingPage,
	OrderBtn,
	PaginationBar,
	SearchBar,
	SortSelect,
} from "@/modules";
import {
	getNextPage,
	getPreviousPage,
	hasNextPage,
	hasPreviousPage,
} from "@/util";
import { RES_FILTER_OPTIONS, RES_SORT_OPTIONS } from "@/constants";
import { ResRoutes, reservationApi } from "@/api";
import { BookCard } from "@/modules/book";
import {
	ResCancelBtn,
	ResCheckoutBtn,
	ResCreateDialog,
	resToBadgeProps,
} from "..";

export const ManageResPage: React.FC = () => {
	const translate = useTranslations();
	const cq = useCollectionQuery();
	if (!cq.filters.status) cq.filters.status = "pending";

	const { status, data } = useQuery({
		queryKey: [ResRoutes.BASE, cq],
		queryFn: ({ signal }) => reservationApi.ListRes(cq, signal),
		placeholderData: keepPreviousData,
	});

	useValidateCqOrReroute(cq, data?.meta.filtered_count);

	// prefetch previous and next page
	const queryClient = useQueryClient();
	if (hasPreviousPage(cq)) {
		const prevCq = getPreviousPage(cq);
		queryClient.prefetchQuery({
			queryKey: [ResRoutes.BASE, prevCq],
			queryFn: ({ signal }) => reservationApi.ListRes(prevCq, signal),
		});
	}
	if (hasNextPage(cq)) {
		const nextCq = getNextPage(cq);
		queryClient.prefetchQuery({
			queryKey: [ResRoutes.BASE, nextCq],
			queryFn: ({ signal }) => reservationApi.ListRes(nextCq, signal),
		});
	}

	const resTitle = translate.manageReservations();

	return (
		<ScrollArea className="lg:h-[100vh] space-y-1 lg:space-y-4 lg:py-4">
			<div className="w-full grid grid-cols-1 gap-3 px-3">
				<h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
					{resTitle}
				</h2>

				{(status === "pending" || !data) && <LoadingPage />}

				{!(status === "pending" || !data) && (
					<>
						<div className="flex items-center gap-3">
							<ResCreateDialog />
							<SearchBar cq={cq} />
						</div>
						<div className="flex gap-3">
							<OrderBtn cq={cq} />
							<SortSelect cq={cq} opt={RES_SORT_OPTIONS} />
							<FilterSelect cq={cq} opt={RES_FILTER_OPTIONS} />
						</div>

						{data.data.map((r) => (
							<BookCard key={r.id} book={r.book} badges={resToBadgeProps(r)}>
								{r.status === "pending" && <ResCheckoutBtn res={r} />}
								{r.status === "pending" && <ResCancelBtn res={r} />}
							</BookCard>
						))}

						<PaginationBar cq={cq} total={data.meta.filtered_count} />
					</>
				)}
			</div>
			<ScrollBar />
		</ScrollArea>
	);
};

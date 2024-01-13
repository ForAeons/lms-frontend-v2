import React from "react";
import { toast } from "sonner";
import {
	keepPreviousData,
	useMutation,
	useQuery,
	useQueryClient,
} from "@tanstack/react-query";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { useTranslations } from "@/components/language-provider";
import { useCollectionQuery, useValidateCqOrReroute } from "@/hooks";
import {
	DeleteBtn,
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
import { CheckPermission, useAppSelector } from "@/store";
import {
	FINE_SORT_OPTIONS,
	FINE_FILTER_OPTIONS,
	MANAGE_BOOK_RECORDS,
} from "@/constants";
import { FineRoutes, fineApi } from "@/api";
import { BookCard } from "@/modules/book";
import { FineSettleBtn, fineToBadgeProps } from "..";

export const ManageFinePage: React.FC = () => {
	const cq = useCollectionQuery();
	if (!cq.filters.status) cq.filters.status = "outstanding";

	const { status, data } = useQuery({
		queryKey: [FineRoutes.BASE, cq],
		queryFn: ({ signal }) => fineApi.ListFine(cq, signal),
		placeholderData: keepPreviousData,
	});

	useValidateCqOrReroute(cq, data?.meta.filtered_count);

	// prefetch previous and next page
	const queryClient = useQueryClient();
	if (hasPreviousPage(cq)) {
		const prevCq = getPreviousPage(cq);
		queryClient.prefetchQuery({
			queryKey: [FineRoutes.BASE, prevCq],
			queryFn: ({ signal }) => fineApi.ListFine(prevCq, signal),
		});
	}
	if (hasNextPage(cq)) {
		const nextCq = getNextPage(cq);
		queryClient.prefetchQuery({
			queryKey: [FineRoutes.BASE, nextCq],
			queryFn: ({ signal }) => fineApi.ListFine(nextCq, signal),
		});
	}

	const translate = useTranslations();
	const deleteFineMutation = useMutation({
		mutationFn: fineApi.DeleteFine,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: [FineRoutes.BASE] });
			toast.success(translate.Success(), {
				description: translate.settleFineSuccessDesc(),
			});
		},
	});

	const canDeleteFine = useAppSelector((s) =>
		CheckPermission(s, MANAGE_BOOK_RECORDS),
	);

	const fineTitle = translate.manageFines();
	const fineText = translate.fine();

	return (
		<ScrollArea className="lg:h-[100vh] space-y-1 lg:space-y-4 lg:py-4">
			<div className="w-full grid grid-cols-1 gap-3 px-3">
				<h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
					{fineTitle}
				</h2>

				{(status === "pending" || !data) && <LoadingPage />}

				{!(status === "pending" || !data) && (
					<>
						<div className="flex gap-3">
							<SearchBar cq={cq} />
						</div>
						<div className="flex gap-3">
							<OrderBtn cq={cq} />
							<SortSelect cq={cq} opt={FINE_SORT_OPTIONS} />
							<FilterSelect cq={cq} opt={FINE_FILTER_OPTIONS} />
						</div>

						{data.data.map((f) => (
							<BookCard
								key={f.id}
								book={f.book}
								badges={fineToBadgeProps(f, translate)}
							>
								{canDeleteFine && (
									<DeleteBtn
										handler={() => deleteFineMutation.mutate(f.id)}
										subject={fineText}
									/>
								)}
								{f.status === "outstanding" && <FineSettleBtn fine={f} />}
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

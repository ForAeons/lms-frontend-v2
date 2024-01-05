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
import { LOAN_FILTER_OPTIONS, LOAN_SORT_OPTIONS } from "@/constants";
import { LoanRoutes, loanApi } from "@/api";
import { BookCard } from "@/modules/book";
import {
	LoanCreateBtn,
	LoanRenewBtn,
	LoanReturnBtn,
	loanToBadgeProps,
} from "..";

export const ManageLoanPage: React.FC = () => {
	const translate = useTranslations();
	const cq = useCollectionQuery();
	if (!cq.filters.status) cq.filters.status = "borrowed";

	const { status, data } = useQuery({
		queryKey: [LoanRoutes.BASE, cq],
		queryFn: ({ signal }) => loanApi.ListLoan(cq, signal),
		placeholderData: keepPreviousData,
	});

	useValidateCqOrReroute(cq, data?.meta.filtered_count);

	// prefetch previous and next page
	const queryClient = useQueryClient();
	if (hasPreviousPage(cq)) {
		const prevCq = getPreviousPage(cq);
		queryClient.prefetchQuery({
			queryKey: [LoanRoutes.BASE, prevCq],
			queryFn: ({ signal }) => loanApi.ListLoan(prevCq, signal),
		});
	}
	if (hasNextPage(cq)) {
		const nextCq = getNextPage(cq);
		queryClient.prefetchQuery({
			queryKey: [LoanRoutes.BASE, nextCq],
			queryFn: ({ signal }) => loanApi.ListLoan(nextCq, signal),
		});
	}

	const loanTitle = translate.manageLoans();

	return (
		<ScrollArea className="lg:h-[100vh] space-y-1 lg:space-y-4 lg:py-4">
			<div className="w-full grid grid-cols-1 gap-3 px-3">
				<h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
					{loanTitle}
				</h2>

				{(status === "pending" || !data) && <LoadingPage />}

				{!(status === "pending" || !data) && (
					<>
						<div className="flex items-center gap-3">
							<LoanCreateBtn />
							<SearchBar cq={cq} />
						</div>
						<div className="flex gap-3">
							<OrderBtn cq={cq} />
							<SortSelect cq={cq} opt={LOAN_SORT_OPTIONS} />
							<FilterSelect cq={cq} opt={LOAN_FILTER_OPTIONS} />
						</div>

						{data.data.map((l) => (
							<BookCard key={l.id} book={l.book} badges={loanToBadgeProps(l)}>
								{l.status === "borrowed" && <LoanReturnBtn loan={l} />}
								{l.status === "borrowed" && <LoanRenewBtn loan={l} />}
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

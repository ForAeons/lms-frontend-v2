import React from "react";
import { useNavigate } from "react-router-dom";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { useTranslations } from "@/components/language-provider";
import { useQueryParams } from "@/hooks";
import {
	FilterSelect,
	LoaderPage,
	OrderBtn,
	PaginationBar,
	SearchBar,
	SortSelect,
} from "@/modules";
import { cqToUrl, getCollectionQuery, isValidCq } from "@/util";
import { listLoanThunk, useAppDispatch, useAppSelector } from "@/store";
import { LOAN_FILTER_OPTIONS, LOAN_SORT_OPTIONS } from "@/constants";
import { BookCard } from "@/modules/book";
import {
	LoanCreateBtn,
	LoanRenewBtn,
	LoanReturnBtn,
	loanToBadgeProps,
} from "..";

export const ManageLoanPage: React.FC = () => {
	const translate = useTranslations();
	const dispatch = useAppDispatch();
	const loanState = useAppSelector((s) => s.loan);
	const navigate = useNavigate();
	const queryParams = useQueryParams();
	const cq = getCollectionQuery(queryParams);

	if (!cq.filters.status) cq.filters.status = "borrowed";

	React.useEffect(() => {
		const c = new AbortController();
		dispatch(listLoanThunk({ q: cq, signal: c.signal }));
		return () => c.abort();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [dispatch, window.location.search]);

	React.useEffect(() => {
		const isValid = isValidCq(cq, loanState.meta.filtered_count);
		if (!isValid) navigate(`?${cqToUrl(cq)}`);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [navigate, window.location.search]);

	if (loanState.isFetching) return <LoaderPage />;

	const loanTitle = translate.manageLoans();

	return (
		<ScrollArea className="lg:h-[100vh] space-y-1 lg:space-y-4 lg:py-4">
			<div className="w-full grid grid-cols-1 gap-3 px-3">
				<h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
					{loanTitle}
				</h2>

				<div className="flex items-center gap-3">
					<LoanCreateBtn />
					<SearchBar cq={cq} />
				</div>
				<div className="flex gap-3">
					<OrderBtn cq={cq} />
					<SortSelect cq={cq} opt={LOAN_SORT_OPTIONS} />
					<FilterSelect cq={cq} opt={LOAN_FILTER_OPTIONS} />
				</div>

				{loanState.loans.map((l) => (
					<BookCard key={l.id} book={l.book} badges={loanToBadgeProps(l)}>
						{l.status === "borrowed" && <LoanReturnBtn loan={l} />}
						{l.status === "borrowed" && <LoanRenewBtn loan={l} />}
					</BookCard>
				))}

				<PaginationBar cq={cq} total={loanState.meta.filtered_count} />
			</div>
			<ScrollBar />
		</ScrollArea>
	);
};

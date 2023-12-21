import React from "react";
import { useNavigate } from "react-router-dom";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { useQueryParams } from "@/hooks";
import {
	LoaderPage,
	OrderBtn,
	PaginationBar,
	SearchBar,
	SortSelect,
} from "@/modules";
import { cqToUrl, getCollectionQuery, isValidCq } from "@/util";
import { listLoanThunk, useAppDispatch, useAppSelector } from "@/store";
import { LOAN_SORT_OPTIONS } from "@/constants";
import { LoanBookCard, LoanCreateDialog, LoanFilterSelect } from "..";

export const ManageLoanPage: React.FC = () => {
	const dispatch = useAppDispatch();
	const loanState = useAppSelector((s) => s.loan);
	const navigate = useNavigate();
	const queryParams = useQueryParams();
	const cq = getCollectionQuery(queryParams);

	if (!cq.filters.status) cq.filters.status = "borrowed";

	React.useEffect(() => {
		dispatch(listLoanThunk({ q: cq }));
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [dispatch, window.location.search]);

	React.useEffect(() => {
		const isValid = isValidCq(cq, loanState.meta.filtered_count);
		if (!isValid) navigate(`?${cqToUrl(cq)}`);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [navigate, window.location.search]);

	if (loanState.isFetching) return <LoaderPage />;

	return (
		<ScrollArea className="h-[100vh] space-y-1 lg:space-y-4 py-4">
			<div className="w-full grid grid-cols-1 gap-3 px-3">
				<div className="flex gap-3">
					<LoanCreateDialog />
					<OrderBtn cq={cq} />
					<SearchBar cq={cq} />
				</div>
				<div className="flex gap-3">
					<LoanFilterSelect cq={cq} />
					<SortSelect cq={cq} opt={LOAN_SORT_OPTIONS} />
				</div>

				{loanState.loans.map((l) => (
					<LoanBookCard key={l.id} loan={l} editable />
				))}

				<PaginationBar cq={cq} total={loanState.meta.filtered_count} />
			</div>
			<ScrollBar />
		</ScrollArea>
	);
};

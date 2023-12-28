import React from "react";
import { useNavigate } from "react-router-dom";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { LoaderPage, PaginationBar } from "@/modules";
import { useQueryParams } from "@/hooks";
import { listLoanThunk, useAppDispatch, useAppSelector } from "@/store";
import { cqToUrl, getCollectionQuery, isValidCq } from "@/util";
import { BookCard } from "@/modules/book";
import { LoanRenewBtn, LoanReturnBtn, loanToBadgeProps } from "..";

export const LoanPage: React.FC = () => {
	const dispatch = useAppDispatch();
	const loanState = useAppSelector((state) => state.loan);
	const userID = useAppSelector((s) => s.app.user?.id);
	const navigate = useNavigate();
	const queryParams = useQueryParams();
	const cq = getCollectionQuery(queryParams);

	// This page, user can only see their own loans
	React.useEffect(() => {
		if (!userID) return;
		cq.filters = {
			user_id: userID,
			status: "borrowed",
		};
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

	return (
		<ScrollArea className="lg:h-[100vh] space-y-1 lg:space-y-4 lg:py-4">
			<div className="w-full grid grid-cols-1 gap-3 px-3">
				<h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
					My Loans
				</h2>

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

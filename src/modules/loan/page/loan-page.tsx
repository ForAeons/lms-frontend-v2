import React from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { listBookLoanThunk, useAppDispatch, useAppSelector } from "@/store";
import { LoaderPage } from "@/modules";
import { newCollectionQuery } from "@/util";
import { LoanBookCard } from "..";

export const LoanPage: React.FC = () => {
	const dispatch = useAppDispatch();
	const loanState = useAppSelector((state) => state.loan);
	const userID = useAppSelector((s) => s.app.user?.id);

	React.useEffect(() => {
		if (!userID) return;

		dispatch(
			listBookLoanThunk(
				newCollectionQuery({
					orderBy: "desc",
					filters: {
						["loans.user_id"]: userID,
						["loans.status"]: "borrowed",
					},
				}),
			),
		);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	if (loanState.isFetching) return <LoaderPage />;

	return (
		<ScrollArea className="h-[100vh] space-y-1 lg:space-y-4 py-4">
			<div className="w-full grid grid-cols-1 gap-3 px-3">
				<h2 className="col-span-full scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
					My Loans
				</h2>

				{loanState.books.map((b) => (
					<LoanBookCard key={b.id} book={b} />
				))}
			</div>
		</ScrollArea>
	);
};

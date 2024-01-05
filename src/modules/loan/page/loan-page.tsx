import React from "react";
import { useQuery } from "@tanstack/react-query";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { useTranslations } from "@/components/language-provider";
import { useAppSelector } from "@/store";
import { newUserCollectionQuery } from "@/util";
import { LoanRoutes, loanApi } from "@/api";
import { LoadingPage } from "@/modules";
import { BookCard } from "@/modules/book";
import { LoanRenewBtn, LoanReturnBtn, loanToBadgeProps } from "..";

export const LoanPage: React.FC = () => {
	const user = useAppSelector((state) => state.app.user);
	const cq = newUserCollectionQuery(user?.id, "borrowed");

	const { status, data } = useQuery({
		enabled: !!user?.id,
		queryKey: [LoanRoutes.BASE, cq],
		queryFn: ({ signal }) => loanApi.ListLoan(cq, signal),
	});

	const translate = useTranslations();
	const myLoans = translate.myLoans();

	return (
		<ScrollArea className="lg:h-[100vh] space-y-1 lg:space-y-4 lg:py-4">
			<div className="w-full grid grid-cols-1 gap-3 px-3">
				<h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
					{myLoans}
				</h2>

				{(status === "pending" || !data) && <LoadingPage />}

				{!(status === "pending" || !data) &&
					data.data.map((l) => (
						<BookCard
							key={l.id}
							book={l.book}
							badges={loanToBadgeProps({ ...l, user: user! })}
						>
							{l.status === "borrowed" && <LoanReturnBtn loan={l} />}
							{l.status === "borrowed" && <LoanRenewBtn loan={l} />}
						</BookCard>
					))}
			</div>
			<ScrollBar />
		</ScrollArea>
	);
};

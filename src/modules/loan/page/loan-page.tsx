import React from "react";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { useAppSelector } from "@/store";
import { BookCard } from "@/modules/book";
import { useTranslations } from "@/hooks";
import { LoanRenewBtn, LoanReturnBtn, loanToBadgeProps } from "..";

export const LoanPage: React.FC = () => {
	const translate = useTranslations();
	const myLoans = translate["myLoans"]();

	const loans = useAppSelector((state) => state.app.loans);
	const user = useAppSelector((state) => state.app.user);

	return (
		<ScrollArea className="lg:h-[100vh] space-y-1 lg:space-y-4 lg:py-4">
			<div className="w-full grid grid-cols-1 gap-3 px-3">
				<h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
					{myLoans}
				</h2>

				{loans.map((l) => (
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

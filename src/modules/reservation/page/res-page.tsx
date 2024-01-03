import React from "react";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { BookCard } from "@/modules/book";
import { useAppSelector } from "@/store";
import { useTranslations } from "@/components/language-provider";
import { ResCancelBtn, ResCheckoutBtn, resToBadgeProps } from "..";

export const ResPage: React.FC = () => {
	const translate = useTranslations();
	const myReservations = translate.myReservations();

	const res = useAppSelector((state) => state.app.reservations);
	const user = useAppSelector((state) => state.app.user);

	return (
		<ScrollArea className="lg:h-[100vh] space-y-1 lg:space-y-4 lg:py-4">
			<div className="w-full grid grid-cols-1 gap-3 px-3">
				<h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
					{myReservations}
				</h2>

				{res.map((r) => (
					<BookCard
						key={r.id}
						book={r.book}
						badges={resToBadgeProps({ ...r, user: user! })}
					>
						{r.status === "pending" && <ResCheckoutBtn res={r} />}
						{r.status === "pending" && <ResCancelBtn res={r} />}
					</BookCard>
				))}
			</div>
			<ScrollBar />
		</ScrollArea>
	);
};

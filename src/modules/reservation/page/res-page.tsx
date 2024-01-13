import React from "react";
import { useQuery } from "@tanstack/react-query";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { useTranslations } from "@/components/language-provider";
import { useAppSelector } from "@/store";
import { ResRoutes, reservationApi } from "@/api";
import { newUserCollectionQuery } from "@/util";
import { LoadingPage } from "@/modules";
import { BookCard, BookLoanBtn } from "@/modules/book";
import { ResCancelBtn, resToBadgeProps } from "..";

export const ResPage: React.FC = () => {
	const user = useAppSelector((state) => state.app.user);
	const cq = newUserCollectionQuery(user?.id, "pending");

	const { status, data } = useQuery({
		enabled: !!user?.id,
		queryKey: [ResRoutes.BASE, cq],
		queryFn: ({ signal }) => reservationApi.ListRes(cq, signal),
	});

	const translate = useTranslations();

	const myReservations = translate.myReservations();
	const nothingHere = translate.nothingHereYet();

	return (
		<ScrollArea className="lg:h-[100vh] space-y-1 lg:space-y-4 lg:py-4">
			<div className="w-full grid grid-cols-1 gap-3 px-3">
				<h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
					{myReservations}
				</h2>

				{(status === "pending" || !data) && <LoadingPage />}

				{!(status === "pending" || !data) && data.data.length === 0 && (
					<p className="text-sm text-muted-foreground">{nothingHere}</p>
				)}

				{!(status === "pending" || !data) &&
					data.data.map((r) => (
						<BookCard
							key={r.id}
							book={r.book}
							badges={resToBadgeProps({ ...r, user: user! }, translate)}
						>
							<BookLoanBtn book={r.book} copyID={r.book_copy_id} />
							{r.status === "pending" && <ResCancelBtn res={r} />}
						</BookCard>
					))}
			</div>
			<ScrollBar />
		</ScrollArea>
	);
};

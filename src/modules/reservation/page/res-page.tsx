import React from "react";
import { useQuery } from "@tanstack/react-query";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { useTranslations } from "@/components/language-provider";
import { useAppSelector } from "@/store";
import { ResRoutes, reservationApi } from "@/api";
import { newUserCollectionQuery } from "@/util";
import { LoadingPage } from "@/modules";
import { BookCard } from "@/modules/book";
import { ResCancelBtn, ResCheckoutBtn, resToBadgeProps } from "..";

export const ResPage: React.FC = () => {
	const isLoggedIn = useAppSelector((s) => s.app.isLoggedIn);
	const user = useAppSelector((state) => state.app.user);
	const cq = newUserCollectionQuery(user?.id, "pending");

	const { status, data } = useQuery({
		enabled: isLoggedIn && !!user?.id,
		queryKey: [ResRoutes.BASE, cq],
		queryFn: ({ signal }) => reservationApi.ListRes(cq, signal),
	});

	const translate = useTranslations();
	if (status === "pending" || !data) return <LoadingPage />;

	const res = data.data;
	const myReservations = translate.myReservations();

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

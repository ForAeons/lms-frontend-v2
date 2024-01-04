import React from "react";
import { useQuery } from "@tanstack/react-query";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { useTranslations } from "@/components/language-provider";
import { useAppSelector } from "@/store";
import { FineRoutes, fineApi } from "@/api";
import { newUserCollectionQuery } from "@/util";
import { LoaderPage } from "@/modules";
import { BookCard } from "@/modules/book";
import { FineSettleBtn, fineToBadgeProps } from "..";

export const FinePage: React.FC = () => {
	const translate = useTranslations();
	const user = useAppSelector((state) => state.app.user);
	const cq = newUserCollectionQuery(user?.id);

	const { status, data } = useQuery({
		enabled: !!user?.id,
		queryKey: [FineRoutes.BASE, cq],
		queryFn: ({ signal }) => fineApi.ListFine(cq, signal),
	});

	if (status === "pending" || !data) return <LoaderPage />;

	const fines = data.data;
	const myFines = translate.myFines();

	return (
		<ScrollArea className="lg:h-[100vh] space-y-1 lg:space-y-4 lg:py-4">
			<div className="w-full grid grid-cols-1 gap-3 px-3">
				<h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
					{myFines}
				</h2>

				{fines.map((f) => (
					<BookCard
						key={f.id}
						book={f.book}
						badges={fineToBadgeProps({ ...f, user: user! })}
					>
						{f.status === "outstanding" && <FineSettleBtn fine={f} />}
					</BookCard>
				))}
			</div>
			<ScrollBar />
		</ScrollArea>
	);
};

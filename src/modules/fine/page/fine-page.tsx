import React from "react";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { useAppSelector } from "@/store";
import { BookCard } from "@/modules/book";
import { FineSettleBtn, fineToBadgeProps } from "..";
import { useTranslations } from "@/hooks";

export const FinePage: React.FC = () => {
	const translate = useTranslations();
	const myFines = translate["myFines"]();

	const fines = useAppSelector((state) => state.app.fines);
	const user = useAppSelector((state) => state.app.user);

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

import React from "react";
import { BookTable } from "..";
import { ScrollArea } from "@/components/ui/scroll-area";

export const BookPage: React.FC = () => {
	return (
		<ScrollArea className="h-[calc(100vh-104px)]">
			<div className="w-full relative flex flex-col gap-3 px-3">
				<BookTable />
			</div>
		</ScrollArea>
	);
};

import React from "react";
import { useNavigate } from "react-router-dom";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { changeSort } from "@/util";
import { BOOK_SORTERS } from "@/constants";

export const BookSortBtn: React.FC<{ cq: CollectionQuery }> = ({ cq }) => {
	const navigate = useNavigate();

	return (
		<div className="flex items-center space-x-2">
			<span className="text-sm text-muted-foreground whitespace-nowrap">
				Sort by
			</span>
			<Select
				value={String(cq.sortBy)}
				onValueChange={(v) => changeSort(navigate, cq, v)}
			>
				<SelectTrigger className="h-8 w-[100px]">
					<SelectValue placeholder={cq.sortBy} />
				</SelectTrigger>
				<SelectContent>
					{BOOK_SORTERS.map((s) => (
						<SelectItem key={s.label} value={s.value}>
							{s.label}
						</SelectItem>
					))}
				</SelectContent>
			</Select>
		</div>
	);
};

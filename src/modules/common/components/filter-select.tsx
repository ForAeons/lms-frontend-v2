import React from "react";
import { useNavigate } from "react-router-dom";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { changeFilter } from "@/util";

export const FilterSelect: React.FC<{
	cq: CollectionQuery;
	opt: FilterOption[];
}> = ({ cq, opt }) => {
	const navigate = useNavigate();

	return (
		<div className="flex items-center space-x-2">
			<span className="text-sm text-muted-foreground whitespace-nowrap">
				Filter by
			</span>
			<Select
				value={cq.filters.status as string}
				onValueChange={(v) => changeFilter(navigate, cq, { status: v })}
			>
				<SelectTrigger className="h-8 w-fit">
					<SelectValue placeholder={cq.sortBy} />
				</SelectTrigger>
				<SelectContent>
					{opt.map((f) => (
						<SelectItem key={f.label} value={f.value}>
							{f.label}
						</SelectItem>
					))}
				</SelectContent>
			</Select>
		</div>
	);
};
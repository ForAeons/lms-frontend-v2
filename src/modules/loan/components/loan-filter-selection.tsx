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
import { LOAN_FILTER_OPTIONS } from "@/constants";

export const LoanFilterSelect: React.FC<{ cq: CollectionQuery }> = ({ cq }) => {
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
					{LOAN_FILTER_OPTIONS.map((s) => (
						<SelectItem key={s.label} value={s.value}>
							{s.label}
						</SelectItem>
					))}
				</SelectContent>
			</Select>
		</div>
	);
};

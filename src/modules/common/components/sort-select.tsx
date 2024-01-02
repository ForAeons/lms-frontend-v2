import React from "react";
import { FormattedMessage, useIntl } from "react-intl";
import { useNavigate } from "react-router-dom";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { changeSort } from "@/util";

export const SortSelect: React.FC<{
	cq: CollectionQuery;
	opt: SortOption[];
}> = ({ cq, opt }) => {
	const intl = useIntl();
	const sortBy = intl.formatMessage({
		id: "hDI+JM",
		defaultMessage: "Sort by",
	});

	const navigate = useNavigate();
	return (
		<div className="flex items-center space-x-2">
			<span className="text-sm text-muted-foreground whitespace-nowrap">
				{sortBy}
			</span>
			<Select
				value={String(cq.sortBy)}
				onValueChange={(v) => changeSort(navigate, cq, v)}
			>
				<SelectTrigger className="h-8 w-fit">
					<SelectValue placeholder={cq.sortBy} />
				</SelectTrigger>
				<SelectContent>
					{opt.map((s) => (
						<SelectItem key={s.id} value={s.value}>
							<FormattedMessage id={s.id} defaultMessage={s.label} />
						</SelectItem>
					))}
				</SelectContent>
			</Select>
		</div>
	);
};

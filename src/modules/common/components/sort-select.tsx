import React from "react";
import { FormattedMessage } from "react-intl";
import { useNavigate } from "react-router-dom";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { changeSort } from "@/util";
import { useTranslations } from "@/hooks";

export const SortSelect: React.FC<{
	cq: CollectionQuery;
	opt: SortOption[];
}> = ({ cq, opt }) => {
	const navigate = useNavigate();
	const translate = useTranslations();
	const sortBy = translate["hDI+JM"]();
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

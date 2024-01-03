import React from "react";
import { useNavigate } from "react-router-dom";
import {
	ChevronLeftIcon,
	ChevronRightIcon,
	ChevronsLeftIcon,
	ChevronsRightIcon,
} from "lucide-react";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import {
	changeLimit,
	firstPage,
	lastPage,
	nextPage,
	previousPage,
} from "@/util";
import { MD_ICON_SIZE, CQ_LIMITS } from "@/constants";
import { useTranslations } from "@/components/language-provider";

export const PaginationBar: React.FC<{
	cq: CollectionQuery;
	total: number;
}> = ({ cq, total }) => {
	const navigate = useNavigate();

	let totalPages = Math.ceil(total / cq.limit);
	let currentPage = Math.ceil(cq.offset / cq.limit) + 1;
	if (isNaN(currentPage)) currentPage = 1;
	if (isNaN(totalPages)) totalPages = 1;

	const translate = useTranslations();
	const itemsPerPage = translate.itemsPerPage();
	const pageOf = translate.pageXofY({ currentPage, totalPages });

	return (
		<div className="col-span-full flex flex-wrap justify-around items-center py-3 gap-3">
			<div className="flex items-center space-x-2">
				<span className="text-sm text-muted-foreground">{itemsPerPage}</span>
				<Select
					value={String(cq.limit)}
					onValueChange={(v) => changeLimit(navigate, cq, Number(v))}
				>
					<SelectTrigger className="h-8 w-[70px]">
						<SelectValue placeholder={cq.limit} />
					</SelectTrigger>
					<SelectContent>
						{CQ_LIMITS.map((pageSize) => (
							<SelectItem key={pageSize} value={`${pageSize}`}>
								{pageSize}
							</SelectItem>
						))}
					</SelectContent>
				</Select>
			</div>

			<span className="text-sm text-muted-foreground text-center">
				{pageOf}
			</span>

			<div>
				<Button
					variant="ghost"
					disabled={currentPage === 1}
					onClick={() => firstPage(navigate, cq)}
				>
					<ChevronsLeftIcon size={MD_ICON_SIZE} />
				</Button>
				<Button
					variant="ghost"
					disabled={currentPage === 1}
					onClick={() => previousPage(navigate, cq)}
				>
					<ChevronLeftIcon size={MD_ICON_SIZE} />
				</Button>

				<Button
					variant="ghost"
					disabled={currentPage === totalPages}
					onClick={() => nextPage(navigate, cq)}
				>
					<ChevronRightIcon size={MD_ICON_SIZE} />
				</Button>
				<Button
					variant="ghost"
					disabled={currentPage === totalPages}
					onClick={() => lastPage(navigate, cq, total)}
				>
					<ChevronsRightIcon size={MD_ICON_SIZE} />
				</Button>
			</div>
		</div>
	);
};

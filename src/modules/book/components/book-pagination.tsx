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
	changeSort,
	firstPage,
	lastPage,
	nextPage,
	previousPage,
} from "@/util";
import { MD_ICON_SIZE, CQ_LIMITS, BOOK_SORTERS } from "@/constants";
import { useAppSelector } from "@/store";

export const BookPagination: React.FC<{ cq: CollectionQuery }> = ({ cq }) => {
	const bookState = useAppSelector((s) => s.book);
	const navigate = useNavigate();

	const totalPages = Math.ceil(bookState.meta.filtered_count / cq.limit);
	const currentPage = Math.ceil(cq.offset / cq.limit) + 1;

	return (
		<div className="flex justify-between items-center py-3 gap-3">
			<div className="flex flex-col gap-3 justify-start">
				<div className="flex items-center space-x-2">
					<span className="text-sm text-muted-foreground">Sort by</span>
					<Select
						value={String(cq.sortBy)}
						onValueChange={(v) => changeSort(navigate, cq, v)}
					>
						<SelectTrigger className="h-8 w-[160px]">
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

				<div className="flex items-center space-x-2">
					<span className="text-sm text-muted-foreground">Items per page</span>
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
			</div>

			<div className="flex flex-col gap-3 justify-end">
				<span className="text-sm text-muted-foreground text-center">{`Page ${currentPage} of ${totalPages}`}</span>
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
						onClick={() =>
							lastPage(navigate, cq, bookState.meta.filtered_count)
						}
					>
						<ChevronsRightIcon size={MD_ICON_SIZE} />
					</Button>
				</div>
			</div>
		</div>
	);
};

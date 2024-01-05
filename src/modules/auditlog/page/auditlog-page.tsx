import React from "react";
import {
	keepPreviousData,
	useQuery,
	useQueryClient,
} from "@tanstack/react-query";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { useTranslations } from "@/components/language-provider";
import {
	LoadingPage,
	OrderBtn,
	PaginationBar,
	SearchBar,
	SortSelect,
} from "@/modules";
import { CheckPermission, useAppSelector } from "@/store";
import { useCollectionQuery, useValidateCqOrReroute } from "@/hooks";
import { CREATE_AUDIT_LOG, LOG_SORT_OPTIONS } from "@/constants";
import { AuditLogRoutes, auditlogApi } from "@/api";
import {
	getNextPage,
	getPreviousPage,
	hasNextPage,
	hasPreviousPage,
} from "@/util";
import { DataTable, LogCreateBtn, getTranslatedColumns } from "..";

export const AuditLogPage: React.FC = () => {
	const translate = useTranslations();
	const cq = useCollectionQuery();

	const { status, data } = useQuery({
		queryKey: [AuditLogRoutes.BASE, cq],
		queryFn: ({ signal }) => auditlogApi.ListLog(cq, signal),
		placeholderData: keepPreviousData,
	});

	useValidateCqOrReroute(cq, data?.meta.filtered_count);

	// prefetch previous and next page
	const queryClient = useQueryClient();
	if (hasPreviousPage(cq)) {
		const prevCq = getPreviousPage(cq);
		queryClient.prefetchQuery({
			queryKey: [AuditLogRoutes.BASE, prevCq],
			queryFn: ({ signal }) => auditlogApi.ListLog(prevCq, signal),
		});
	}
	if (hasNextPage(cq)) {
		const nextCq = getNextPage(cq);
		queryClient.prefetchQuery({
			queryKey: [AuditLogRoutes.BASE, nextCq],
			queryFn: ({ signal }) => auditlogApi.ListLog(nextCq, signal),
		});
	}

	const canCreateAuditLog = useAppSelector((s) =>
		CheckPermission(s, CREATE_AUDIT_LOG),
	);

	const auditLogsText = translate.AuditLogs();

	return (
		<ScrollArea className="lg:h-[100vh] space-y-1 lg:space-y-4 lg:py-4">
			<div className="w-full grid grid-cols-1 gap-3 px-3">
				<h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
					{auditLogsText}
				</h2>

				{(status === "pending" || !data) && <LoadingPage />}

				{!(status === "pending" || !data) && (
					<>
						<div className="flex gap-3 items-center">
							{canCreateAuditLog && <LogCreateBtn />}
							<SearchBar cq={cq} />
						</div>

						<div className="flex gap-3">
							<OrderBtn cq={cq} />
							<SortSelect cq={cq} opt={LOG_SORT_OPTIONS} />
						</div>

						<div className="px-3">
							<DataTable columns={getTranslatedColumns()} data={data.data} />
						</div>

						<PaginationBar cq={cq} total={data.meta.filtered_count} />
					</>
				)}
			</div>
			<ScrollBar />
		</ScrollArea>
	);
};

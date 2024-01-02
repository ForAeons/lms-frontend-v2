import React from "react";
import { useIntl } from "react-intl";
import { useNavigate } from "react-router-dom";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import {
	LoaderPage,
	OrderBtn,
	PaginationBar,
	SearchBar,
	SortSelect,
} from "@/modules";
import {
	CheckPermission,
	listLogThunk,
	useAppDispatch,
	useAppSelector,
} from "@/store";
import { useQueryParams } from "@/hooks";
import { cqToUrl, getCollectionQuery, isValidCq } from "@/util";
import { CREATE_AUDIT_LOG, LOG_SORT_OPTIONS } from "@/constants";
import { DataTable, LogCreateBtn, getAuditLogColumns } from "..";

export const AuditLogPage: React.FC = () => {
	const intl = useIntl();
	const dispatch = useAppDispatch();
	const auditlogState = useAppSelector((s) => s.log);
	const canCreateAuditLog = useAppSelector((s) =>
		CheckPermission(s, CREATE_AUDIT_LOG),
	);
	const navigate = useNavigate();
	const queryParams = useQueryParams();
	const cq = getCollectionQuery(queryParams);

	React.useEffect(() => {
		const c = new AbortController();
		dispatch(listLogThunk({ q: cq, signal: c.signal }));
		return () => c.abort();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [dispatch, window.location.search]);

	React.useEffect(() => {
		const isValid = isValidCq(cq, auditlogState.meta.filtered_count);
		if (!isValid) navigate(`/book?${cqToUrl(cq)}`);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [navigate, window.location.search]);

	if (auditlogState.isFetching) return <LoaderPage />;

	const auditLogs = intl.formatMessage({
		id: "t/TuwD",
		defaultMessage: "Audit Logs",
	});

	return (
		<ScrollArea className="lg:h-[100vh] space-y-1 lg:space-y-4 lg:py-4">
			<div className="w-full grid grid-cols-1 gap-3 px-3">
				<h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
					{auditLogs}
				</h2>

				<div className="flex gap-3 items-center">
					{canCreateAuditLog && <LogCreateBtn />}
					<SearchBar cq={cq} />
				</div>

				<div className="flex gap-3">
					<OrderBtn cq={cq} />
					<SortSelect cq={cq} opt={LOG_SORT_OPTIONS} />
				</div>

				<div className="px-3">
					<DataTable
						columns={getAuditLogColumns(intl)}
						data={auditlogState.logs}
					/>
				</div>

				<PaginationBar cq={cq} total={auditlogState.meta.filtered_count} />
			</div>
			<ScrollBar />
		</ScrollArea>
	);
};

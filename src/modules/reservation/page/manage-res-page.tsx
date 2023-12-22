import React from "react";
import { useNavigate } from "react-router-dom";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { useQueryParams } from "@/hooks";
import {
	LoaderPage,
	OrderBtn,
	PaginationBar,
	SearchBar,
	SortSelect,
} from "@/modules";
import { cqToUrl, getCollectionQuery, isValidCq } from "@/util";
import { listResThunk, useAppDispatch, useAppSelector } from "@/store";
import { RES_SORT_OPTIONS } from "@/constants";
import { ResBookCard, ResCreateDialog, ResFilterSelect } from "..";

export const ManageResPage: React.FC = () => {
	const dispatch = useAppDispatch();
	const resState = useAppSelector((s) => s.res);
	const navigate = useNavigate();
	const queryParams = useQueryParams();
	const cq = getCollectionQuery(queryParams);

	if (!cq.filters.status) cq.filters.status = "pending";

	React.useEffect(() => {
		const c = new AbortController();
		dispatch(listResThunk({ q: cq, signal: c.signal }));
		return () => c.abort();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [dispatch, window.location.search]);

	React.useEffect(() => {
		const isValid = isValidCq(cq, resState.meta.filtered_count);
		if (!isValid) navigate(`?${cqToUrl(cq)}`);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [navigate, window.location.search]);

	if (resState.isFetching) return <LoaderPage />;

	return (
		<ScrollArea className="lg:h-[100vh] space-y-1 lg:space-y-4 lg:py-4">
			<div className="w-full grid grid-cols-1 gap-3 px-3">
				<div className="flex gap-3">
					<ResCreateDialog />
					<OrderBtn cq={cq} />
					<SearchBar cq={cq} />
				</div>
				<div className="flex gap-3">
					<ResFilterSelect cq={cq} />
					<SortSelect cq={cq} opt={RES_SORT_OPTIONS} />
				</div>

				{resState.res.map((r) => (
					<ResBookCard key={r.id} res={r} editable />
				))}

				<PaginationBar cq={cq} total={resState.meta.filtered_count} />
			</div>
			<ScrollBar />
		</ScrollArea>
	);
};

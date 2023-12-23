import React from "react";
import { useNavigate } from "react-router-dom";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { useQueryParams } from "@/hooks";
import {
	FilterSelect,
	LoaderPage,
	OrderBtn,
	PaginationBar,
	SearchBar,
	SortSelect,
} from "@/modules";
import { cqToUrl, getCollectionQuery, isValidCq } from "@/util";
import { listFineThunk, useAppDispatch, useAppSelector } from "@/store";
import { FINE_SORT_OPTIONS, FINE_FILTER_OPTIONS } from "@/constants";
import { FineBookCard } from "..";

export const ManageFinePage: React.FC = () => {
	const dispatch = useAppDispatch();
	const fineState = useAppSelector((s) => s.fine);
	const navigate = useNavigate();
	const queryParams = useQueryParams();
	const cq = getCollectionQuery(queryParams);

	if (!cq.filters.status) cq.filters.status = "outstanding";

	React.useEffect(() => {
		const c = new AbortController();
		dispatch(listFineThunk({ q: cq, signal: c.signal }));
		return () => c.abort();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [dispatch, window.location.search]);

	React.useEffect(() => {
		const isValid = isValidCq(cq, fineState.meta.filtered_count);
		if (!isValid) navigate(`?${cqToUrl(cq)}`);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [navigate, window.location.search]);

	if (fineState.isFetching) return <LoaderPage />;

	return (
		<ScrollArea className="lg:h-[100vh] space-y-1 lg:space-y-4 lg:py-4">
			<div className="w-full grid grid-cols-1 gap-3 px-3">
				<div className="flex gap-3">
					<SearchBar cq={cq} />
				</div>
				<div className="flex gap-3">
					<OrderBtn cq={cq} />
					<SortSelect cq={cq} opt={FINE_SORT_OPTIONS} />
					<FilterSelect cq={cq} opt={FINE_FILTER_OPTIONS} />
				</div>

				{fineState.fines.map((f) => (
					<FineBookCard key={f.id} fine={f} editable />
				))}

				<PaginationBar cq={cq} total={fineState.meta.filtered_count} />
			</div>
			<ScrollBar />
		</ScrollArea>
	);
};
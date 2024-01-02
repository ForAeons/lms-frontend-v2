import React from "react";
import { useIntl } from "react-intl";
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
import { listResThunk, useAppDispatch, useAppSelector } from "@/store";
import { RES_FILTER_OPTIONS, RES_SORT_OPTIONS } from "@/constants";
import { BookCard } from "@/modules/book";
import {
	ResCancelBtn,
	ResCheckoutBtn,
	ResCreateDialog,
	resToBadgeProps,
} from "..";

export const ManageResPage: React.FC = () => {
	const intl = useIntl();
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

	const resTitle = intl.formatMessage({
		id: "eujWGK",
		defaultMessage: "Manage Reservations",
	});

	return (
		<ScrollArea className="lg:h-[100vh] space-y-1 lg:space-y-4 lg:py-4">
			<div className="w-full grid grid-cols-1 gap-3 px-3">
				<h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
					{resTitle}
				</h2>

				<div className="flex items-center gap-3">
					<ResCreateDialog />
					<SearchBar cq={cq} />
				</div>
				<div className="flex gap-3">
					<OrderBtn cq={cq} />
					<SortSelect cq={cq} opt={RES_SORT_OPTIONS} />
					<FilterSelect cq={cq} opt={RES_FILTER_OPTIONS} />
				</div>

				{resState.res.map((r) => (
					<BookCard key={r.id} book={r.book} badges={resToBadgeProps(r, intl)}>
						{r.status === "pending" && <ResCheckoutBtn res={r} />}
						{r.status === "pending" && <ResCancelBtn res={r} />}
					</BookCard>
				))}

				<PaginationBar cq={cq} total={resState.meta.filtered_count} />
			</div>
			<ScrollBar />
		</ScrollArea>
	);
};

export const LOAN_FILTER_OPTIONS: FilterOption[] = [
	{ label: "Borrowed", key: "status", value: "borrowed" },
	{ label: "Returned", key: "status", value: "returned" },
];

export const RES_FILTER_OPTIONS: FilterOption[] = [
	{ label: "Reserved", key: "status", value: "pending" },
	{ label: "fulfilled", key: "status", value: "fulfilled" },
];

export const FINE_FILTER_OPTIONS: FilterOption[] = [
	{ label: "Outstanding", key: "status", value: "outstanding" },
	{ label: "Paid", key: "status", value: "Paid" },
];

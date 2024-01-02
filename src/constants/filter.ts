import { createIntl } from "react-intl";
import { ENV } from ".";

// This dead code is used to generate the intl IDs for the roles when running npm run extract
if (ENV === "development") {
	const Intl = createIntl({ locale: "en", messages: {} });
	Intl.formatMessage({ id: "IFPQiA", defaultMessage: "Borrowed" });
	Intl.formatMessage({ id: "wm96Jx", defaultMessage: "Returned" });
	Intl.formatMessage({ id: "sI/NFi", defaultMessage: "Reserved" });
	Intl.formatMessage({ id: "jY+f2f", defaultMessage: "Fulfilled" });
	Intl.formatMessage({ id: "Q1xfqF", defaultMessage: "Outstanding" });
	Intl.formatMessage({ id: "u/vOPu", defaultMessage: "Paid" });
}

export const LOAN_FILTER_OPTIONS: FilterOption[] = [
	{ label: "Borrowed", key: "status", value: "borrowed", id: "IFPQiA" },
	{ label: "Returned", key: "status", value: "returned", id: "wm96Jx" },
];

export const RES_FILTER_OPTIONS: FilterOption[] = [
	{ label: "Reserved", key: "status", value: "pending", id: "sI/NFi" },
	{ label: "Fulfilled", key: "status", value: "fulfilled", id: "jY+f2f" },
];

export const FINE_FILTER_OPTIONS: FilterOption[] = [
	{ label: "Outstanding", key: "status", value: "outstanding", id: "Q1xfqF" },
	{ label: "Paid", key: "status", value: "Paid", id: "u/vOPu" },
];

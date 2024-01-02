import { createIntl } from "react-intl";
import { ENV } from ".";

// This dead code is used to generate the intl IDs for the roles when running npm run extract
if (ENV === "development") {
	const Intl = createIntl({ locale: "en", messages: {} });
	Intl.formatMessage({ id: "JCIgkj", defaultMessage: "Username" });
	Intl.formatMessage({ id: "yk4PT9", defaultMessage: "Full name" });
	Intl.formatMessage({ id: "bY5h3E", defaultMessage: "Preferred name" });
	Intl.formatMessage({ id: "KxPY7j", defaultMessage: "Date of creation" });
	Intl.formatMessage({ id: "9a9+ww", defaultMessage: "Title" });
	Intl.formatMessage({ id: "tWkQ2J", defaultMessage: "Author" });
	Intl.formatMessage({ id: "YXUQIi", defaultMessage: "ISBN" });
	Intl.formatMessage({ id: "Kdc67U", defaultMessage: "Publisher" });
	Intl.formatMessage({ id: "6ruzVm", defaultMessage: "Publication date" });
	Intl.formatMessage({ id: "nZi7wU", defaultMessage: "Borrow date" });
	Intl.formatMessage({ id: "l3AfOI", defaultMessage: "Due date" });
	Intl.formatMessage({ id: "n/Oz/R", defaultMessage: "Reservation date" });
	Intl.formatMessage({ id: "/0TOL5", defaultMessage: "Amount" });
	Intl.formatMessage({ id: "QlsDcr", defaultMessage: "Action" });
	Intl.formatMessage({ id: "P7PLVj", defaultMessage: "Date" });
}

export const USER_SORT_OPTIONS: SortOption[] = [
	{ value: "username", label: "Username", id: "JCIgkj" },
	{ value: "full_name", label: "Full name", id: "yk4PT9" },
	{ value: "preferred_name", label: "Preferred name", id: "bY5h3E" },
	{ value: "created_at", label: "Date of creation", id: "KxPY7j" },
];

export const BOOK_SORT_OPTIONS: SortOption[] = [
	{ value: "title", label: "Title", id: "9a9+ww" },
	{ value: "author", label: "Author", id: "tWkQ2J" },
	{ value: "isbn", label: "ISBN", id: "YXUQIi" },
	{ value: "publisher", label: "Publisher", id: "Kdc67U" },
	{ value: "publication_date", label: "Publication date", id: "6ruzVm" },
	{ value: "created_at", label: "Date of creation", id: "KxPY7j" },
];

export const LOAN_SORT_OPTIONS: SortOption[] = [
	{ value: "borrow_date", label: "Borrow date", id: "nZi7wU" },
	{ value: "due_date", label: "Due date", id: "l3AfOI" },
	{ value: "created_at", label: "Date of creation", id: "KxPY7j" },
];

export const RES_SORT_OPTIONS: SortOption[] = [
	{ value: "reservation_date", label: "Reservation date", id: "n/Oz/R" },
	{ value: "created_at", label: "Date of creation", id: "KxPY7j" },
];

export const FINE_SORT_OPTIONS: SortOption[] = [
	{ value: "amount", label: "Amount", id: "/0TOL5" },
	{ value: "created_at", label: "Date of creation", id: "KxPY7j" },
];

export const LOG_SORT_OPTIONS: SortOption[] = [
	{ value: "action", label: "Action", id: "QlsDcr" },
	{ value: "date", label: "Date", id: "P7PLVj" },
	{ value: "created_at", label: "Date of creation", id: "KxPY7j" },
];

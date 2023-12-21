export const BACKEND_STATUS_UNKNOWN = "unknown";
export const BACKEND_STATUS_UP = "up";
export const BACKEND_STATUS_DOWN = "down";

export const DEFAULT_COLLECTION_QUERY_OFFSET = 0;
export const DEFAULT_COLLECTION_QUERY_LIMIT = 25;

export const MINIMUM_PAGE_OFFSET = 0;
export const MINIMUM_PAGE_LIMIT = 10;
export const MAXIMUM_PAGE_LIMIT = 100;

export const MINIMUM_USERNAME_LENGTH = 5;
export const MAXIMUM_USERNAME_LENGTH = 30;
export const MINIMUM_PASSWORD_LENGTH = 8;
export const MAXIMUM_PASSWORD_LENGTH = 32;

export const CQ_LIMITS = [10, 25, 50, 100];

export const USER_SORT_OPTIONS: SortOption[] = [
	{ value: "username", label: "Username" },
	{ value: "email", label: "Email" },
	{ value: "full_name", label: "Full name" },
	{ value: "preferred_name", label: "Preferred name" },
	{ value: "created_at", label: "Date of creation" },
];

export const BOOK_SORT_OPTIONS: SortOption[] = [
	{ value: "title", label: "Title" },
	{ value: "author", label: "Author" },
	{ value: "isbn", label: "ISBN" },
	{ value: "publisher", label: "Publisher" },
	{ value: "publication_date", label: "Publication date" },
	{ value: "created_at", label: "Date of creation" },
];

export const LOAN_SORT_OPTIONS: SortOption[] = [
	{ value: "borrow_date", label: "Borrow date" },
	{ value: "due_date", label: "Due date" },
	{ value: "created_at", label: "Date of creation" },
];

export const LOAN_FILTER_OPTIONS: FilterOption[] = [
	{ label: "Borrowed", key: "status", value: "borrowed" },
	{ label: "Returned", key: "status", value: "returned" },
];

export const RES_SORT_OPTIONS: SortOption[] = [
	{ value: "reservation_date", label: "Reservation date" },
	{ value: "created_at", label: "Date of creation" },
];

export const RES_FILTER_OPTIONS: FilterOption[] = [
	{ label: "Reserved", key: "status", value: "pending" },
	{ label: "fulfilled", key: "status", value: "fulfilled" },
];

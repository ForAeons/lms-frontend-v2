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

export const RES_SORT_OPTIONS: SortOption[] = [
	{ value: "reservation_date", label: "Reservation date" },
	{ value: "created_at", label: "Date of creation" },
];

export const FINE_SORT_OPTIONS: SortOption[] = [
	{ value: "amount", label: "Amount" },
	{ value: "created_at", label: "Date of creation" },
];

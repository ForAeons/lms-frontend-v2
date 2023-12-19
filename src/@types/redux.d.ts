type backendStatus = "up" | "down" | "unknown";

interface AppState {
	backendStatus: backendStatus;
	isLoggedIn: boolean;
	user: UserPersonAbility | null;
}

interface ManageUserState {
	isFetching: boolean;
	users: UserPersonAbility[];
}

type bookStatus = "available" | "reserved" | "borrowed" | "unknown";

interface BookState {
	isFetching: boolean;
	books: Book[];
	book: BookDetailed | null;
	bookStatus: bookStatus;
	meta: Meta;
}

/**
 * Holds the state of books that are borrowed by the user.
 * Exact book should contain exactly one Loan object.
 */
interface LoanState {
	isFetching: boolean;
	books: BookDetailed[];
}

interface reservationState {
	isFetching: boolean;
	books: BookDetailed[];
}

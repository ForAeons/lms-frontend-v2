type backendStatus = "up" | "down" | "unknown";

interface AppState {
	backendStatus: backendStatus;
	hasFetchedUser: boolean;
	isLoggedIn: boolean;
	user: UserPersonAbility | null;
}

interface ManageUserState {
	isFetching: boolean;
	autocomplete: UserSimple[];
	users: UserPerson[];
	meta: Meta;
}

type bookStatus = "available" | "reserved" | "borrowed" | "unknown";

interface BookState {
	isFetching: boolean;
	autocomplete: BookSimple[];
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
	loans: LoanDetailed[];
	meta: Meta;
}

interface resState {
	isFetching: boolean;
	res: ReservationDetailed[];
	meta: Meta;
}

type backendStatus = "up" | "down" | "unknown";

interface AppState {
	csrfToken: string | null;
	backendStatus: backendStatus;
	hasFetchedUser: boolean;
	isLoggedIn: boolean;
	user: User | null;
	abilities: string[];
	person: Person | null;
	permissions: Record<string, boolean>;
	bookmarks: BookmarkDetailed[];
	loans: WithBook<Loan>[];
	reservations: WithBook<Reservation>[];
	fines: WithBook<Fine>[];
}

interface ManageUserState {
	isFetching: boolean;
	autocomplete: UserSimple[];
	users: UserPerson[];
	meta: Meta;
}

interface BookState {
	isFetching: boolean;
	autocomplete: BookSimple[];
	books: BookDetailed[];
	book: BookDetailed | null;
	popular: {
		isFetching: boolean;
		books: BookSimple[];
	};
	meta: Meta;
}

interface LoanState {
	isFetching: boolean;
	loans: LoanDetailed[];
	meta: Meta;
}

interface ResState {
	isFetching: boolean;
	res: ReservationDetailed[];
	meta: Meta;
}

interface FineState {
	isFetching: boolean;
	fines: FineDetailed[];
	meta: Meta;
}

interface AuditLogState {
	isFetching: boolean;
	logs: AuditLogDetailed[];
	meta: Meta;
}

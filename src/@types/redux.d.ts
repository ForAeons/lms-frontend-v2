type backendStatus = "up" | "down" | "unknown";

interface AppState {
	backendStatus: backendStatus;
	csrfToken: string | null;
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

interface BookState {
	isFetching: boolean;
	autocomplete: BookSimple[];
	books: Book[];
	book: BookDetailed | null;
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

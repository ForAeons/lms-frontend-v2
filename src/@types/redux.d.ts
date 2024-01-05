interface AppState {
	csrfToken: string | null;
	isLoggedIn: boolean;
	user: User | undefined;
	abilities: string[];
	person: Person | undefined;
	permissions: Record<string, boolean>;
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

type backendStatus = "up" | "down" | "unknown";

interface AppState {
	backendStatus: backendStatus;
	isLoggedIn: boolean;
	user: UserPersonAbility | null;
}

interface ManageUserState {
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

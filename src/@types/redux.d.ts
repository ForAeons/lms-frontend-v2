type backendStatus = "up" | "down" | "unknown";

interface AppState {
	backendStatus: backendStatus;
	isLoggedIn: boolean;
	user: UserPersonAbility | null;
}

interface ManageUserState {
	users: UserPersonAbility[];
}

interface BookState {
	books: Book[];
	offset: number;
	limit: number;
}

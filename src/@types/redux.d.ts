type backendStatus = "up" | "down" | "unknown";

type loginStatus = "loggedIn" | "loggedOut" | "failure" | "guest";

interface AppState {
	backendStatus: backendStatus;
	showSideBar: boolean;
	isLoading: boolean;
	loginStatus: loginStatus;
	user: UserPersonAbility | null;
}

interface ManageUserState {
	users: UserPersonAbility[];
}

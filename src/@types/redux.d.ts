type backendStatus = "up" | "down" | "unknown";

interface AppState {
	backendStatus: backendStatus;
	showSideBar: boolean;
	isLoggedIn: boolean;
	user: UserPersonAbility | null;
}

interface ManageUserState {
	users: UserPersonAbility[];
}

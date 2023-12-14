import { BaseApi } from "./base";

export const UserRoutes = {
	BASE: "user",
	GET_CURRENT_USER: {
		ROUTE: "current",
	},
	SEARCH_USER: {
		DYNAMIC_ROUTE: (username: string) => `filter[username]=${username}`,
	},
	SPECIFIC_USER: {
		DYNAMIC_ROUTE: (id: number) => `${id}`,
	},
	UDPATE_USER: {
		DYNAMIC_ROUTE: (id: number) => `${id}`,
	},
	UDPATE_ROLE: {
		DYNAMIC_ROUTE: (id: number) => `${id}/role`,
	},
};

class UserApi extends BaseApi {
	public GetCurrentUser = (abortSignal?: AbortSignal) => {
		return this.Get<UserPersonAbility>(
			`${UserRoutes.BASE}/${UserRoutes.GET_CURRENT_USER.ROUTE}`,
			abortSignal,
		);
	};

	public SearchUser = (username: string, abortSignal?: AbortSignal) => {
		return this.Get<UserPersonAbility[]>(
			`${UserRoutes.BASE}?${UserRoutes.SEARCH_USER.DYNAMIC_ROUTE(username)}`,
			abortSignal,
		);
	};

	public CreateUser = (
		userPerson: UserPersonCreate,
		abortSignal?: AbortSignal,
	) => {
		return this.Post<UserPersonCreate, UserPersonAbility>(
			`${UserRoutes.BASE}/`,
			userPerson,
			abortSignal,
		);
	};

	public UpdateUser = (userPerson: UserPerson, abortSignal?: AbortSignal) => {
		return this.Patch<UserPerson, UserPersonAbility>(
			`${UserRoutes.BASE}/${UserRoutes.UDPATE_USER.DYNAMIC_ROUTE(
				userPerson.id,
			)}`,
			userPerson,
			abortSignal,
		);
	};

	public DeleteUser = (userID: number, abortSignal?: AbortSignal) => {
		return this.Delete<UserPersonAbility>(
			`${UserRoutes.BASE}/${UserRoutes.SPECIFIC_USER.DYNAMIC_ROUTE(userID)}`,
			abortSignal,
		);
	};
}

export const userApi = new UserApi();

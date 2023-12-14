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
}

export const userApi = new UserApi();

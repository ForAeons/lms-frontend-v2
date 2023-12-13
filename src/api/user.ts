import { CancelTokenSource } from "axios";
import { BaseApi } from "./base";

export const UserRoutes = {
	BASE: "user",
	GET_CURRENT_USER: {
		ROUTE: "current",
	},
	SPECIFIC_USER: {
		DYNAMIC_ROUTE: (id: number) => `${id}`,
	},
	UDPATE_ROLE: {
		DYNAMIC_ROUTE: (id: number) => `${id}/role`,
	},
};

class UserApi extends BaseApi {
	public GetCurrentUser = (cancelToken?: CancelTokenSource) => {
		return this.Get<LoginPayload>(
			`${UserRoutes.BASE}/${UserRoutes.GET_CURRENT_USER.ROUTE}`,
			cancelToken,
		);
	};
}

export const userApi = new UserApi();

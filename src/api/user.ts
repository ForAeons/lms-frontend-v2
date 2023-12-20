import { BaseApi } from "./base";
import { UserRoutes } from "./backend-routes";

class UserApi extends BaseApi {
	public GetCurrentUser = (abortSignal?: AbortSignal) => {
		return this.Get<UserPersonAbility>(
			`${UserRoutes.BASE}/${UserRoutes.GET_CURRENT_USER.ROUTE}`,
			abortSignal,
		);
	};

	public ListUser = (q: CollectionQuery, abortSignal?: AbortSignal) => {
		return this.Get<UserPerson[]>(
			`${UserRoutes.BASE}?${UserRoutes.LIST.DYNAMIC_ROUTE(q)}`,
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

import { BaseApi } from "./base";
import { UserRoutes } from "./backend-routes";

class UserApi extends BaseApi {
	public GetCurrentUser = (abortSignal?: AbortSignal) => {
		return this.Get<GetCurrentUserPayload>(
			UserRoutes.GET_CURRENT_USER.ROUTE,
			abortSignal,
		);
	};

	public AutoComplete = (value: string, abortSignal?: AbortSignal) => {
		return this.Get<UserSimple[]>(
			`${UserRoutes.BASE}/${UserRoutes.AUTOCOMPLETE.DYNAMIC_ROUTE(value)}`,
			abortSignal,
		);
	};

	public ListUser = (q: CollectionQuery, abortSignal?: AbortSignal) => {
		return this.List<UserPerson[]>(UserRoutes.BASE, q, abortSignal);
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
			`${UserRoutes.BASE}/${userPerson.id}/`,
			userPerson,
			abortSignal,
		);
	};

	public DeleteUser = (userID: number, abortSignal?: AbortSignal) => {
		return this.Delete<UserPersonAbility>(
			`${UserRoutes.BASE}/${userID}/`,
			abortSignal,
		);
	};

	public ChangeRole = (
		userID: number,
		roleID: number,
		abortSignal?: AbortSignal,
	) => {
		return this.Patch<RoleUpdate, UserPersonAbility>(
			`${UserRoutes.BASE}/${userID}/${UserRoutes.UDPATE_ROLE.ROUTE}/`,
			{ role_id: roleID },
			abortSignal,
		);
	};
}

export const userApi = new UserApi();

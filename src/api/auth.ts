import { BaseApi } from "./base";
import { AuthRoutes } from "./backend-routes";

class AuthApi extends BaseApi {
	public SignIn = (user: UserLogin, abortSignal?: AbortSignal) => {
		return this.Post<UserLogin, LoginPayload>(
			`${AuthRoutes.BASE}/${AuthRoutes.SIGN_IN.ROUTE}`,
			user,
			abortSignal,
		);
	};

	public SignOut = (abortSignal?: AbortSignal) => {
		return this.Get(
			`${AuthRoutes.BASE}/${AuthRoutes.SIGN_OUT.ROUTE}`,
			abortSignal,
		);
	};
}

export const authApi = new AuthApi();

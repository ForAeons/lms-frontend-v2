import { BaseApi } from "./base";

export const AuthRoutes = {
	BASE: "auth",
	SIGN_IN: {
		ROUTE: "signin",
	},
	SIGN_UP: {
		ROUTE: "signup",
	},
	SIGN_OUT: {
		ROUTE: "signout",
	},
};

class AuthApi extends BaseApi {
	public Signup = (user: UserCreateForm, abortSignal?: AbortSignal) => {
		return this.Post<UserCreateForm, UserPersonAbility>(
			`${AuthRoutes.BASE}/${AuthRoutes.SIGN_UP.ROUTE}`,
			user,
			abortSignal,
		);
	};

	public SignIn = (user: UserLogin, abortSignal?: AbortSignal) => {
		return this.Post<UserLogin, UserPersonAbility>(
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

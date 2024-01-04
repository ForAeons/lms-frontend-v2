import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { toast } from "sonner";
import {
	getCurrentUserThunk,
	getHealthThunk,
	signInThunk,
	signOutThunk,
} from "../thunks";
import { GetPermissions } from "@/util";
import { IntlWrapper } from "@/components/language-provider";

const initialState: AppState = {
	csrfToken: null,
	backendStatus: "unknown",
	hasFetchedUser: false,
	isLoggedIn: false,
	user: undefined,
	abilities: [],
	person: undefined,
	permissions: {},
};

export const appSlice = createSlice({
	name: "app",
	initialState,
	reducers: {
		setBackendStatus: (state, action) => {
			state.backendStatus = action.payload;
		},
		setCsrfToken: (state, action) => {
			state.csrfToken = action.payload;
		},
		setSignin: (state, action: PayloadAction<LoginPayload>) => {
			state.isLoggedIn = true;
			state.user = action.payload.user;
			state.abilities = action.payload.abilities;
			state.person = action.payload.person_attributes;
			state.permissions = GetPermissions(action.payload.abilities);
		},
		setSignout: (state) => {
			state.isLoggedIn = false;
			state.user = undefined;
			state.abilities = [];
			state.person = undefined;
			state.permissions = {};
		},
	},

	extraReducers: (builder) => {
		builder.addCase(getHealthThunk.fulfilled, (state, action) => {
			if (!action.payload) return;
			state.backendStatus = "up";
		});

		builder.addCase(getHealthThunk.rejected, (state) => {
			state.backendStatus = "down";

			const serverDownMsg = IntlWrapper.intl.formatMessage({
				id: "NT0rmJ",
				defaultMessage: "Server is down",
			});
			const serverDownDesc = IntlWrapper.intl.formatMessage({
				id: "OcLgxt",
				defaultMessage: "The server is down. Please try again later.",
			});

			toast.error(serverDownMsg, { description: serverDownDesc });
		});

		builder.addCase(getCurrentUserThunk.fulfilled, (state, action) => {
			if (!action.payload) return;

			state.hasFetchedUser = true;

			if (!action.payload.is_logged_in) {
				state.isLoggedIn = false;
				state.user = undefined;
				return;
			}

			state.isLoggedIn = true;
			state.user = action.payload.user;
			state.abilities = action.payload.abilities;
			state.permissions = GetPermissions(action.payload.abilities);
			state.person = action.payload.person_attributes;
		});

		builder.addCase(signInThunk.fulfilled, (state, action) => {
			if (action.payload) {
				state.isLoggedIn = true;
				state.user = action.payload.user;
				state.abilities = action.payload.abilities;
				state.permissions = GetPermissions(action.payload.abilities);
				state.person = action.payload.person_attributes;
			} else {
				state.user = undefined;
			}
		});
		builder.addCase(signInThunk.rejected, (state) => {
			state.isLoggedIn = false;
			state.user = undefined;

			const signInFailedMsg = IntlWrapper.intl.formatMessage({
				id: "JdM9UP",
				defaultMessage: "Sign in failed",
			});
			const signInFailedDesc = IntlWrapper.intl.formatMessage({
				id: "vP5USH",
				defaultMessage: "Please check your username and password.",
			});

			toast.error(signInFailedMsg, { description: signInFailedDesc });
		});

		builder.addCase(signOutThunk.pending, (state) => {
			state.isLoggedIn = false;
			state.user = undefined;
			state.abilities = [];
			state.person = undefined;
			state.permissions = {};
		});

		builder.addCase(signOutThunk.fulfilled, () => {
			const signOutSuccessMsg = IntlWrapper.intl.formatMessage({
				id: "cSe4ms",
				defaultMessage: "Sign out success",
			});
			const signOutSuccessDesc = IntlWrapper.intl.formatMessage({
				id: "1OPjg7",
				defaultMessage: "You have been signed out successfully.",
			});

			toast.error(signOutSuccessMsg, { description: signOutSuccessDesc });
		});
	},
});

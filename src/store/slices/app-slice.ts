import { createSlice } from "@reduxjs/toolkit";
import { toast } from "@/components/ui/use-toast";
import {
	getCurrentUserThunk,
	getHealthThunk,
	loginThunk,
	logoutThunk,
} from "../thunks";

const initialState: AppState = {
	backendStatus: "unknown",
	csrfToken: null,
	hasFetchedUser: false,
	isLoggedIn: false,
	user: null,
};

export const appSlice = createSlice({
	name: "app",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(getHealthThunk.fulfilled, (state) => {
			state.backendStatus = "up";
			const csrfToken = document.cookie
				.split("; ")
				.find((row) => row.startsWith("__Host-csrf_="));

			if (csrfToken) {
				state.csrfToken = csrfToken.split("=")[1];
			}
		});
		builder.addCase(getHealthThunk.rejected, (state) => {
			state.backendStatus = "down";
			toast({
				variant: "destructive",
				title: "Backend is down",
				description: "The backend is currently down. Please try again later.",
			});
		});

		builder.addCase(getCurrentUserThunk.fulfilled, (state, action) => {
			if (!action.payload) return;

			state.hasFetchedUser = true;

			if (!action.payload.is_logged_in) {
				state.isLoggedIn = false;
				state.user = null;
				return;
			}

			state.isLoggedIn = true;
			state.user = action.payload.user;
		});

		builder.addCase(loginThunk.fulfilled, (state, action) => {
			if (action.payload) {
				state.isLoggedIn = true;
				state.user = action.payload;
				toast({
					title: "Sign in successful",
					description: "You are now signed in.",
				});
			} else {
				state.user = null;
			}
		});
		builder.addCase(loginThunk.rejected, (state) => {
			state.isLoggedIn = false;
			state.user = null;
			toast({
				variant: "destructive",
				title: "Login failed",
				description: "Please check your username and password.",
			});
		});

		builder.addCase(logoutThunk.fulfilled, (state) => {
			state.isLoggedIn = false;
			state.user = null;
			toast({
				title: "Sign out Successful",
				description: "You are now signed out.",
			});
		});
		builder.addCase(logoutThunk.rejected, (state) => {
			state.isLoggedIn = false;
			state.user = null;
		});
	},
});

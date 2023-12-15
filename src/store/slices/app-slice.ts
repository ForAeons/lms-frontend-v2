import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { toast } from "@/components/ui/use-toast";
import {
	getCurrentUserThunk,
	getHealthThunk,
	loginThunk,
	logoutThunk,
} from "../thunks";

const initialState: AppState = {
	showSideBar: false,
	loginStatus: "guest",
	isLoading: false,
	backendStatus: "unknown",
	user: null,
};

export const appSlice = createSlice({
	name: "app",
	initialState,
	reducers: {
		toggleSideBar: (state) => {
			state.showSideBar = !state.showSideBar;
		},
		setLoading: (state, action: PayloadAction<boolean>) => {
			state.isLoading = action.payload;
		},
		setBackendStatus: (state, action: PayloadAction<backendStatus>) => {
			state.backendStatus = action.payload;
		},
	},
	extraReducers: (builder) => {
		builder.addCase(getHealthThunk.fulfilled, (state) => {
			state.backendStatus = "up";
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
			if (action.payload) {
				state.loginStatus = "loggedIn";
				state.user = action.payload;
			} else {
				state.loginStatus = "guest";
				state.user = null;
			}
		});

		builder.addCase(loginThunk.fulfilled, (state, action) => {
			if (action.payload) {
				state.loginStatus = "loggedIn";
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
			state.loginStatus = "failure";
			state.user = null;
			toast({
				variant: "destructive",
				title: "Login failed",
				description: "Please check your username and password.",
			});
		});

		builder.addCase(logoutThunk.fulfilled, (state) => {
			state.loginStatus = "loggedOut";
			state.user = null;
			toast({
				title: "Sign out Successful",
				description: "You are now signed out.",
			});
		});
		builder.addCase(logoutThunk.rejected, (state) => {
			state.loginStatus = "guest";
			state.user = null;
		});
	},
});

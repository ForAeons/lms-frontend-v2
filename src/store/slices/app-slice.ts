import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { authApi, baseApi, userApi } from "@/api";
import { toast } from "@/components/ui/use-toast";

const initialState: AppState = {
	showSideBar: false,
	loginStatus: "guest",
	isLoading: false,
	backendStatus: "unknown",
	user: null,
};

export const getHealthThunk = createAsyncThunk(
	"app/getHealth",
	async (_, thunkAPI) => baseApi.GetHealth(thunkAPI.signal),
);

export const getCurrentUserThunk = createAsyncThunk(
	"app/getCurrentUser",
	async (_, thunkAPI) => {
		const res = await userApi.GetCurrentUser(thunkAPI.signal);
		return res?.data;
	},
);

export const loginThunk = createAsyncThunk(
	"app/login",
	async (user: UserLogin, thunkAPI) => {
		const res = await authApi.SignIn(user, thunkAPI.signal);
		return res?.data;
	},
);

export const logoutThunk = createAsyncThunk(
	"app/logout",
	async (_, thunkAPI) => await authApi.SignOut(thunkAPI.signal),
);

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

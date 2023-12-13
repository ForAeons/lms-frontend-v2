import { authApi, baseApi } from "@/api";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: AppState = {
	showSideBar: false,
	loginStatus: "guest",
	isLoading: false,
	backendStatus: "unknown",
	user: null,
};

export const getHealthThunk = createAsyncThunk(
	"app/getHealth",
	baseApi.GetHealth,
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
	async (_, thunkAPI) => {
		await authApi.SignOut(thunkAPI.signal);
	},
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
		});

		builder.addCase(loginThunk.fulfilled, (state, action) => {
			if (action.payload) {
				state.loginStatus = "loggedIn";
				state.user = action.payload;
			} else {
				state.user = null;
			}
		});
		builder.addCase(loginThunk.rejected, (state) => {
			state.loginStatus = "failure";
			state.user = null;
		});

		builder.addCase(logoutThunk.fulfilled, (state) => {
			state.loginStatus = "loggedOut";
			state.user = null;
		});
		builder.addCase(logoutThunk.rejected, (state) => {
			state.loginStatus = "guest";
			state.user = null;
		});
	},
});

import { createAsyncThunk } from "@reduxjs/toolkit";
import { authApi, baseApi, userApi } from "@/api";

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

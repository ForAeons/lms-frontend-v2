import { createAsyncThunk } from "@reduxjs/toolkit";
import { authApi, baseApi, bookApi, userApi } from "@/api";

export const getHealthThunk = createAsyncThunk(
	"app/getHealth",
	async (signal?: AbortSignal) => baseApi.GetHealth(signal),
);

export const getCurrentUserThunk = createAsyncThunk(
	"app/getCurrentUser",
	async (signal?: AbortSignal) => {
		const res = await userApi.GetCurrentUser(signal);
		return res?.data;
	},
);

export const loginThunk = createAsyncThunk(
	"app/login",
	async (action: { user: UserLogin; signal?: AbortSignal }) => {
		const res = await authApi.SignIn(action.user, action.signal);
		return res?.data;
	},
);

export const logoutThunk = createAsyncThunk(
	"app/logout",
	async (signal?: AbortSignal) => await authApi.SignOut(signal),
);

export const createBookmarkThunk = createAsyncThunk(
	"book/bookmark/create",
	async (action: { bookID: number; signal?: AbortSignal }) => {
		const res = await bookApi.CreateBookmark(action.bookID);
		return res?.data;
	},
);

export const deleteBookmarkThunk = createAsyncThunk(
	"book/bookmark/delete",
	async (action: {
		bookID: number;
		bookmarkID: number;
		signal?: AbortSignal;
	}) => {
		const res = await bookApi.DeleteBookmark(action.bookID, action.bookmarkID);
		return res?.data;
	},
);

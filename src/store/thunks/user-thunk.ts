import { createAsyncThunk } from "@reduxjs/toolkit";
import { userApi } from "@/api";

export const autoCompleteUserThunk = createAsyncThunk(
	"user/autocomplete",
	async (action: { value: string; signal?: AbortSignal }) => {
		const res = await userApi.AutoComplete(action.value, action.signal);
		return res?.data;
	},
);

export const listUserThunk = createAsyncThunk(
	"user/search",
	async (action: { q: CollectionQuery; signal?: AbortSignal }) => {
		const res = await userApi.ListUser(action.q, action.signal);
		return res;
	},
);

export const createUserThunk = createAsyncThunk(
	"user/create",
	async (userPerson: UserPersonCreate, thunkAPI) => {
		const res = await userApi.CreateUser(userPerson, thunkAPI.signal);
		return res?.data;
	},
);

export const updateUserThunk = createAsyncThunk(
	"user/update",
	async (userPerson: UserPerson, thunkAPI) => {
		const res = await userApi.UpdateUser(userPerson, thunkAPI.signal);
		return res?.data;
	},
);

export const deleteUserThunk = createAsyncThunk(
	"user/delete",
	async (userID: number, thunkAPI) => {
		const res = await userApi.DeleteUser(userID, thunkAPI.signal);
		return res?.data;
	},
);

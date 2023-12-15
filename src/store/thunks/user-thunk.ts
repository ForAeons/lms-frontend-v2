import { createAsyncThunk } from "@reduxjs/toolkit";
import { userApi } from "@/api";

export const searchUsersThunk = createAsyncThunk(
	"user/search",
	async (username: string, thunkAPI) => {
		const res = await userApi.SearchUser(username, thunkAPI.signal);
		return res?.data;
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

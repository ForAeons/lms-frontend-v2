import { userApi } from "@/api";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: ManageUserState = {
	users: [],
};

export const searchUsersThunk = createAsyncThunk(
	"user/search",
	async (username: string, thunkAPI) => {
		const res = await userApi.SearchUser(username, thunkAPI.signal);
		return res?.data;
	},
);

export const userSlice = createSlice({
	name: "user",
	initialState: initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(searchUsersThunk.fulfilled, (state, action) => {
			if (action.payload) {
				state.users = action.payload;
			}
		});
	},
});

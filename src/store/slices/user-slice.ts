import { userApi } from "@/api";
import { toast } from "@/components/ui/use-toast";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

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

		builder.addCase(createUserThunk.fulfilled, (state, action) => {
			state.users.map((u) =>
				u.id === action.payload?.id ? action.payload : u,
			);
			toast({
				title: "Success",
				description: "User created successfully",
			});
		});

		builder.addCase(updateUserThunk.fulfilled, (state, action) => {
			state.users.map((u) =>
				u.id === action.payload?.id ? action.payload : u,
			);
			toast({
				title: "Success",
				description: "User updated successfully",
			});
		});

		builder.addCase(deleteUserThunk.fulfilled, (state, action) => {
			state.users.filter((u) => u.id !== action.payload?.id);
			toast({
				title: "Success",
				description: "User deleted successfully",
			});
		});
	},
});

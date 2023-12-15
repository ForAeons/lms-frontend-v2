import { createSlice } from "@reduxjs/toolkit";
import { toast } from "@/components/ui/use-toast";
import {
	createUserThunk,
	deleteUserThunk,
	searchUsersThunk,
	updateUserThunk,
} from "../thunks";

const initialState: ManageUserState = {
	users: [],
};

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

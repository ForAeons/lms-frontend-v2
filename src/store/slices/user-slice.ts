import { createSlice } from "@reduxjs/toolkit";
import { toast } from "@/components/ui/use-toast";
import {
	createUserThunk,
	deleteUserThunk,
	listUserThunk,
	updateUserThunk,
} from "../thunks";

const initialState: ManageUserState = {
	isFetching: false,
	users: [],
	meta: {
		total_count: 0,
		filtered_count: 0,
	},
};

export const userSlice = createSlice({
	name: "user",
	initialState: initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(listUserThunk.pending, (state) => {
			state.isFetching = true;
		});

		builder.addCase(listUserThunk.fulfilled, (state, action) => {
			if (!action.payload) return;
			if (!action.payload.data || !action.payload.meta) return;
			state.users = action.payload.data;
			state.meta = action.payload.meta;
			state.isFetching = false;
		});

		builder.addCase(listUserThunk.rejected, (state) => {
			state.isFetching = false;
		});

		builder.addCase(createUserThunk.fulfilled, (state, action) => {
			state.users = state.users.map((u) =>
				u.id === action.payload?.id ? action.payload : u,
			);
			toast({
				title: "Success",
				description: "User created successfully",
			});
		});

		builder.addCase(updateUserThunk.fulfilled, (state, action) => {
			state.users = state.users.map((u) =>
				u.id === action.payload?.id ? action.payload : u,
			);
			toast({
				title: "Success",
				description: "User updated successfully",
			});
		});

		builder.addCase(deleteUserThunk.fulfilled, (state, action) => {
			state.users = state.users.filter((u) => u.id !== action.payload?.id);
			toast({
				title: "Success",
				description: "User deleted successfully",
			});
		});
	},
});

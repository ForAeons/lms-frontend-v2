import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { toast } from "sonner";
import {
	autoCompleteUserThunk,
	createUserThunk,
	deleteUserThunk,
	listUserThunk,
	updateUserThunk,
} from "../thunks";

const initialState: ManageUserState = {
	isFetching: false,
	autocomplete: [],
	users: [],
	meta: {
		total_count: 0,
		filtered_count: 0,
	},
};

export const userSlice = createSlice({
	name: "user",
	initialState: initialState,
	reducers: {
		setAutoComplete: (state, action: PayloadAction<UserSimple[]>) => {
			state.autocomplete = action.payload;
		},
	},
	extraReducers: (builder) => {
		builder.addCase(autoCompleteUserThunk.fulfilled, (state, action) => {
			if (!action.payload) return;
			state.autocomplete = action.payload;
		});

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
			toast.success("Success", {
				description: "User created successfully",
			});
		});

		builder.addCase(updateUserThunk.fulfilled, (state, action) => {
			state.users = state.users.map((u) =>
				u.id === action.payload?.id ? action.payload : u,
			);
			toast.success("Success", {
				description: "User updated successfully",
			});
		});

		builder.addCase(deleteUserThunk.fulfilled, (state, action) => {
			state.users = state.users.filter((u) => u.id !== action.payload?.id);
			toast.success("Success", {
				description: "User deleted successfully",
			});
		});
	},
});

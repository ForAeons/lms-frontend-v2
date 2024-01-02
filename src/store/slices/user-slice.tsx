import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { toast } from "sonner";
import { IntlWrapper } from "@/components/language-provider";
import {
	autoCompleteUserThunk,
	createUserThunk,
	deleteUserThunk,
	listUserThunk,
	updateUserRoleThunk,
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
			if (!action.payload) return;
			state.users = state.users.map((u) =>
				u.id === action.payload!.id ? action.payload! : u,
			);

			const createUserMsg = IntlWrapper.intl.formatMessage({
				id: "xrKHS6",
				defaultMessage: "Success",
			});
			const createUserDesc = IntlWrapper.intl.formatMessage(
				{
					id: "bErW7O",
					defaultMessage: 'User "{username}" created successfully.',
				},
				{ username: action.payload.username },
			);
			toast.success(createUserMsg, { description: createUserDesc });
		});

		builder.addCase(updateUserThunk.fulfilled, (state, action) => {
			if (!action.payload) return;
			state.users = state.users.map((u) =>
				u.id === action.payload!.id ? action.payload! : u,
			);

			const updateUserMsg = IntlWrapper.intl.formatMessage({
				id: "xrKHS6",
				defaultMessage: "Success",
			});
			const updateUserDesc = IntlWrapper.intl.formatMessage(
				{
					id: "zjw/TA",
					defaultMessage: 'User "{username}" updated successfully.',
				},
				{ username: action.payload.username },
			);
			toast.success(updateUserMsg, { description: updateUserDesc });
		});

		builder.addCase(deleteUserThunk.fulfilled, (state, action) => {
			if (!action.payload) return;
			state.users = state.users.filter((u) => u.id !== action.payload!.id);

			const deleteUserMsg = IntlWrapper.intl.formatMessage({
				id: "xrKHS6",
				defaultMessage: "Success",
			});
			const deleteUserDesc = IntlWrapper.intl.formatMessage(
				{
					id: "Lnyzvj",
					defaultMessage: 'User "{username}" deleted successfully.',
				},
				{ username: action.payload.username },
			);
			toast.success(deleteUserMsg, { description: deleteUserDesc });
		});

		builder.addCase(updateUserRoleThunk.fulfilled, (_, action) => {
			if (!action.payload) return;

			const updateUserRoleMsg = IntlWrapper.intl.formatMessage({
				id: "xrKHS6",
				defaultMessage: "Success",
			});
			const updateUserRoleDesc = IntlWrapper.intl.formatMessage(
				{
					id: "Ta8Q1S",
					defaultMessage: 'User "{username}"\'s role updated successfully.',
				},
				{ username: action.payload.username },
			);
			toast.success(updateUserRoleMsg, { description: updateUserRoleDesc });
		});
	},
});

import { createSlice } from "@reduxjs/toolkit";
import { toast } from "sonner";
import {
	cancelResThunk,
	checkoutResThunk,
	createResThunk,
	deleteResThunk,
	listResThunk,
} from "..";

const initialState: ResState = {
	isFetching: false,
	res: [],
	meta: {
		total_count: 0,
		filtered_count: 0,
	},
};

export const resSlice = createSlice({
	name: "res",
	initialState: initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(listResThunk.pending, (state) => {
			state.isFetching = true;
		});

		builder.addCase(listResThunk.fulfilled, (state, action) => {
			if (!action.payload) return;
			if (!action.payload.data || !action.payload.meta) return;
			state.res = action.payload.data;
			state.meta = action.payload.meta;
			state.isFetching = false;
		});

		builder.addCase(listResThunk.rejected, (state) => {
			state.isFetching = false;
		});

		builder.addCase(createResThunk.fulfilled, (state, action) => {
			if (!action.payload) return;
			state.res.unshift(action.payload);
			//TODO: LANG
			toast.success("Success", {
				description: `${action.payload!.book.title} reserved by ${
					action.payload!.user.username
				} successfully.`,
			});
		});

		builder.addCase(cancelResThunk.fulfilled, (state, action) => {
			if (!action.payload) return;
			state.res = state.res.filter((l) => l.id !== action.payload!.id);
			//TODO: LANG
			toast.success("Success", {
				description: `Reservation for ${
					action.payload!.book.title
				} canceled successfully.`,
			});
		});

		builder.addCase(checkoutResThunk.fulfilled, (state, action) => {
			if (!action.payload) return;
			state.res = state.res.filter((l) => l.id !== action.payload!.id);
			//TODO: LANG
			toast.success("Success", {
				description: `Reservation for ${
					action.payload!.book.title
				} checked out successfully.`,
			});
		});

		builder.addCase(deleteResThunk.fulfilled, (state, action) => {
			if (!action.payload) return;
			state.res = state.res.filter((r) => r.id !== action.payload!.id);
			//TODO: LANG
			toast.success("Success", {
				description: `Reservation for ${action.payload.book.title} deleted successfully`,
			});
		});
	},
});

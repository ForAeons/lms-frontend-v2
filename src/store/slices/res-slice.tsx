import { createSlice } from "@reduxjs/toolkit";
import { toast } from "sonner";
import { Intl } from "@/components/language-provider";
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

			const createResMsg = Intl.formatMessage({
				id: "xrKHS6",
				defaultMessage: "Success",
			});
			const createResDesc = Intl.formatMessage(
				{
					id: "Nbzb1X",
					defaultMessage: '"{title}" reserved by {username} successfully.',
				},
				{
					title: action.payload.book.title,
					username: action.payload.user.username,
				},
			);
			toast.success(createResMsg, { description: createResDesc });
		});

		builder.addCase(cancelResThunk.fulfilled, (state, action) => {
			if (!action.payload) return;
			state.res = state.res.filter((l) => l.id !== action.payload!.id);

			const cancelResMsg = Intl.formatMessage({
				id: "xrKHS6",
				defaultMessage: "Success",
			});
			const cancelResDesc = Intl.formatMessage(
				{
					id: "pTD5vZ",
					defaultMessage: `Reservation for "{title}" canceled successfully.`,
				},
				{
					title: action.payload.book.title,
				},
			);
			toast.success(cancelResMsg, { description: cancelResDesc });
		});

		builder.addCase(checkoutResThunk.fulfilled, (state, action) => {
			if (!action.payload) return;
			state.res = state.res.filter((l) => l.id !== action.payload!.id);

			const checkoutResMsg = Intl.formatMessage({
				id: "xrKHS6",
				defaultMessage: "Success",
			});
			const checkoutResDesc = Intl.formatMessage(
				{
					id: "B2uKz2",
					defaultMessage: `Reservation for "{title}" checked out successfully.`,
				},
				{
					title: action.payload.book.title,
				},
			);
			toast.success(checkoutResMsg, { description: checkoutResDesc });
		});

		builder.addCase(deleteResThunk.fulfilled, (state, action) => {
			if (!action.payload) return;
			state.res = state.res.filter((r) => r.id !== action.payload!.id);

			const deleteResMsg = Intl.formatMessage({
				id: "xrKHS6",
				defaultMessage: "Success",
			});
			const deleteResDesc = Intl.formatMessage(
				{
					id: "DQS5uA",
					defaultMessage: `Reservation for "{title}" deleted successfully.`,
				},
				{
					title: action.payload.book.title,
				},
			);
			toast.success(deleteResMsg, { description: deleteResDesc });
		});
	},
});

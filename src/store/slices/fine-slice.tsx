import { createSlice } from "@reduxjs/toolkit";
import { toast } from "sonner";
import { Intl } from "@/components/language-provider";
import { deleteFineThunk, listFineThunk, settleFineThunk } from "..";

const initialState: FineState = {
	isFetching: false,
	fines: [],
	meta: {
		total_count: 0,
		filtered_count: 0,
	},
};

export const fineSlice = createSlice({
	name: "fine",
	initialState: initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(listFineThunk.pending, (state) => {
			state.isFetching = true;
		});

		builder.addCase(listFineThunk.fulfilled, (state, action) => {
			if (!action.payload) return;
			if (!action.payload.data || !action.payload.meta) return;
			state.fines = action.payload.data;
			state.meta = action.payload.meta;
			state.isFetching = false;
		});

		builder.addCase(listFineThunk.rejected, (state) => {
			state.isFetching = false;
		});

		builder.addCase(settleFineThunk.fulfilled, (state, action) => {
			if (!action.payload) return;
			state.fines = state.fines.filter((f) => f.id !== action.payload!.id);

			const settleFineMsg = Intl.formatMessage({
				id: "xrKHS6",
				defaultMessage: "Success",
			});
			const settleFineDesc = Intl.formatMessage({
				id: "QpBxnP",
				defaultMessage: "Fine settled successfully.",
			});
			toast.success(settleFineMsg, { description: settleFineDesc });
		});

		builder.addCase(deleteFineThunk.fulfilled, (state, action) => {
			if (!action.payload) return;
			state.fines = state.fines.filter((f) => f.id !== action.payload!.id);

			const settleFineMsg = Intl.formatMessage({
				id: "xrKHS6",
				defaultMessage: "Success",
			});
			const settleFineDesc = Intl.formatMessage({
				id: "Ye43ph",
				defaultMessage: "Fine deleted successfully.",
			});
			toast.success(settleFineMsg, { description: settleFineDesc });
		});
	},
});

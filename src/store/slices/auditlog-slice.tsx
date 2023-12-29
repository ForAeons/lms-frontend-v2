import { createSlice } from "@reduxjs/toolkit";
import { toast } from "sonner";
import { createLogThunk, listLogThunk } from "..";

const initialState: AuditLogState = {
	isFetching: false,
	logs: [],
	meta: {
		total_count: 0,
		filtered_count: 0,
	},
};

export const auditlogSlice = createSlice({
	name: "log",
	initialState: initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(listLogThunk.pending, (state) => {
			state.isFetching = true;
		});

		builder.addCase(listLogThunk.fulfilled, (state, action) => {
			if (!action.payload) return;
			if (!action.payload.data || !action.payload.meta) return;
			state.logs = action.payload.data;
			state.meta = action.payload.meta;
			state.isFetching = false;
		});

		builder.addCase(listLogThunk.rejected, (state) => {
			state.isFetching = false;
		});

		builder.addCase(createLogThunk.fulfilled, (state, action) => {
			if (!action.payload) return;
			state.logs.unshift(action.payload);
			//TODO: LANG
			toast.success("Success", {
				description: "Log created successfully",
			});
		});
	},
});

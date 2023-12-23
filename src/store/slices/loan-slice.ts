import { createSlice } from "@reduxjs/toolkit";
import { toast } from "sonner";
import {
	createLoanThunk,
	deleteLoanThunk,
	listLoanThunk,
	renewLoanThunk,
	returnLoanThunk,
} from "..";

const initialState: LoanState = {
	isFetching: false,
	loans: [],
	meta: {
		total_count: 0,
		filtered_count: 0,
	},
};

export const loanSlice = createSlice({
	name: "loan",
	initialState: initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(listLoanThunk.pending, (state) => {
			state.isFetching = true;
		});

		builder.addCase(listLoanThunk.fulfilled, (state, action) => {
			if (!action.payload) return;
			if (!action.payload.data || !action.payload.meta) return;
			state.loans = action.payload.data;
			state.meta = action.payload.meta;
			state.isFetching = false;
		});

		builder.addCase(listLoanThunk.rejected, (state) => {
			state.isFetching = false;
		});

		builder.addCase(createLoanThunk.fulfilled, (state, action) => {
			if (!action.payload) return;
			state.loans.unshift(action.payload);
			toast.success("Success", {
				description: `${action.payload!.book.title} loaned to ${
					action.payload!.user.username
				} successfully.`,
			});
		});

		builder.addCase(returnLoanThunk.fulfilled, (state, action) => {
			if (!action.payload) return;
			state.loans = state.loans.filter((l) => l.id !== action.payload!.id);
			toast.success("Success", {
				description: `${action.payload!.book.title} returned successfully.`,
			});
		});

		builder.addCase(renewLoanThunk.fulfilled, (state, action) => {
			if (!action.payload) return;
			state.loans = state.loans.map((l) => {
				if (l.id === action.payload!.id) {
					l.due_date = action.payload!.due_date;
				}
				return l;
			});
			toast.success("Success", {
				description: `Book renewed successfully`,
			});
		});

		builder.addCase(deleteLoanThunk.fulfilled, (state, action) => {
			if (!action.payload) return;
			state.loans = state.loans.filter((l) => l.id !== action.payload!.id);
			toast.success("Success", {
				description: `Loan deleted successfully`,
			});
		});
	},
});

import { createSlice } from "@reduxjs/toolkit";
import { toast } from "@/components/ui/use-toast";
import { listBookLoanThunk, renewLoanThunk, returnLoanThunk } from "..";

const initialState: LoanState = {
	isFetching: false,
	books: [],
};

export const loanSlice = createSlice({
	name: "loan",
	initialState: initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(listBookLoanThunk.pending, (state) => {
			state.isFetching = true;
		});

		builder.addCase(listBookLoanThunk.fulfilled, (state, action) => {
			if (!action.payload) return;
			state.books = action.payload;
			state.isFetching = false;
		});

		builder.addCase(listBookLoanThunk.rejected, (state) => {
			state.isFetching = false;
		});

		builder.addCase(returnLoanThunk.fulfilled, (state, action) => {
			if (!action.payload) return;
			state.books = state.books.filter((b) => b.id !== action.payload!.book_id);
			toast({
				title: "Success",
				description: `Book returned successfully`,
			});
		});

		builder.addCase(renewLoanThunk.fulfilled, (state, action) => {
			if (!action.payload) return;
			state.books = state.books.map((b) => {
				if (b.id === action.payload!.book_id) {
					b.loans[0].due_date = action.payload!.due_date;
				}
				return b;
			});
			toast({
				title: "Success",
				description: `Book renewed successfully`,
			});
		});
	},
});

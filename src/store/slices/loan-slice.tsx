import { createSlice } from "@reduxjs/toolkit";
import { toast } from "sonner";
import { Intl } from "@/components/language-provider";
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

			const createLoanMsg = Intl.formatMessage({
				id: "xrKHS6",
				defaultMessage: "Success",
			});
			const createLoanDesc = Intl.formatMessage(
				{
					id: "j9z272",
					defaultMessage: '"{title}" loaned to {username} successfully.',
				},
				{
					title: action.payload.book.title,
					username: action.payload.user.username,
				},
			);
			toast.success(createLoanMsg, { description: createLoanDesc });
		});

		builder.addCase(returnLoanThunk.fulfilled, (state, action) => {
			if (!action.payload) return;
			state.loans = state.loans.filter((l) => l.id !== action.payload!.id);

			const returnLoanMsg = Intl.formatMessage({
				id: "xrKHS6",
				defaultMessage: "Success",
			});
			const returnLoanDesc = Intl.formatMessage(
				{ id: "MFmFWQ", defaultMessage: '"{title}" returned successfully.' },
				{ title: action.payload.book.title },
			);
			toast.success(returnLoanMsg, { description: returnLoanDesc });
		});

		builder.addCase(renewLoanThunk.fulfilled, (state, action) => {
			if (!action.payload) return;
			state.loans = state.loans.map((l) => {
				if (l.id === action.payload!.id) {
					l.due_date = action.payload!.due_date;
				}
				return l;
			});

			const renewLoanMsg = Intl.formatMessage({
				id: "xrKHS6",
				defaultMessage: "Success",
			});
			const renewLoanDesc = Intl.formatMessage(
				{ id: "K3gz74", defaultMessage: '"{title}" renewed successfully.' },
				{ title: action.payload.book.title },
			);
			toast.success(renewLoanMsg, { description: renewLoanDesc });
		});

		builder.addCase(deleteLoanThunk.fulfilled, (state, action) => {
			if (!action.payload) return;
			state.loans = state.loans.filter((l) => l.id !== action.payload!.id);

			const deleteLoanMsg = Intl.formatMessage({
				id: "xrKHS6",
				defaultMessage: "Success",
			});
			const deleteLoanDesc = Intl.formatMessage({
				id: "g4UNFA",
				defaultMessage: "Loan deleted successfully.",
			});
			toast.success(deleteLoanMsg, { description: deleteLoanDesc });
		});
	},
});

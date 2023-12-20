import { createAsyncThunk } from "@reduxjs/toolkit";
import { loanApi } from "@/api";

export const listLoanThunk = createAsyncThunk(
	"loan/list",
	async (action: { q: CollectionQuery; signal?: AbortSignal }) => {
		const res = await loanApi.ListLoan(action.q, action.signal);
		return res?.data;
	},
);

export const listBookLoanThunk = createAsyncThunk(
	"loan/list",
	async (action: { q: CollectionQuery; signal?: AbortSignal }) => {
		const res = await loanApi.ListBookLoan(action.q, action.signal);
		return res;
	},
);

export const getLoanThunk = createAsyncThunk(
	"loan/get",
	async (action: { loanId: number; signal?: AbortSignal }) => {
		const res = await loanApi.GetLoan(action.loanId, action.signal);
		return res?.data;
	},
);

export const deleteLoanThunk = createAsyncThunk(
	"loan/delete",
	async (action: { loanId: number; signal?: AbortSignal }) => {
		const res = await loanApi.DeleteLoan(action.loanId, action.signal);
		return res?.data;
	},
);

export const returnLoanThunk = createAsyncThunk(
	"loan/return",
	async (action: { loanId: number; signal?: AbortSignal }) => {
		const res = await loanApi.ReturnLoan(action.loanId, action.signal);
		return res?.data;
	},
);

export const renewLoanThunk = createAsyncThunk(
	"loan/renew",
	async (action: { loanId: number; signal?: AbortSignal }) => {
		const res = await loanApi.RenewLoan(action.loanId, action.signal);
		return res?.data;
	},
);

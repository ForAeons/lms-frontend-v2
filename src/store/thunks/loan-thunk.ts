import { createAsyncThunk } from "@reduxjs/toolkit";
import { loanApi } from "@/api";

export const listLoanThunk = createAsyncThunk(
	"loan/list",
	async (query: CollectionQuery, thunkAPI) => {
		const res = await loanApi.ListLoan(query, thunkAPI.signal);
		return res?.data;
	},
);

export const listBookLoanThunk = createAsyncThunk(
	"loan/list",
	async (query: CollectionQuery, thunkAPI) => {
		const res = await loanApi.ListBookLoan(query, thunkAPI.signal);
		return res?.data;
	},
);

export const getLoanThunk = createAsyncThunk(
	"loan/get",
	async (loanId: number, thunkAPI) => {
		const res = await loanApi.GetLoan(loanId, thunkAPI.signal);
		return res?.data;
	},
);

export const deleteLoanThunk = createAsyncThunk(
	"loan/delete",
	async (loanId: number, thunkAPI) => {
		const res = await loanApi.DeleteLoan(loanId, thunkAPI.signal);
		return res?.data;
	},
);

export const returnLoanThunk = createAsyncThunk(
	"loan/return",
	async (loanId: number, thunkAPI) => {
		const res = await loanApi.ReturnLoan(loanId, thunkAPI.signal);
		return res?.data;
	},
);

export const renewLoanThunk = createAsyncThunk(
	"loan/renew",
	async (loanId: number, thunkAPI) => {
		const res = await loanApi.RenewLoan(loanId, thunkAPI.signal);
		return res?.data;
	},
);

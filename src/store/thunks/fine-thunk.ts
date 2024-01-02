import { createAsyncThunk } from "@reduxjs/toolkit";
import { fineApi } from "@/api";

export const listFineThunk = createAsyncThunk(
	"fine/list",
	async (action: { q: CollectionQuery; signal?: AbortSignal }) => {
		const res = await fineApi.ListFine(action.q, action.signal);
		return res;
	},
);

export const deleteFineThunk = createAsyncThunk(
	"fine/delete",
	async (action: { fineId: number; signal?: AbortSignal }) => {
		const res = await fineApi.DeleteFine(action.fineId, action.signal);
		return res?.data;
	},
);

export const settleFineThunk = createAsyncThunk(
	"fine/settle",
	async (action: { fineId: number; signal?: AbortSignal }) => {
		const res = await fineApi.SettleFine(action.fineId, action.signal);
		return res?.data;
	},
);

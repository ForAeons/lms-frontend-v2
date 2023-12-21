import { createAsyncThunk } from "@reduxjs/toolkit";
import { reservationApi } from "@/api";

export const listResThunk = createAsyncThunk(
	"res/list",
	async (action: { q: CollectionQuery; signal?: AbortSignal }) => {
		const res = await reservationApi.ListRes(action.q, action.signal);
		return res;
	},
);

export const createResThunk = createAsyncThunk(
	"res/create",
	async (action: { res: ReservationCreate; signal?: AbortSignal }) => {
		const res = await reservationApi.CreateRes(action.res, action.signal);
		return res?.data;
	},
);

export const getResThunk = createAsyncThunk(
	"res/get",
	async (action: { resId: number; signal?: AbortSignal }) => {
		const res = await reservationApi.GetRes(action.resId, action.signal);
		return res?.data;
	},
);

export const deleteResThunk = createAsyncThunk(
	"res/delete",
	async (action: { resId: number; signal?: AbortSignal }) => {
		const res = await reservationApi.DeleteRes(action.resId, action.signal);
		return res?.data;
	},
);

export const checkoutResThunk = createAsyncThunk(
	"res/renew",
	async (action: { resId: number; signal?: AbortSignal }) => {
		const res = await reservationApi.CheckoutRes(action.resId, action.signal);
		return res?.data;
	},
);

export const cancelResThunk = createAsyncThunk(
	"res/cancel",
	async (action: { resId: number; signal?: AbortSignal }) => {
		const res = await reservationApi.CancelRes(action.resId, action.signal);
		return res?.data;
	},
);

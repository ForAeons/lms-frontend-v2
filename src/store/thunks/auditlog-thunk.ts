import { createAsyncThunk } from "@reduxjs/toolkit";
import { auditlogApi } from "@/api";

export const listLogThunk = createAsyncThunk(
	"log/list",
	async (action: { q: CollectionQuery; signal?: AbortSignal }) => {
		const res = await auditlogApi.ListLog(action.q, action.signal);
		return res;
	},
);

export const createLogThunk = createAsyncThunk(
	"log/create",
	async (action: { log: AuditLogCreate; signal?: AbortSignal }) => {
		const res = await auditlogApi.CreateLog(action.log, action.signal);
		return res?.data;
	},
);

import { createAsyncThunk } from "@reduxjs/toolkit";
import { bookApi } from "@/api";
import { Query } from "@/util";

export const getBookThunk = createAsyncThunk(
	"book/get",
	async (action: { bookID: number; signal?: AbortSignal }) => {
		const res = await bookApi.GetBook(action.bookID);
		return res?.data;
	},
);

export const createBookThunk = createAsyncThunk(
	"book/create",
	async (action: { book: BookCreate; signal?: AbortSignal }) => {
		const res = await bookApi.CreateBook(action.book);
		return res?.data;
	},
);

export const updateBookThunk = createAsyncThunk(
	"book/update",
	async (action: { book: Book; signal?: AbortSignal }) => {
		const res = await bookApi.UpdateBook(action.book);
		return res?.data;
	},
);

export const deleteBookThunk = createAsyncThunk(
	"book/delete",
	async (action: { bookID: number; signal?: AbortSignal }) => {
		const res = await bookApi.DeleteBook(action.bookID);
		return res?.data;
	},
);

export const listBookThunk = createAsyncThunk(
	"book/list",
	async (action: { q: Query; signal?: AbortSignal }) => {
		const res = await bookApi.ListBook(action.q);
		return res?.data;
	},
);

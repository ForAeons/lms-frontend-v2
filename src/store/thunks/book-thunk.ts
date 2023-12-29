import { createAsyncThunk } from "@reduxjs/toolkit";
import { bookApi, loanApi, reservationApi } from "@/api";

export const autoCompleteBookThunk = createAsyncThunk(
	"book/autocomplete",
	async (action: { value: string; signal?: AbortSignal }) => {
		const res = await bookApi.AutoComplete(action.value, action.signal);
		return res?.data;
	},
);

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
	async (action: { q: CollectionQuery; signal?: AbortSignal }) => {
		const res = await bookApi.ListBook(action.q);
		return res;
	},
);

export const loanBookThunk = createAsyncThunk(
	"book/loan",
	async (action: { bookCopyID: number; signal?: AbortSignal }) => {
		const res = await loanApi.LoanBook(action.bookCopyID);
		return res?.data;
	},
);

export const reserveBookThunk = createAsyncThunk(
	"book/reserve",
	async (action: { bookCopyID: number; signal?: AbortSignal }) => {
		const res = await reservationApi.ReserveBook(action.bookCopyID);
		return res?.data;
	},
);

export const listPopularBooksThunk = createAsyncThunk(
	"book/popular",
	async (action: { signal?: AbortSignal }) => {
		const res = await bookApi.ListPopularBooks(action.signal);
		return res?.data;
	},
);

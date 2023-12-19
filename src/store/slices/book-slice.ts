import { createSlice } from "@reduxjs/toolkit";
import { toast } from "@/components/ui/use-toast";
import {
	createBookThunk,
	deleteBookThunk,
	getBookThunk,
	listBookThunk,
	loanBookThunk,
	reserveBookThunk,
	updateBookThunk,
} from "../thunks/book-thunk";

const initialState: BookState = {
	isFetching: true,
	books: [],
	book: null,
	bookStatus: "unknown",
	meta: {
		total_count: 0,
		filtered_count: 0,
	},
};

export const bookSlice = createSlice({
	name: "book",
	initialState: initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(createBookThunk.fulfilled, (state, action) => {
			if (!action.payload) return;
			state.books.unshift(action.payload);
			state.books.pop();
			toast({
				title: "Success",
				description: `Book ${action.payload.title} added to library successfully`,
			});
		});

		builder.addCase(listBookThunk.pending, (state) => {
			state.isFetching = true;
		});

		builder.addCase(listBookThunk.fulfilled, (state, action) => {
			if (!action.payload) return;
			if (!action.payload.data || !action.payload.meta) return;
			state.books = action.payload.data;
			state.meta = action.payload.meta;
			state.isFetching = false;
		});

		builder.addCase(updateBookThunk.fulfilled, (state, action) => {
			if (!action.payload) return;
			state.books = state.books.map((book) => {
				if (book.id === action.payload!.id) {
					return action.payload!;
				}
				return book;
			});
			toast({
				title: "Success",
				description: `Book ${action.payload.title} edited successfully`,
			});
		});

		builder.addCase(deleteBookThunk.fulfilled, (state, action) => {
			if (!action.payload) return;
			state.books = state.books.filter(
				(book) => book.id !== action.payload!.id,
			);
			toast({
				title: "Success",
				description: `Book ${action.payload.title} removed from library successfully`,
			});
		});

		builder.addCase(getBookThunk.pending, (state) => {
			state.isFetching = true;
		});

		builder.addCase(getBookThunk.fulfilled, (state, action) => {
			if (!action.payload) return;
			state.book = action.payload;

			if (
				action.payload.loans.length > 0 &&
				action.payload.loans.at(-1)!.status === "borrowed"
			) {
				state.bookStatus = "borrowed";
			} else if (
				action.payload.reservations.length > 0 &&
				action.payload.reservations.at(-1)!.status === "pending"
			) {
				state.bookStatus = "reserved";
			} else {
				state.bookStatus = "available";
			}

			state.isFetching = false;
		});

		builder.addCase(loanBookThunk.fulfilled, (state, action) => {
			if (!action.payload) return;
			state.bookStatus = "borrowed";
			toast({
				title: "Success",
				description: `"${state.book!.title}" loaned successfully. Due date: ${
					action.payload.due_date
				}`,
			});
		});

		builder.addCase(reserveBookThunk.fulfilled, (state, action) => {
			if (!action.payload) return;
			state.bookStatus = "reserved";
			toast({
				title: "Success",
				description: `"${state.book!.title}" reserved successfully. "${
					state.book!.title
				}" will be reserved until ${action.payload.reservation_date}`,
			});
		});
	},
});

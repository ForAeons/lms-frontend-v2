import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { toast } from "sonner";
import {
	autoCompleteBookThunk,
	createBookThunk,
	deleteBookThunk,
	getBookThunk,
	listBookThunk,
	listPopularBooksThunk,
	loanBookThunk,
	reserveBookThunk,
	updateBookThunk,
} from "../thunks/book-thunk";

const initialState: BookState = {
	isFetching: true,
	autocomplete: [],
	books: [],
	book: null,
	popular: {
		isFetching: true,
		books: [],
	},
	meta: {
		total_count: 0,
		filtered_count: 0,
	},
};

export const bookSlice = createSlice({
	name: "book",
	initialState: initialState,
	reducers: {
		setAutoComplete: (state, action: PayloadAction<BookSimple[]>) => {
			state.autocomplete = action.payload;
		},
	},
	extraReducers: (builder) => {
		builder.addCase(autoCompleteBookThunk.fulfilled, (state, action) => {
			if (!action.payload) return;
			state.autocomplete = action.payload;
		});

		builder.addCase(createBookThunk.fulfilled, (state, action) => {
			if (!action.payload) return;
			state.books.unshift(action.payload);
			//TODO: LANG
			toast.success("Success", {
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

		builder.addCase(listBookThunk.rejected, (state) => {
			state.isFetching = false;
		});

		builder.addCase(updateBookThunk.fulfilled, (state, action) => {
			if (!action.payload) return;
			state.books = state.books.map((book) => {
				if (book.id === action.payload!.id) {
					return { ...action.payload!, book_copies: book.book_copies };
				}
				return book;
			});
			//TODO: LANG
			toast.success("Success", {
				description: `Book ${action.payload.title} edited successfully`,
			});
		});

		builder.addCase(deleteBookThunk.fulfilled, (state, action) => {
			if (!action.payload) return;
			state.books = state.books.filter(
				(book) => book.id !== action.payload!.id,
			);
			//TODO: LANG
			toast.success("Success", {
				description: `Book ${action.payload.title} removed from library successfully`,
			});
		});

		builder.addCase(getBookThunk.pending, (state) => {
			state.isFetching = true;
		});

		builder.addCase(getBookThunk.fulfilled, (state, action) => {
			if (!action.payload) return;
			state.book = action.payload;
			state.isFetching = false;
		});

		builder.addCase(loanBookThunk.fulfilled, (state, action) => {
			if (!action.payload) return;
			//TODO: LANG
			toast.success("Success", {
				description: `"${state.book!.title}" loaned successfully. Due date: ${
					action.payload.due_date
				}`,
			});
		});

		builder.addCase(reserveBookThunk.fulfilled, (state, action) => {
			if (!action.payload) return;
			//TODO: LANG
			toast.success("Success", {
				description: `"${state.book!.title}" reserved successfully. "${
					state.book!.title
				}" will be reserved until ${action.payload.reservation_date}`,
			});
		});

		builder.addCase(listPopularBooksThunk.pending, (state) => {
			state.popular.isFetching = true;
		});

		builder.addCase(listPopularBooksThunk.fulfilled, (state, action) => {
			if (!action.payload) return;
			state.popular.books = action.payload;
			state.popular.isFetching = false;
		});
	},
});

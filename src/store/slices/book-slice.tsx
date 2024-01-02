import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { toast } from "sonner";
import { IntlWrapper } from "@/components/language-provider";
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

			const createBookMsg = IntlWrapper.intl.formatMessage({
				id: "xrKHS6",
				defaultMessage: "Success",
			});
			const createBookDesc = IntlWrapper.intl.formatMessage(
				{
					id: "b8wNxR",
					defaultMessage: "Book {title} added to library successfully.",
				},
				{ title: action.payload.title },
			);

			toast.success(createBookMsg, { description: createBookDesc });
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

			const updateBookMsg = IntlWrapper.intl.formatMessage({
				id: "xrKHS6",
				defaultMessage: "Success",
			});
			const updateBookDesc = IntlWrapper.intl.formatMessage(
				{ id: "zOHOUn", defaultMessage: '"{title}" edited successfully.' },
				{ title: action.payload.title },
			);

			toast.success(updateBookMsg, { description: updateBookDesc });
		});

		builder.addCase(deleteBookThunk.fulfilled, (state, action) => {
			if (!action.payload) return;
			state.books = state.books.filter(
				(book) => book.id !== action.payload!.id,
			);

			const deleteBookMsg = IntlWrapper.intl.formatMessage({
				id: "xrKHS6",
				defaultMessage: "Success",
			});
			const deleteBookDesc = IntlWrapper.intl.formatMessage(
				{
					id: "XHc3K5",
					defaultMessage: '"{title}" removed from library successfully.',
				},
				{ title: action.payload.title },
			);

			toast.success(deleteBookMsg, { description: deleteBookDesc });
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

			const loanBookMsg = IntlWrapper.intl.formatMessage({
				id: "xrKHS6",
				defaultMessage: "Success",
			});
			const loanBookDesc = IntlWrapper.intl.formatMessage(
				{
					id: "ugaCUX",
					defaultMessage:
						'"{title}" loaned successfully. Due date: {due_date}.',
				},
				{ title: state.book!.title, due_date: action.payload.due_date },
			);
			toast.success(loanBookMsg, { description: loanBookDesc });
		});

		builder.addCase(reserveBookThunk.fulfilled, (state, action) => {
			if (!action.payload) return;

			const reserveBookMsg = IntlWrapper.intl.formatMessage({
				id: "xrKHS6",
				defaultMessage: "Success",
			});
			const reserveBookDesc = IntlWrapper.intl.formatMessage(
				{
					id: "SRpFJ8",
					defaultMessage:
						'"{title}" reserved successfully. "{title}" will be reserved until {reservation_date}.',
				},
				{
					title: state.book!.title,
					reservation_date: action.payload.reservation_date,
				},
			);
			toast.success(reserveBookMsg, { description: reserveBookDesc });
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

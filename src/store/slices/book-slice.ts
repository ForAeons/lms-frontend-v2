import { createSlice } from "@reduxjs/toolkit";
import { toast } from "@/components/ui/use-toast";
import {
	createBookThunk,
	deleteBookThunk,
	listBookThunk,
	updateBookThunk,
} from "../thunks/book-thunk";

const initialState: BookState = {
	isFetching: true,
	books: [],
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
	},
});

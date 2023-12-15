import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { toast } from "@/components/ui/use-toast";
import {
	createBookThunk,
	deleteBookThunk,
	listBookThunk,
	updateBookThunk,
} from "../thunks/book-thunk";
import * as Constants from "../../constants";

const initialState: BookState = {
	books: [],
	offset: Constants.MINIMUM_PAGE_OFFSET,
	limit: Constants.MINIMUM_PAGE_LIMIT,
};

export const bookSlice = createSlice({
	name: "book",
	initialState: initialState,
	reducers: {
		setOffSet: (state, action: PayloadAction<number>) => {
			if (action.payload < Constants.MINIMUM_PAGE_OFFSET) {
				state.offset = Constants.MINIMUM_PAGE_OFFSET;
				return;
			}
			state.offset = action.payload;
		},
		setLimit: (state, action: PayloadAction<number>) => {
			if (action.payload < Constants.MINIMUM_PAGE_LIMIT) {
				state.limit = Constants.MINIMUM_PAGE_LIMIT;
				return;
			}
			state.limit = action.payload;
		},
	},

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

		builder.addCase(listBookThunk.fulfilled, (state, action) => {
			if (!action.payload) return;
			state.books = action.payload;
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

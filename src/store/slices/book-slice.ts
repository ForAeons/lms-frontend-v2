import { createSlice } from "@reduxjs/toolkit";

const initialState: BookState = {
	books: [],
	offset: 0,
	limit: 10,
};

export const bookSlice = createSlice({
	name: "book",
	initialState: initialState,
	reducers: {},
});

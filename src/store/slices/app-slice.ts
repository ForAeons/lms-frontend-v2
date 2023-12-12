import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: AppState = {
	showSideBar: false,
	isLoggedIn: false,
	user: null,
};

export const appSlice = createSlice({
	name: "app",
	initialState,
	reducers: {
		login: (state, action: PayloadAction<User>) => {
			state.isLoggedIn = true;
			state.user = action.payload;
		},
		logout: (state) => {
			state.isLoggedIn = false;
			state.user = null;
		},
		toggleSideBar: (state) => {
			state.showSideBar = !state.showSideBar;
		},
	},
});

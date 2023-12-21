import { useDispatch, useSelector } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import * as Slices from "./slices";

export const store = configureStore({
	reducer: {
		app: Slices.appSlice.reducer,
		user: Slices.userSlice.reducer,
		book: Slices.bookSlice.reducer,
		loan: Slices.loanSlice.reducer,
		res: Slices.resSlice.reducer,
	},
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector = <T>(selector: (state: RootState) => T) =>
	useSelector<RootState, T>(selector);

import { useDispatch, useSelector } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { appSlice } from "./slices";
import { userSlice } from "./slices/user-slice";

export const store = configureStore({
	reducer: {
		app: appSlice.reducer,
		user: userSlice.reducer,
	},
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector = <T>(selector: (state: RootState) => T) =>
	useSelector<RootState, T>(selector);

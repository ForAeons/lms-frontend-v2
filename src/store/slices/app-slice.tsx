import { createSlice } from "@reduxjs/toolkit";
import { toast } from "sonner";
import {
	createBookmarkThunk,
	deleteBookmarkThunk,
	getCurrentUserThunk,
	getHealthThunk,
	loginThunk,
	logoutThunk,
} from "../thunks";
import { GetPermissions } from "@/util";
import {
	NotifyBookmarks,
	NotifyFines,
	NotifyLoans,
	NotifyReservations,
} from "..";

const initialState: AppState = {
	csrfToken: null,
	backendStatus: "unknown",
	hasFetchedUser: false,
	isLoggedIn: false,
	user: null,
	abilities: [],
	person: null,
	permissions: {},
	bookmarks: [],
	loans: [],
	reservations: [],
	fines: [],
};

export const appSlice = createSlice({
	name: "app",
	initialState,
	reducers: {
		setCsrfToken: (state, action) => {
			state.csrfToken = action.payload;
		},
	},
	extraReducers: (builder) => {
		builder.addCase(getHealthThunk.fulfilled, (state, action) => {
			if (!action.payload) return;
			state.backendStatus = "up";
		});

		builder.addCase(getHealthThunk.rejected, (state) => {
			state.backendStatus = "down";
			//TODO: LANG
			toast.error("Backend is down", {
				description: "The backend is currently down. Please try again later.",
			});
		});

		builder.addCase(getCurrentUserThunk.fulfilled, (state, action) => {
			if (!action.payload) return;

			state.hasFetchedUser = true;

			if (!action.payload.is_logged_in) {
				state.isLoggedIn = false;
				state.user = null;
				return;
			}

			state.isLoggedIn = true;
			state.user = action.payload.user;
			state.abilities = action.payload.abilities;
			state.permissions = GetPermissions(action.payload.abilities);
			state.person = action.payload.person_attributes;
			state.bookmarks = action.payload.bookmarks;
			state.loans = action.payload.loans;
			state.reservations = action.payload.reservations;
			state.fines = action.payload.fines;

			NotifyBookmarks(action.payload.bookmarks);
			NotifyLoans(action.payload.loans);
			NotifyReservations(action.payload.reservations);
			NotifyFines(action.payload.fines);
		});

		builder.addCase(loginThunk.fulfilled, (state, action) => {
			if (action.payload) {
				state.isLoggedIn = true;
				state.user = action.payload.user;
				state.abilities = action.payload.abilities;
				state.permissions = GetPermissions(action.payload.abilities);
				state.person = action.payload.person_attributes;
				state.bookmarks = action.payload.bookmarks;
				state.loans = action.payload.loans;
				state.reservations = action.payload.reservations;
				state.fines = action.payload.fines;

				NotifyBookmarks(action.payload.bookmarks);
				NotifyLoans(action.payload.loans);
				NotifyReservations(action.payload.reservations);
				NotifyFines(action.payload.fines);
			} else {
				state.user = null;
			}
		});
		builder.addCase(loginThunk.rejected, (state) => {
			state.isLoggedIn = false;
			state.user = null;
			//TODO: LANG
			toast.error("Login failed", {
				description: "Please check your username and password.",
			});
		});

		builder.addCase(logoutThunk.pending, (state) => {
			state.isLoggedIn = false;
			state.user = null;
			state.abilities = [];
			state.permissions = {};
		});

		builder.addCase(logoutThunk.fulfilled, () => {
			//TODO: LANG
			toast("Sign out Successful", {
				description: "You are now signed out.",
			});
		});

		builder.addCase(createBookmarkThunk.fulfilled, (state, action) => {
			if (!action.payload) return;
			state.bookmarks.unshift(action.payload);
			//TODO: LANG
			toast.success("Success", {
				description: `"${action.payload.book.title}" is now bookmarked for you.`,
			});
		});

		builder.addCase(deleteBookmarkThunk.fulfilled, (state, action) => {
			if (!action.payload) return;
			state.bookmarks = state.bookmarks.filter(
				(bookmark) => bookmark.id !== action.payload!.id,
			);
			//TODO: LANG
			toast.success("Success", {
				description: `"${action.payload.book.title}" is now unbookmarked for you.`,
			});
		});
	},
});

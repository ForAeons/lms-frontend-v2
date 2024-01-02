import { createSlice } from "@reduxjs/toolkit";
import { toast } from "sonner";
import {
	createBookmarkThunk,
	deleteBookmarkThunk,
	getCurrentUserThunk,
	getHealthThunk,
	signInThunk,
	signOutThunk,
} from "../thunks";
import { GetPermissions } from "@/util";
import { IntlWrapper } from "@/components/language-provider";
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

			const serverDownMsg = IntlWrapper.intl.formatMessage({
				id: "NT0rmJ",
				defaultMessage: "Server is down",
			});
			const serverDownDesc = IntlWrapper.intl.formatMessage({
				id: "OcLgxt",
				defaultMessage: "The server is down. Please try again later.",
			});

			toast.error(serverDownMsg, { description: serverDownDesc });
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

		builder.addCase(signInThunk.fulfilled, (state, action) => {
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
		builder.addCase(signInThunk.rejected, (state) => {
			state.isLoggedIn = false;
			state.user = null;

			const signInFailedMsg = IntlWrapper.intl.formatMessage({
				id: "JdM9UP",
				defaultMessage: "Sign in failed",
			});
			const signInFailedDesc = IntlWrapper.intl.formatMessage({
				id: "vP5USH",
				defaultMessage: "Please check your username and password.",
			});

			toast.error(signInFailedMsg, { description: signInFailedDesc });
		});

		builder.addCase(signOutThunk.pending, (state) => {
			state.isLoggedIn = false;
			state.user = null;
			state.abilities = [];
			state.permissions = {};
		});

		builder.addCase(signOutThunk.fulfilled, () => {
			const signOutSuccessMsg = IntlWrapper.intl.formatMessage({
				id: "cSe4ms",
				defaultMessage: "Sign out success",
			});
			const signOutSuccessDesc = IntlWrapper.intl.formatMessage({
				id: "1OPjg7",
				defaultMessage: "You have been signed out successfully.",
			});

			toast.error(signOutSuccessMsg, { description: signOutSuccessDesc });
		});

		builder.addCase(createBookmarkThunk.fulfilled, (state, action) => {
			if (!action.payload) return;
			state.bookmarks.unshift(action.payload);

			const bookmarkedMsg = IntlWrapper.intl.formatMessage({
				id: "xrKHS6",
				defaultMessage: "Success",
			});
			const bookmarkedDesc = IntlWrapper.intl.formatMessage(
				{
					id: "wPyDX8",
					defaultMessage: '"{title}" has been bookmarked for you.',
				},
				{ title: action.payload.book.title },
			);

			toast.success(bookmarkedMsg, { description: bookmarkedDesc });
		});

		builder.addCase(deleteBookmarkThunk.fulfilled, (state, action) => {
			if (!action.payload) return;
			state.bookmarks = state.bookmarks.filter(
				(bookmark) => bookmark.id !== action.payload!.id,
			);

			const deleteBookmarkMsg = IntlWrapper.intl.formatMessage({
				id: "xrKHS6",
				defaultMessage: "Success",
			});
			const deleteBookmarkDesc = IntlWrapper.intl.formatMessage(
				{
					id: "ylrvDR",
					defaultMessage: '"{title}" has been removed from your bookmarks.',
				},
				{ title: action.payload.book.title },
			);

			toast.success(deleteBookmarkMsg, { description: deleteBookmarkDesc });
		});
	},
});

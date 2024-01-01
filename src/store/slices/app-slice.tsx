import { FormattedMessage } from "react-intl";
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

			toast.error(
				<FormattedMessage id="server_down" defaultMessage="Server is down" />,
				{
					description: (
						<FormattedMessage
							id="server_down_description"
							defaultMessage="The server is down. Please try again later."
						/>
					),
				},
			);
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

			toast.error(
				<FormattedMessage
					id="sign_in_failed"
					defaultMessage="Sign in failed"
				/>,
				{
					description: (
						<FormattedMessage
							id="sign_in_failed_description"
							defaultMessage="Please check your username and password."
						/>
					),
				},
			);
		});

		builder.addCase(logoutThunk.pending, (state) => {
			state.isLoggedIn = false;
			state.user = null;
			state.abilities = [];
			state.permissions = {};
		});

		builder.addCase(logoutThunk.fulfilled, () => {
			toast(
				<FormattedMessage
					id="sign_out_success"
					defaultMessage="Sign out success"
				/>,
				{
					description: (
						<FormattedMessage
							id="sign_out_success_description"
							defaultMessage="You have been signed out successfully."
						/>
					),
				},
			);
		});

		builder.addCase(createBookmarkThunk.fulfilled, (state, action) => {
			if (!action.payload) return;
			state.bookmarks.unshift(action.payload);

			toast.success(
				<FormattedMessage id="success" defaultMessage="Success" />,
				{
					description: (
						<FormattedMessage
							id="bookmark_success_description"
							defaultMessage="{title} has been bookmarked for you."
							values={{ title: action.payload.book.title }}
						/>
					),
				},
			);
		});

		builder.addCase(deleteBookmarkThunk.fulfilled, (state, action) => {
			if (!action.payload) return;
			state.bookmarks = state.bookmarks.filter(
				(bookmark) => bookmark.id !== action.payload!.id,
			);

			toast.success(
				<FormattedMessage id="success" defaultMessage="Success" />,
				{
					description: (
						<FormattedMessage
							id="delete_bookmark_success_description"
							defaultMessage="{title} has been removed from your bookmarks."
							values={{ title: action.payload.book.title }}
						/>
					),
				},
			);
		});
	},
});

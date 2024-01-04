import React from "react";
import { Outlet } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useAppDispatch, appSlice, useAppSelector } from "@/store";
import { newUserCollectionQuery } from "@/util";
import * as Api from "@/api";
import { LoaderPage } from ".";
import { ErrorPage } from "..";
import { useTranslations } from "@/components/language-provider";

export const AppLogic: React.FC = () => {
	const dispatch = useAppDispatch();

	const { status: backendFetchStatus } = useQuery({
		queryKey: ["health"],
		staleTime: Number.POSITIVE_INFINITY,
		queryFn: ({ signal }) => Api.baseApi.GetHealth(signal),
	});

	const { status: userFetchStatus, data } = useQuery({
		enabled: backendFetchStatus === "success",
		queryKey: ["current_user"],
		staleTime: Number.POSITIVE_INFINITY,
		queryFn: ({ signal }) => Api.userApi.GetCurrentUser(signal),
	});

	React.useEffect(() => {
		if (userFetchStatus !== "success" || !data) {
			dispatch(appSlice.actions.setSignout());
		} else if (data.data.is_logged_in) {
			dispatch(appSlice.actions.setSignin(data.data));
		}
	}, [dispatch, userFetchStatus, data]);

	// prefetch all relevant data
	const queryClient = useQueryClient();
	// Home page books
	queryClient.prefetchQuery({
		queryKey: [Api.BookRoutes.BASE, "recent"],
		queryFn: ({ signal }) => Api.bookApi.ListNewBooks(signal),
	});
	queryClient.prefetchQuery({
		queryKey: [Api.BookRoutes.BASE, Api.BookRoutes.POPULAR.BASE],
		queryFn: ({ signal }) => Api.bookApi.ListPopularBooks(signal),
	});

	// prefetch all user related data, if user is logged in
	const user = useAppSelector((state) => state.app.user);
	if (user?.id) {
		const cq = newUserCollectionQuery(user?.id);

		queryClient.prefetchQuery({
			queryKey: [Api.BookmarkRoutes.BASE],
			queryFn: ({ signal }) => Api.bookmarkApi.ListBookmarks(cq, signal),
		});
		queryClient.prefetchQuery({
			queryKey: [Api.LoanRoutes.BASE, cq],
			queryFn: ({ signal }) => Api.loanApi.ListLoan(cq, signal),
		});
		queryClient.prefetchQuery({
			queryKey: [Api.ResRoutes.BASE, cq],
			queryFn: ({ signal }) => Api.reservationApi.ListRes(cq, signal),
		});
		queryClient.prefetchQuery({
			queryKey: [Api.FineRoutes.BASE, cq],
			queryFn: ({ signal }) => Api.fineApi.ListFine(cq, signal),
		});
	}

	const translate = useTranslations();

	if (backendFetchStatus === "pending") return <LoaderPage />;

	if (backendFetchStatus === "error")
		return <ErrorPage errorMsg={translate.serverDownDesc()} />;

	return <Outlet />;
};

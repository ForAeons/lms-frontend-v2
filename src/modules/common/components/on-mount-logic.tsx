import React from "react";
import { Outlet } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useTranslations } from "@/components/language-provider";
import { useAppDispatch, appSlice, useAppSelector } from "@/store";
import { newUserCollectionQuery } from "@/util";
import { useCollectionQuery } from "@/hooks";
import * as Api from "@/api";
import { ErrorPage, LoadingPage } from "..";

export const OnMountLogic: React.FC = () => {
	const dispatch = useAppDispatch();

	const { status: backendFetchStatus } = useQuery({
		queryKey: ["health"],
		staleTime: Number.POSITIVE_INFINITY,
		refetchInterval: 1000 * 30, // 30 seconds
		queryFn: ({ signal }) => Api.baseApi.GetHealth(signal),
	});

	const { status: userFetchStatus, data } = useQuery({
		enabled: backendFetchStatus === "success",
		queryKey: ["current_user"],
		staleTime: Number.POSITIVE_INFINITY,
		retry: false,
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
	const cq = useCollectionQuery();
	const queryClient = useQueryClient();
	// Home page books
	queryClient.prefetchQuery({
		queryKey: [Api.BookRoutes.BASE, cq],
		queryFn: ({ signal }) => Api.bookApi.ListBook(cq, signal),
	});
	queryClient.prefetchQuery({
		queryKey: [Api.BookRoutes.BASE, Api.BookRoutes.POPULAR.ROUTE],
		queryFn: ({ signal }) => Api.bookApi.ListPopularBooks(signal),
	});

	// prefetch all user related data, if user is logged in
	const user = useAppSelector((state) => state.app.user);
	if (user?.id) {
		const bmCq = newUserCollectionQuery(user?.id);
		queryClient.prefetchQuery({
			queryKey: [Api.BookmarkRoutes.BASE, bmCq],
			queryFn: ({ signal }) => Api.bookmarkApi.ListBookmarks(bmCq, signal),
		});
		const loanCq = newUserCollectionQuery(user?.id, "borrowed");
		queryClient.prefetchQuery({
			queryKey: [Api.LoanRoutes.BASE, loanCq],
			queryFn: ({ signal }) => Api.loanApi.ListLoan(loanCq, signal),
		});
		const resCq = newUserCollectionQuery(user?.id, "pending");
		queryClient.prefetchQuery({
			queryKey: [Api.ResRoutes.BASE, resCq],
			queryFn: ({ signal }) => Api.reservationApi.ListRes(resCq, signal),
		});
		const fineCq = newUserCollectionQuery(user?.id, "outstanding");
		queryClient.prefetchQuery({
			queryKey: [Api.FineRoutes.BASE, fineCq],
			queryFn: ({ signal }) => Api.fineApi.ListFine(fineCq, signal),
		});
	}

	const translate = useTranslations();

	if (backendFetchStatus === "pending") return <LoadingPage />;

	if (backendFetchStatus === "error")
		return <ErrorPage errorMsg={translate.serverDownDesc()} />;

	return <Outlet />;
};
